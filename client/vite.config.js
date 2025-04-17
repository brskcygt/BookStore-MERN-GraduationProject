import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import svgrPlugin from 'vite-plugin-svgr';

import PKG from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: [
          // Need these plugins to make emotion work with Vite
          'babel-plugin-macros',
          '@emotion/babel-plugin'
        ]
      }
    }),
    svgrPlugin(),
    checker({
      overlay: false,
      typescript: false,
      eslint: {
        // Conditional render to prevent Vite build breaking
        lintCommand: mode === 'development' ? 'eslint "./src/**/*.{js,jsx}"' : ''
      },
      terminal: false
    })
  ],
  server: {
    port: 3000
  },
  build: {
    outDir: 'build'
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        // Using .js files instead of .jsx (not mandatory)
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: 'jsx',
              contents: await fs.readFile(args.path, 'utf8')
            }));
          }
        }
      ]
    }
  },
  esbuild: { loader: 'jsx', include: /src\/.*\.jsx?$/, exclude: [] },
  define: {
    PKG
  }
}));
