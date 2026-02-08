import { RuleTester } from 'eslint'
import rule from './reflect-metadata-first.js'

const ruleTester = new RuleTester()

ruleTester.run('reflect-metadata-first', rule, {
  valid: [
    {
      name: 'reflect-metadata is the first import (ESM)',
      code: `
import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
`,
    },
    {
      name: 'reflect-metadata/lite is the first import (ESM)',
      code: `
import 'reflect-metadata/lite';
import { Service } from './service.js';
`,
    },
    {
      name: 'reflect-metadata is the only import',
      code: `import 'reflect-metadata';`,
    },
    {
      name: 'no imports at all',
      code: `const x = 1;`,
    },
    {
      name: 'no reflect-metadata import present',
      code: `
import { foo } from 'bar';
import { baz } from 'qux';
`,
    },
    {
      name: 'reflect-metadata first with CJS require (bare)',
      code: `
require('reflect-metadata');
const express = require('express');
`,
    },
    {
      name: 'reflect-metadata first with CJS require (assigned)',
      code: `
require('reflect-metadata');
const { Injectable } = require('@nestjs/common');
`,
    },
    {
      name: 'reflect-metadata/lite first with CJS require',
      code: `
require('reflect-metadata/lite');
const app = require('./app');
`,
    },
    {
      name: 'reflect-metadata first among many imports',
      code: `
import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';
`,
    },
  ],
  invalid: [
    {
      name: 'reflect-metadata after another ESM import',
      code: `
import { Injectable } from '@nestjs/common';
import 'reflect-metadata';
`,
      errors: [{ messageId: 'mustBeFirst' as const }],
    },
    {
      name: 'reflect-metadata/lite after another ESM import',
      code: `
import { foo } from 'bar';
import 'reflect-metadata/lite';
`,
      errors: [{ messageId: 'mustBeFirst' as const }],
    },
    {
      name: 'reflect-metadata after CJS require',
      code: `
const express = require('express');
require('reflect-metadata');
`,
      errors: [{ messageId: 'mustBeFirst' as const }],
    },
    {
      name: 'reflect-metadata after assigned CJS require',
      code: `
const { Injectable } = require('@nestjs/common');
require('reflect-metadata');
`,
      errors: [{ messageId: 'mustBeFirst' as const }],
    },
    {
      name: 'reflect-metadata after multiple imports',
      code: `
import { Module } from '@nestjs/common';
import { AppService } from './app.service.js';
import 'reflect-metadata';
`,
      errors: [{ messageId: 'mustBeFirst' as const }],
    },
    {
      name: 'CJS require reflect-metadata after assigned require',
      code: `
const foo = require('bar');
require('reflect-metadata');
`,
      errors: [{ messageId: 'mustBeFirst' as const }],
    },
  ],
})
