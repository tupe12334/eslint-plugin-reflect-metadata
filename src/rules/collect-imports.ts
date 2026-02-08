import type { Node } from 'estree'

const REFLECT_METADATA_PACKAGES = ['reflect-metadata', 'reflect-metadata/lite']

interface ImportEntry {
  node: Node
  isReflectMetadata: boolean
}

function isReflectMetadataSource(source: string): boolean {
  return REFLECT_METADATA_PACKAGES.includes(source)
}

function getRequireSource(expr: Node): string | undefined {
  if (
    expr.type === 'CallExpression' &&
    expr.callee.type === 'Identifier' &&
    expr.callee.name === 'require' &&
    expr.arguments.length === 1 &&
    expr.arguments[0].type === 'Literal' &&
    typeof expr.arguments[0].value === 'string'
  ) {
    return expr.arguments[0].value
  }
  return undefined
}

export default function collectImports(body: Node[]): ImportEntry[] {
  const entries: ImportEntry[] = []

  for (const statement of body) {
    if (statement.type === 'ImportDeclaration') {
      const source = String(statement.source.value)
      entries.push({
        node: statement,
        isReflectMetadata: isReflectMetadataSource(source),
      })
    } else if (statement.type === 'ExpressionStatement') {
      const source = getRequireSource(statement.expression)
      if (source !== undefined) {
        entries.push({
          node: statement,
          isReflectMetadata: isReflectMetadataSource(source),
        })
      }
    } else if (statement.type === 'VariableDeclaration') {
      for (const decl of statement.declarations) {
        if (!decl.init) continue
        const source = getRequireSource(decl.init)
        if (source !== undefined) {
          entries.push({
            node: statement,
            isReflectMetadata: isReflectMetadataSource(source),
          })
        }
      }
    }
  }

  return entries
}
