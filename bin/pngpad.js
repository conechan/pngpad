#!/usr/bin/env node
'use strict'

const meow = require('meow')
const pngpad = require('../lib')
const log = require('../lib/log')

const cli = meow(`
	Usage
	  $ pngpad <src> <dest>

	Options
    --width, -w  output width
    --height, -h output height

	Examples
	  $ pngpad ./input
`, {
  flags: {
    width: {
      type: 'number',
      alias: 'w'
    },
    height: {
      type: 'height',
      alias: 'h'
    }
  }
})

pngpad(cli.input, cli.flags).catch(err => {
  log.error(err.message)
  process.exit(1)
})
