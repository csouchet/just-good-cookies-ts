/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */

import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  // create the environment variable for configuration in the postcss config
  process.env['NODE_ENV'] = mode;

  return {
    base: './', // Base public path when served in development or production. https://vitejs.dev/config/#base
    server: {
      port: 10001,
    },

    // Configuration to build the demo
    build: {
      outDir: 'build/demo',
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'dev/public/index.html'),
          'elements-identification': resolve(__dirname, 'dev/public/elements-identification.html'),
        },
        // No hash in asset names. We make the demo publicly available via the examples repository and served by statically.io
        // New versions are accessed using tags. The master branch is cachecd by statically.io and updated once a day.
        // see https://github.com/vitejs/vite/issues/378#issuecomment-768816653
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
    preview: {
      port: 10002,
    },
  };
});
