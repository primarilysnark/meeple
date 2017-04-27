/* eslint-disable no-console */

const babel = require('babel-core');
const fs = require('fs');

function transformFile(filePath) {
  return new Promise((resolve, reject) => {
    babel.transformFile(filePath, {
      babelrc: false,
      comments: false,
      plugins: ['../compiler/roll20-compiler.js'],
    }, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
}

function checkDistDirectory() {
  return new Promise((resolve, reject) => {
    fs.stat('./dist', (err, stats) => {
      if (err && err.code === 'ENOENT') {
        return resolve(false);
      }

      if (err) {
        return reject(err);
      }

      return resolve(stats.isDirectory());
    });
  });
}

function createDistDirectory() {
  return new Promise((resolve, reject) => {
    fs.mkdir('./dist', (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

function writeResults(result) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/meeple.js', result, {
      encoding: 'UTF-8',
    }, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

transformFile('./lib/index.js')
  .then(result => checkDistDirectory()
    .then((exists) => {
      if (!exists) {
        return createDistDirectory()
          .then(() => result);
      }

      return result;
    }))
  .then(result => writeResults(result.code))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
