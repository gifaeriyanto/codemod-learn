const j = require("jscodeshift");

export default (fileInfo) => {
  const root = j(fileInfo.source);

  root.find(j.FunctionDeclaration).forEach((path) => {
    j(path).replaceWith(
      j.variableDeclaration("const", [
        j.variableDeclarator(
          j.identifier(path.node.id.name),
          j.arrowFunctionExpression(
            path.node.params,
            j.blockStatement(path.node.body.body)
          )
        ),
      ])
    );
  });

  return root.toSource();
};
