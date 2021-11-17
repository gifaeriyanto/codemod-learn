import { API, FileInfo } from "jscodeshift";

export default (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  root
    .find(j.ClassDeclaration, {
      superClass: {
        object: {
          name: "React",
        },
        property: {
          name: "Component",
        },
      },
    })
    .forEach((path) => {
      j(path).replaceWith(
        j.variableDeclaration("const", [
          j.variableDeclarator(
            {
              ...path.node.id,
              typeAnnotation: j.tsTypeAnnotation(
                j.tsTypeReference(
                  j.tsQualifiedName(j.identifier("React"), j.identifier("FC")),
                  j.tsTypeParameterInstantiation([
                    j.tsIntersectionType(
                      path.node.superTypeParameters.params as any[]
                    ),
                  ])
                )
              ),
            },
            j.arrowFunctionExpression(
              [],
              (
                path.node.body.body
                  .filter((item) => item.type === "ClassMethod")
                  .find((item: any) => item.key.name === "render") as any
              ).body
            )
          ),
        ])
      );
    });

  return root.toSource();
};
