#!/usr/bin/env node
'use strict'

const pngpad = require('../lib')
const log = require('../lib/log')

pngpad().catch(err => {
  log.error(err.message)
  process.exit(1)
})
