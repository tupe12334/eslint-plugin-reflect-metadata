import type { ESLint, Linter } from 'eslint'
import reflectMetadataFirst from './rules/reflect-metadata-first.js'

const plugin: ESLint.Plugin = {
  meta: {
    name: 'eslint-plugin-reflect-metadata',
    version: '0.1.1',
  },
  rules: {
    'reflect-metadata-first': reflectMetadataFirst,
  },
}

const pluginRef = plugin satisfies ESLint.Plugin

const configs: Record<string, Linter.Config> = {
  recommended: {
    plugins: {
      'reflect-metadata': pluginRef,
    },
    rules: {
      'reflect-metadata/reflect-metadata-first': 'error',
    },
  },
}

const exported: ESLint.Plugin & { configs: Record<string, Linter.Config> } = {
  ...plugin,
  configs,
}

export default exported
