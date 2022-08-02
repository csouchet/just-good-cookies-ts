/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */
import autoExternal from 'rollup-plugin-auto-external';
import { terser } from 'rollup-plugin-terser';
import sizes from 'rollup-plugin-sizes';

import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs'; // at least, needed to bundle mxGraph which is only available as a CommonJS module
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const libInput = 'src/justgoodcookies.ts';
const pluginsBundleIIFE = [
  typescriptPlugin(),
  // the 'resolve' and 'commonjs' plugins ensure we can bundle commonjs dependencies
  resolve(),
  commonjs(),
  // to have sizes of dependencies listed at the end of build log
  sizes(),
];
const outputIIFE = {
  file: pkg.browser.replace('.min.js', '.js'),
  name: 'justgoodcookies',
  format: 'iife',
};

const configIIFE = {
  input: libInput,
  output: outputIIFE,
  plugins: pluginsBundleIIFE,
};
const configIIFEMinified = {
  input: libInput,
  output: {
    ...outputIIFE,
    file: pkg.browser,
  },
  plugins: withMinification(pluginsBundleIIFE),
};

const pluginsBundles = [
  typescriptPlugin(),
  // ensure we do not bundle dependencies
  autoExternal(),
  // to have sizes of dependencies listed at the end of build log
  sizes(),
];

const configBundlesMinified = {
  input: libInput,
  output: [
    {
      file: pkg.module.replace('.js', '.min.js'),
      format: 'es',
    },
    {
      file: pkg.main.replace('.js', '.min.js'),
      format: 'cjs',
    },
  ],

  plugins: withMinification(pluginsBundles),
};
const configBundles = {
  ...configBundlesMinified,
  plugins: pluginsBundles,
  output: [
    { file: pkg.module, format: 'es' },
    { file: pkg.main, format: 'cjs' },
  ],
};

export default [configIIFE, configIIFEMinified, configBundles, configBundlesMinified];

// =====================================================================================================================
// helpers
// =====================================================================================================================

function typescriptPlugin() {
  const tsconfigOverride = { compilerOptions: { sourceMap: false, declaration: true } };

  const options = {
    typescript: require('typescript'),
    tsconfigOverride: tsconfigOverride,
  };

  // Ensure we only bundle production sources
  options.tsconfig = './tsconfig.bundle.json';

  return typescript(options);
}

function withMinification(plugins) {
  return [
    ...plugins,
    terser({
      ecma: 6,
    }),
  ];
}
