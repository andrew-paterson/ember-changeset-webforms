import fg from 'fast-glob';
import typescript from '@rollup/plugin-typescript';

// Simple Rollup config: transpile TypeScript files under `src/` to JavaScript
// files under `dist/`, preserving the directory structure (one .js per
// source module). No Babel or additional transforms applied.

// Find TypeScript and JS source files
const input = fg.sync(['src/**/*.ts', 'src/**/*.js']);

export default {
  input,
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [typescript({ sourceMap: true })],
  // Leave imports external by default; adjust if you need bundling of deps.
  external: [],
};
