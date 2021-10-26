export default (fileInfo, api) => {
  /** @type {import("jscodeshift").JSCodeshift} typeof jscodeshift. */
  const j = api.jscodeshift;

  const root = j(fileInfo.source)
    .find(j.ExpressionStatement, {
      expression: {
        callee: {
          object: {
            name: "console",
          },
          property: {
            name: "log",
          },
        },
      },
    })
    .remove();

  return root.toSource();
};
