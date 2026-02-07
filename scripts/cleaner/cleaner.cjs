const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Default Configuration
const DEFAULT_CONFIG = {
  rootDir: process.cwd(),
  srcDir: path.join(process.cwd(), 'src'),
  entryPoints: [
    'index.html',
    'src/main.tsx',
    'vite.config.ts',
    'tailwind.config.js',
    'postcss.config.js',
    'tsconfig.json',
    'package.json',
    'vitest.config.ts',
    'eslint.config.js',
    'cypress.config.ts',
    'cypress.config.js'
  ],
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.cjs', '.mjs', '.css', '.scss', '.less', '.html', '.json', '.vue', '.svelte'],
  assetExtensions: [
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico',
    '.mp3', '.wav', '.mp4', '.webm', '.ogg',
    '.ttf', '.otf', '.woff', '.woff2'
  ],
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    '.git',
    '.vscode',
    'coverage',
    'scripts',
    'public',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'bun.lockb',
    'tsconfig.app.json',
    'tsconfig.node.json'
  ]
};

let CONFIG = { ...DEFAULT_CONFIG };

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m"
};

/**
 * Load configuration from file
 */
function loadConfig() {
  const configFiles = ['cleaner.config.js', 'cleaner.config.json', 'cleaner.config.cjs'];
  for (const file of configFiles) {
    const configPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(configPath)) {
      console.log(`${colors.cyan}Loading config from ${file}${colors.reset}`);
      try {
        const userConfig = require(configPath);
        // Merge configs
        CONFIG = {
          ...CONFIG,
          ...userConfig,
          // Merge arrays if provided
          entryPoints: userConfig.entryPoints ? [...CONFIG.entryPoints, ...userConfig.entryPoints] : CONFIG.entryPoints,
          extensions: userConfig.extensions ? [...CONFIG.extensions, ...userConfig.extensions] : CONFIG.extensions,
          ignorePatterns: userConfig.ignorePatterns ? [...CONFIG.ignorePatterns, ...userConfig.ignorePatterns] : CONFIG.ignorePatterns,
        };
      } catch (e) {
        console.error(`${colors.yellow}Failed to load config file: ${e.message}${colors.reset}`);
      }
      return;
    }
  }
}

/**
 * Recursive file walker
 */
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // Check ignore patterns
    const relativePath = path.relative(CONFIG.rootDir, filePath);
    if (CONFIG.ignorePatterns.some(pattern => relativePath.split(path.sep).includes(pattern) || relativePath === pattern)) {
      return;
    }

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Extract imports/references from content string
 */
function extractReferencesFromContent(content, ext) {
  const refs = new Set();

  // 1. JS/TS Imports: import ... from '...', import('...'), require('...'), require.resolve('...')
  // Supports single quotes, double quotes, and backticks
  if (['.js', '.jsx', '.ts', '.tsx', '.cjs', '.mjs', '.vue', '.svelte'].includes(ext)) {
    // Static imports: import ... from "..."
    const staticImportRegex = /(?:import|from)\s+['"`]([^'"`]+)['"`]/g;
    // Dynamic imports/require: import("..."), require("..."), require.resolve("...")
    const dynamicRegex = /(?:import|require|require\.resolve)\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
    
    let match;
    while ((match = staticImportRegex.exec(content)) !== null) refs.add(match[1]);
    while ((match = dynamicRegex.exec(content)) !== null) refs.add(match[1]);
  }

  // 2. CSS/SCSS: url('...'), @import '...'
  if (['.css', '.scss', '.less'].includes(ext)) {
    const urlRegex = /url\(['"]?([^'"\)]+)['"]?\)/g;
    const atImportRegex = /@import\s+['"]([^'"]+)['"]/g;

    let match;
    while ((match = urlRegex.exec(content)) !== null) refs.add(match[1]);
    while ((match = atImportRegex.exec(content)) !== null) refs.add(match[1]);
  }

  // 3. HTML: src="...", href="..."
  if (ext === '.html') {
    const srcRegex = /(?:src|href)=['"]([^'"]+)['"]/g;
    let match;
    while ((match = srcRegex.exec(content)) !== null) refs.add(match[1]);
  }

  // 4. Special Case: String literals that look like paths (Heuristic for assets in code)
  // Matches typical asset filenames
  const assetRegex = /['"]([^'"]+\.(?:png|jpg|jpeg|gif|svg|mp3|wav|mp4|ttf|woff2?))['"]/g;
  let assetMatch;
  while ((assetMatch = assetRegex.exec(content)) !== null) {
    refs.add(assetMatch[1]);
  }

  return Array.from(refs);
}

/**
 * Extract imports/references from file
 */
function extractReferences(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const ext = path.extname(filePath).toLowerCase();
  return extractReferencesFromContent(content, ext);
}

/**
 * Resolve relative path to absolute path
 */
function resolvePath(sourceFile, refPath) {
  const dir = path.dirname(sourceFile);
  
  // Handle absolute imports (from root) if any (e.g. /src/...)
  if (refPath.startsWith('/')) {
    // Assumption: / usually refers to public or root. 
    // In Vite: /src/... works. 
    return path.join(CONFIG.rootDir, refPath.substring(1));
  }

  // Handle Alias @/ -> src/
  if (refPath.startsWith('@/')) {
    return path.join(CONFIG.srcDir, refPath.substring(2));
  }

  // Handle Relative Paths
  if (refPath.startsWith('.')) {
    return path.resolve(dir, refPath);
  }

  // Node Modules (ignore)
  return null;
}

/**
 * Try to find the file with various extensions if exact match fails
 */
function findFileWithExtensions(basePath) {
  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) return basePath;

  for (const ext of CONFIG.extensions) {
    const pathWithExt = basePath + ext;
    if (fs.existsSync(pathWithExt)) return pathWithExt;
  }
  
  // Try /index.js, /index.ts, etc.
  for (const ext of CONFIG.extensions) {
    const indexPath = path.join(basePath, 'index' + ext);
    if (fs.existsSync(indexPath)) return indexPath;
  }

  return null;
}

/**
 * Build Dependency Graph & Reachability
 */
function analyzeProject() {
  console.log(`${colors.cyan}Starting project analysis...${colors.reset}`);
  
  const allFiles = getAllFiles(CONFIG.rootDir);
  const visited = new Set();
  const queue = [];

  // Initialize queue with entry points
  CONFIG.entryPoints.forEach(entry => {
    const absEntry = path.resolve(CONFIG.rootDir, entry);
    if (fs.existsSync(absEntry)) {
      queue.push(absEntry);
      visited.add(absEntry);
    } 
    // Don't warn for default entry points that might not exist in all projects
  });

  // BFS Traversal
  while (queue.length > 0) {
    const currentFile = queue.shift();
    const refs = extractReferences(currentFile);

    for (const ref of refs) {
      // Ignore external packages
      if (!ref.startsWith('.') && !ref.startsWith('/') && !ref.startsWith('@/')) continue;

      let absPath = resolvePath(currentFile, ref);
      if (!absPath) continue;

      // Try resolving extensions
      const resolvedFile = findFileWithExtensions(absPath);
      
      if (resolvedFile && !visited.has(resolvedFile)) {
        // Double check it's within project
        if (!resolvedFile.startsWith(CONFIG.rootDir)) continue;

        visited.add(resolvedFile);
        
        // Only recurse if it's a code file (not an asset)
        const ext = path.extname(resolvedFile);
        if (CONFIG.extensions.includes(ext)) {
          queue.push(resolvedFile);
        }
      }
    }
  }

  // Determine Unused Files
  const unusedFiles = allFiles.filter(file => {
    // Only check source files and known asset types
    const ext = path.extname(file).toLowerCase();
    const isCode = CONFIG.extensions.includes(ext);
    const isAsset = CONFIG.assetExtensions.includes(ext);
    
    // Skip if it's not a type we care about cleaning
    if (!isCode && !isAsset) return false;

    return !visited.has(file);
  });

  return { allFiles, visited, unusedFiles };
}

/**
 * Format bytes
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Generate Report
 */
function generateReport(unusedFiles) {
  console.log(`\n${colors.cyan}=== Unused Files Analysis ===${colors.reset}\n`);
  
  if (unusedFiles.length === 0) {
    console.log(`${colors.green}No unused files found! Good job.${colors.reset}`);
    return;
  }

  let totalSize = 0;
  unusedFiles.forEach(file => {
    const stats = fs.statSync(file);
    totalSize += stats.size;
    const relPath = path.relative(CONFIG.rootDir, file);
    console.log(`${colors.red}[Unused] ${relPath} ${colors.gray}(${formatBytes(stats.size)})${colors.reset}`);
  });

  console.log(`\n${colors.yellow}Total Unused Files: ${unusedFiles.length}`);
  console.log(`Total Wasted Space: ${formatBytes(totalSize)}${colors.reset}\n`);
}

/**
 * Backup and Delete
 */
function deleteFiles(files) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(CONFIG.rootDir, `_backup_unused_${timestamp}`);
  
  console.log(`${colors.cyan}Creating backup at: ${backupDir}${colors.reset}`);
  fs.mkdirSync(backupDir, { recursive: true });

  files.forEach(file => {
    const relPath = path.relative(CONFIG.rootDir, file);
    const backupPath = path.join(backupDir, relPath);
    
    // Ensure dest dir exists
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    
    // Copy then Unlink (safer than rename across partitions)
    fs.copyFileSync(file, backupPath);
    fs.unlinkSync(file);
    console.log(`${colors.green}Deleted: ${relPath}${colors.reset}`);
  });

  console.log(`\n${colors.green}Cleanup complete. ${files.length} files removed.${colors.reset}`);
  console.log(`${colors.yellow}To restore, run: node scripts/cleaner/cleaner.cjs --restore ${backupDir}${colors.reset}`);
}

/**
 * Restore
 */
function restoreFiles(backupDir) {
  if (!fs.existsSync(backupDir)) {
    console.error(`${colors.red}Backup directory not found: ${backupDir}${colors.reset}`);
    return;
  }

  const files = getAllFiles(backupDir);
  console.log(`${colors.cyan}Restoring ${files.length} files from ${backupDir}...${colors.reset}`);

  files.forEach(file => {
    const relPath = path.relative(backupDir, file);
    const destPath = path.join(CONFIG.rootDir, relPath);

    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(file, destPath);
    console.log(`Restored: ${relPath}`);
  });

  console.log(`${colors.green}Restore complete.${colors.reset}`);
}

// === Main CLI Logic ===
function main() {
  loadConfig();
  
  const args = process.argv.slice(2);
  
  if (args.includes('--help')) {
    console.log(`
      Usage: node scripts/cleaner/cleaner.cjs [options]

      Options:
        --delete        Delete unused files (with auto-backup)
        --restore <dir> Restore files from a backup directory
        --dry-run       Analyze and show report (default)
    `);
    return;
  }

  if (args.includes('--restore')) {
    const dirIndex = args.indexOf('--restore') + 1;
    const dir = args[dirIndex];
    if (!dir) {
      console.error(`${colors.red}Error: Please provide a backup directory to restore.${colors.reset}`);
      return;
    }
    restoreFiles(dir);
    return;
  }

  const { unusedFiles } = analyzeProject();
  generateReport(unusedFiles);

  if (args.includes('--delete')) {
    if (unusedFiles.length > 0) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question(`${colors.red}Are you sure you want to delete these ${unusedFiles.length} files? (y/N) ${colors.reset}`, (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          deleteFiles(unusedFiles);
        } else {
          console.log('Operation cancelled.');
        }
        rl.close();
      });
    }
  } else {
    console.log(`${colors.gray}Run with --delete to remove these files.${colors.reset}`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { analyzeProject, extractReferences, extractReferencesFromContent, resolvePath, findFileWithExtensions };
