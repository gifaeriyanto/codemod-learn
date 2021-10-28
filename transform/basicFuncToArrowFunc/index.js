const j = require("jscodeshift");

export default (fileInfo) => {
  const root = j(fileInfo.source);

  root.find(j.FunctionDeclaration).forEach((path) => {
    j(path).replaceWith(
      j.variableDeclaration("const", [
        j.variableDeclarator(
          path.node.id,
          j.arrowFunctionExpression(path.node.params, path.node.body)
        ),
      ])
    );
  });

  return root.toSource();
};
