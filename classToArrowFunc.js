const j = require("jscodeshift");

export default (fileInfo) => {
  const root = j(fileInfo.source);

  root
    .find(j.ClassDeclaration, {
      id: {
        name: "MyComponent",
      },
    })
    .replaceWith(
      j.variableDeclaration("const", [
        j.variableDeclarator(
          j.identifier("MyComponent"),
          j.arrowFunctionExpression([], j.blockStatement([]))
        ),
      ])
    );

  return root.toSource();
};
