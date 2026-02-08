# eslint-plugin-reflect-metadata

ESLint plugin to ensure `reflect-metadata` is imported before any other imports.

## Why?

`reflect-metadata` must be loaded before any code that relies on decorator metadata. If another module is imported first and uses decorators, the metadata won't be available. This plugin enforces that `reflect-metadata` (or `reflect-metadata/lite`) always appears as the very first import in your entry files.

## Installation

```bash
npm install --save-dev eslint-plugin-reflect-metadata
```

## Usage

Add the recommended configuration to your `eslint.config.mjs`:

```js
import reflectMetadata from 'eslint-plugin-reflect-metadata'

export default [
  reflectMetadata.configs.recommended,
  // ...your other configs
]
```

Or configure the rule manually:

```js
import reflectMetadata from 'eslint-plugin-reflect-metadata'

export default [
  {
    plugins: {
      'reflect-metadata': reflectMetadata,
    },
    rules: {
      'reflect-metadata/reflect-metadata-first': 'error',
    },
  },
]
```

## Rules

### `reflect-metadata/reflect-metadata-first`

Ensures that `reflect-metadata` or `reflect-metadata/lite` is imported before any other import in the file.

**Incorrect:**

```js
import { Injectable } from '@nestjs/common'
import 'reflect-metadata' // Error: must be first
```

```js
const express = require('express')
require('reflect-metadata') // Error: must be first
```

**Correct:**

```js
import 'reflect-metadata'
import { Injectable } from '@nestjs/common'
```

```js
require('reflect-metadata')
const express = require('express')
```

Both ESM `import` statements and CommonJS `require()` calls are supported.

## Requirements

- Node.js >= 20.0.0
- ESLint >= 8.0.0

## License

MIT
