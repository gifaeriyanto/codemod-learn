export default (fileInfo, api) => {
  /** @type {import("jscodeshift").JSCodeshift} typeof jscodeshift. */
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  root.find(j.VariableDeclaration).forEach((path) => {
    if (
      path.node.declarations[0].id.name &&
      path.node.declarations[0].init.arguments[0].value
    ) {
      j(path).replaceWith(
        j.importDeclaration(
          [
            j.importDefaultSpecifier(
              j.identifier(path.node.declarations[0].id.name)
            ),
          ],
          j.literal(path.node.declarations[0].init.arguments[0].value)
        )
      );
    }
  });

  return root.toSource();
};
