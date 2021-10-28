const j = require("jscodeshift");

export default (fileInfo) => {
  const root = j(fileInfo.source);

  root.find(j.FunctionExpression).forEach((path) => {
    j(path).replaceWith(
      j.arrowFunctionExpression(path.node.params, path.node.body)
    );
  });

  return root.toSource();
};
