const babylon = require('babylon');
const fs = require('fs');

const LIBRARY_NAME = 'meepleLibrary';

const visitedFiles = {};
const roots = [];

module.exports = function roll20Compiler(babel) {
  const t = babel.types;
  const fileRegExp = /(?:\.*\/((?:[A-Za-z0-9]+\/)*))([A-Za-z0-9]+)/;

  let programPath;

  return {
    visitor: {
      Program: {
        enter(path) {
          programPath = path;
          roots.push(fileRegExp.exec(programPath.hub.file.opts.filename)[1]);
        },
        exit(path) {
          path.unshiftContainer('body', t.variableDeclaration('const', [
            /* eslint-disable comma-dangle */
            t.variableDeclarator(
              t.identifier('modules'),
              t.identifier('{}')
            )
            /* eslint-enable comma-dangle */
          ]));
        },
      },
      ExportDefaultDeclaration: {
        exit(path) {
          if (t.isProgram(path.parent)) {
            path.replaceWith(
              /* eslint-disable comma-dangle */
              t.variableDeclaration('const', [
                t.variableDeclarator(
                  t.identifier(LIBRARY_NAME),
                  path.node.declaration
                )
              ])
              /* eslint-enable comma-dangle */
            );
          } else {
            switch (path.node.declaration.type) {
              case 'ClassDeclaration':
                path.insertAfter(
                  /* eslint-disable comma-dangle */
                  t.returnStatement(path.node.declaration.id)
                  /* eslint-enable comma-dangle */
                );
                path.replaceWith(path.node.declaration);
                break;
              case 'ObjectExpression':
                path.replaceWith(
                  /* eslint-disable comma-dangle */
                  t.returnStatement(path.node.declaration)
                  /* eslint-enable comma-dangle */
                );
                break;
              default:
                throw new Error(`Default export of ${path.node.declaration.type} is not yet supported.`);
            }
          }
        },
      },
      ImportDeclaration: {
        enter(path) {
          const nodeFileName = fileRegExp.exec(path.node.source.value);
          const currentRoot = nodeFileName[1];

          if (roots[roots.length - 1] !== currentRoot) {
            roots.push(currentRoot);
          }

          const fileName = `./${roots.join('')}${nodeFileName[2]}.js`;
          const moduleName = path.node.specifiers[0].local.name;

          if (!visitedFiles[fileName]) {
            const fileContents = fs.readFileSync(fileName, {
              encoding: 'UTF-8',
            });

            const parsedFile = babylon.parse(fileContents, {
              sourceType: 'module',
            }).program.body;

            programPath.unshiftContainer('body', t.variableDeclarator(
              /* eslint-disable comma-dangle */
              t.memberExpression(
                t.identifier('modules'),
                t.identifier(moduleName)
              ),
              t.callExpression(
                t.parenthesizedExpression(
                  t.functionExpression(
                    t.identifier(`define${moduleName}`),
                    [],
                    t.blockStatement(
                      parsedFile
                    )
                  )
                ),
                []
              )
              /* eslint-enable comma-dangle */
            ));
          }

          path.replaceWith(t.variableDeclaration('const', [
            /* eslint-disable comma-dangle */
            t.variableDeclarator(
              t.identifier(moduleName),
              t.memberExpression(
                t.identifier('modules'),
                t.identifier(moduleName)
              )
            )
            /* eslint-enable comma-dangle */
          ]));

          visitedFiles[fileName] = true;
        },
        exit() {
          roots.pop();
        },
      },
    },
  };
};
