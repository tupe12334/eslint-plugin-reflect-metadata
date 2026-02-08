import { describe, it, expect } from 'vitest'
import collectImports from './collect-imports.js'

describe('collectImports', () => {
  it('should collect ESM import declarations', () => {
    const body = [
      {
        type: 'ImportDeclaration',
        source: { type: 'Literal', value: 'reflect-metadata' },
        specifiers: [],
        loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 27 } },
      },
      {
        type: 'ImportDeclaration',
        source: { type: 'Literal', value: 'foo' },
        specifiers: [],
        loc: { start: { line: 2, column: 0 }, end: { line: 2, column: 20 } },
      },
    ]

    const result = collectImports(body)
    expect(result).toHaveLength(2)
    expect(result[0].isReflectMetadata).toBe(true)
    expect(result[1].isReflectMetadata).toBe(false)
  })

  it('should collect CJS require calls', () => {
    const body = [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: { type: 'Identifier', name: 'require' },
          arguments: [{ type: 'Literal', value: 'reflect-metadata' }],
        },
        loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 27 } },
      },
    ]

    const result = collectImports(body)
    expect(result).toHaveLength(1)
    expect(result[0].isReflectMetadata).toBe(true)
  })

  it('should collect CJS variable declaration requires', () => {
    const body = [
      {
        type: 'VariableDeclaration',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: { type: 'Identifier', name: 'foo' },
            init: {
              type: 'CallExpression',
              callee: { type: 'Identifier', name: 'require' },
              arguments: [{ type: 'Literal', value: 'bar' }],
            },
          },
        ],
        kind: 'const',
        loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 27 } },
      },
    ]

    const result = collectImports(body)
    expect(result).toHaveLength(1)
    expect(result[0].isReflectMetadata).toBe(false)
  })

  it('should return empty for non-import statements', () => {
    const body = [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: { type: 'Identifier', name: 'console' },
          arguments: [{ type: 'Literal', value: 'hello' }],
        },
      },
    ]

    const result = collectImports(body)
    expect(result).toHaveLength(0)
  })
})
