import path from 'path';

import { defineConfig } from '@farmfe/core';

export default defineConfig({
  plugins: ['@farmfe/plugin-react'],

  compilation: {
    input: {
      content: './src/content/content.tsx',
      popup: './src/popup/popup.html',
      background: './src/background/background.ts',
    },

    resolve: {
      alias: {
        '@popup': path.join(process.cwd(), 'src', 'popup'),
        '@content': path.join(process.cwd(), 'src', 'content'),
        '@': path.join(process.cwd(), 'src'),
      },
    },

    watch: true,
  },
});
