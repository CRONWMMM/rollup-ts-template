import { terser } from 'rollup-plugin-terser';
import eslint from '@rbnlffl/rollup-plugin-eslint';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import del from 'rollup-plugin-delete';
import cleanup from 'rollup-plugin-cleanup';
import serve from 'rollup-plugin-livereload';
import livereload from 'rollup-plugin-livereload';
import pkg from '../package.json';

const path = require('path');

const resolveFile = function (filePath) {
    return path.join(__dirname, '..', filePath);
};

const extensions = ['.js', '.ts'];
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
// https://rollupjs.org/guide/en#external-external
const external = [/@babel\/runtime/];

const plugins = [
    eslint({
        fix: isProduction,
        throwOnError: true,
        throwOnWarning: true
    }),
    del({
        targets: 'dist/*',
        runOnce: true
    }),
    resolve({ extensions }),
    commonjs(),
    babel({
        extensions,
        babelHelpers: 'runtime',
        exclude: /node_modules/
    }),
    isProduction ? cleanup() : null,
    isDevelopment ? (
        serve({
            open: false,
            port: 3000,
            contentBase: 'dist/example',
            historyApiFallback: true,
        }),
        livereload({
            delay: 2000,
            watch: ['/example', '/src']
        })
    ) : null
];

const config = [
    {
        input: resolveFile('/src/index.ts'),
        output: {
            file: resolveFile(pkg.main),
            format: 'es',
            sourcemap: isDevelopment,
            plugins: [
                isProduction ? terser() : null
            ]
        }
    },
    {
        input: resolveFile('/example/index.js'),
        output: {
            name: 'rollup_ts_template_demo',
            file: 'dist/example/index.umd.js',
            format: 'umd',
            sourcemap: isDevelopment,
            plugins: [
                isProduction ? terser() : null
            ]
        }
    }
].map(conf => ({
    ...conf,
    plugins,
    external
}));

export default config;