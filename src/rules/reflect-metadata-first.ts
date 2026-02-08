import type { Rule } from 'eslint'
import collectImports from './collect-imports.js'
import getLineFromLoc from './get-line-from-loc.js'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure `reflect-metadata` is imported before any other imports',
      recommended: true,
    },
    schema: [],
    messages: {
      mustBeFirst:
        '`reflect-metadata` must be imported before any other import.',
    },
  },
  create(context) {
    return {
      Program(programNode) {
        const entries = collectImports(programNode.body)

        const firstNonReflect = entries.find(e => !e.isReflectMetadata)
        if (!firstNonReflect) return

        const firstOtherLine = getLineFromLoc(firstNonReflect.node.loc)

        for (const entry of entries) {
          if (!entry.isReflectMetadata) continue

          const reflectLine = getLineFromLoc(entry.node.loc)
          if (reflectLine > firstOtherLine) {
            context.report({
              node: entry.node,
              messageId: 'mustBeFirst',
            })
          }
        }
      },
    }
  },
}

export default rule
