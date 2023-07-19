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
    --position, -p start position, default is center, maybe top, right, bottom, left

	Examples
	  $ pngpad ./input
`, {
  flags: {
    width: {
      type: 'number',
      alias: 'w'
    },
    height: {
      type: 'number',
      alias: 'h'
    },
    position: {
      type: 'string',
      alias: 'p'
    }
  }
})

pngpad(cli.input, cli.flags).catch(err => {
  log.error(err.message)
  process.exit(1)
})
