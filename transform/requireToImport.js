export default (fileInfo, api) => {
  /** @type {import("jscodeshift").JSCodeshift} typeof jscodeshift. */
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let libList = [];
  const selector = root.find(j.VariableDeclaration);
  selector.forEach((p) =>
    p.node.declarations.find((item) =>
      libList.push(...item.init.arguments.map((argument) => argument.value))
    )
  );

  // Import default
  selector
    .forEach((p) => p.get("require"))
    .replaceWith((_p, i) =>
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier(libList[i]))],
        j.literal(libList[i])
      )
    );

  // selector
  //   .forEach((p) => {
  //     return p.get("require");
  //   })
  //   .replaceWith((_p, i) => {
  //     return j.importDeclaration(
  //       [j.importSpecifier(j.identifier("x"), j.identifier("x"))],
  //       j.literal(libList[i])
  //     );
  //   });

  return root.toSource();
};
