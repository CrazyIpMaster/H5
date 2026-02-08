/**
 * 图片优化脚本
 * 将大型 PNG 图片压缩为更小的尺寸
 * 
 * 使用方法：
 * 1. npm install sharp --save-dev
 * 2. node scripts/optimize-images.cjs
 */

const fs = require('fs');
const path = require('path');

// 检查是否安装了 sharp
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('请先安装 sharp: npm install sharp --save-dev');
  process.exit(1);
}

const ASSETS_DIR = path.join(__dirname, '../src/assets/images');
const MAX_SIZE_KB = 200; // 目标最大文件大小 (KB)
const MAX_DIMENSION = 1500; // 最大宽度/高度

// 递归获取所有 PNG 文件
function getAllPngFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      getAllPngFiles(fullPath, files);
    } else if (item.toLowerCase().endsWith('.png')) {
      const sizeKB = stat.size / 1024;
      files.push({
        path: fullPath,
        name: item,
        sizeKB: sizeKB
      });
    }
  }
  
  return files;
}

// 优化单个图片
async function optimizeImage(filePath, targetSizeKB) {
  const originalSize = fs.statSync(filePath).size / 1024;
  
  if (originalSize <= targetSizeKB) {
    return { skipped: true, originalSize };
  }
  
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // 计算需要缩小的比例
    let scale = 1;
    const currentSize = originalSize;
    
    // 如果图片太大，先缩小尺寸
    if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
      const maxDim = Math.max(metadata.width, metadata.height);
      scale = MAX_DIMENSION / maxDim;
    }
    
    // 根据文件大小进一步调整
    if (currentSize > targetSizeKB * 4) {
      scale = Math.min(scale, 0.5);
    } else if (currentSize > targetSizeKB * 2) {
      scale = Math.min(scale, 0.7);
    }
    
    const newWidth = Math.round(metadata.width * scale);
    const newHeight = Math.round(metadata.height * scale);
    
    // 创建备份
    const backupPath = filePath + '.backup';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }
    
    // 优化图片
    await sharp(filePath)
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({
        quality: 80,
        compressionLevel: 9,
        palette: true // 使用调色板减少颜色数量
      })
      .toFile(filePath + '.optimized');
    
    // 替换原文件
    fs.unlinkSync(filePath);
    fs.renameSync(filePath + '.optimized', filePath);
    
    const newSize = fs.statSync(filePath).size / 1024;
    
    return {
      skipped: false,
      originalSize,
      newSize,
      reduction: ((originalSize - newSize) / originalSize * 100).toFixed(1)
    };
  } catch (error) {
    console.error(`  错误处理 ${filePath}: ${error.message}`);
    return { error: error.message, originalSize };
  }
}

async function main() {
  console.log('🔍 扫描图片文件...\n');
  
  const files = getAllPngFiles(ASSETS_DIR);
  
  // 按大小排序
  files.sort((a, b) => b.sizeKB - a.sizeKB);
  
  console.log(`找到 ${files.length} 个 PNG 文件\n`);
  
  // 显示大文件
  const largeFiles = files.filter(f => f.sizeKB > MAX_SIZE_KB);
  console.log(`需要优化的大文件 (>${MAX_SIZE_KB}KB): ${largeFiles.length} 个\n`);
  
  if (largeFiles.length === 0) {
    console.log('✅ 所有图片都在目标大小范围内！');
    return;
  }
  
  // 显示前 20 个最大的文件
  console.log('最大的文件:');
  largeFiles.slice(0, 20).forEach((f, i) => {
    console.log(`  ${i + 1}. ${f.name} - ${f.sizeKB.toFixed(1)} KB`);
  });
  console.log('\n');
  
  // 开始优化
  console.log('🚀 开始优化...\n');
  
  let totalSaved = 0;
  let optimizedCount = 0;
  
  for (const file of largeFiles) {
    process.stdout.write(`处理: ${file.name.substring(0, 50)}... `);
    
    const result = await optimizeImage(file.path, MAX_SIZE_KB);
    
    if (result.skipped) {
      console.log('跳过 (已优化)');
    } else if (result.error) {
      console.log(`错误: ${result.error}`);
    } else {
      const saved = result.originalSize - result.newSize;
      totalSaved += saved;
      optimizedCount++;
      console.log(`✓ ${result.originalSize.toFixed(0)}KB → ${result.newSize.toFixed(0)}KB (-${result.reduction}%)`);
    }
  }
  
  console.log('\n========================================');
  console.log(`✅ 优化完成！`);
  console.log(`   优化文件数: ${optimizedCount}`);
  console.log(`   总共节省: ${(totalSaved / 1024).toFixed(2)} MB`);
  console.log('========================================\n');
}

main().catch(console.error);

