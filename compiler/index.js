/* eslint-disable no-console */

const babel = require('babel-core');

const result = babel.transformFileSync('./lib/index.js', {
  babelrc: false,
  comments: false,
  plugins: ['../compiler/roll20-compiler.js'],
});

console.log(result.code);
