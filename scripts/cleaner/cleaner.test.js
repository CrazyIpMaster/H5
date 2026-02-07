import { describe, it, expect, vi } from 'vitest';
import path from 'path';
import { extractReferencesFromContent, resolvePath } from './cleaner.cjs';

describe('Asset Cleaner Logic', () => {
  
  describe('extractReferencesFromContent', () => {
    it('should extract JS imports', () => {
      const content = `
        import React from 'react';
        import logo from './logo.png';
        const data = require('../data.json');
        const config = require.resolve('./config.js');
        import('./dynamic.js');
      `;
      
      const refs = extractReferencesFromContent(content, '.js');
      expect(refs).toContain('react');
      expect(refs).toContain('./logo.png');
      expect(refs).toContain('../data.json');
      expect(refs).toContain('./config.js');
      expect(refs).toContain('./dynamic.js');
    });

    it('should extract CSS urls', () => {
      const content = `
        .bg { background-image: url('./bg.jpg'); }
        @import 'variables.css';
      `;
      
      const refs = extractReferencesFromContent(content, '.css');
      expect(refs).toContain('./bg.jpg');
      expect(refs).toContain('variables.css');
    });

    it('should extract string literals that look like assets', () => {
      const content = `
        const images = {
          hero: "hero-image.jpg",
          icon: 'icon.svg'
        };
      `;
      
      const refs = extractReferencesFromContent(content, '.js');
      expect(refs).toContain('hero-image.jpg');
      expect(refs).toContain('icon.svg');
    });
  });

  describe('resolvePath', () => {
    it('should resolve relative paths', () => {
      const sourceFile = path.resolve('/src/components/Button.tsx');
      const ref = '../assets/icon.png';
      
      const result = resolvePath(sourceFile, ref);
      // Expected: /src/assets/icon.png
      expect(result).toBe(path.resolve('/src/assets/icon.png'));
    });
  });
});
