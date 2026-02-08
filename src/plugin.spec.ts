import { describe, it, expect } from 'vitest'
import plugin from './index.js'

describe('eslint-plugin-reflect-metadata', () => {
  it('should export plugin metadata', () => {
    const meta = plugin.meta
    expect(meta).toBeDefined()
    expect(meta && meta.name).toBe('eslint-plugin-reflect-metadata')
  })

  it('should export the reflect-metadata-first rule', () => {
    const rules = plugin.rules
    expect(rules).toBeDefined()
    expect(rules && rules['reflect-metadata-first']).toBeDefined()
  })

  it('should export a recommended config', () => {
    expect(plugin.configs).toBeDefined()
    expect(plugin.configs.recommended).toBeDefined()
    expect(plugin.configs.recommended.rules).toStrictEqual({
      'reflect-metadata/reflect-metadata-first': 'error',
    })
  })
})
