'use strict'
const path = require('path')
const readdir = require('readdir-enhanced')

const maxSize = require('./maxsize')
const pad = require('./pad')
const log = require('./log')

module.exports = async function () {
  const cwd = process.cwd()

  log.info(`reading from dir: ${cwd}`)

  let files
  try {
    files = await readdir.async(cwd, {filter: '*.png'})
  } catch (err) {
    throw err
  }

  if (!files || files.length < 1) {
    log.warn('no png files found!')
    return
  }

  let maxDim
  try {
    maxDim = await maxSize(files)
  } catch (err) {
    throw err
  }

  log.info(`found max dimension is: ${maxDim.maxWidth} * ${maxDim.maxHeight}`)

  try {
    await Promise.all(files.map(async file => {
      log.info(`Processing ${file} ...`)
      const distImg = await pad(path.join(cwd, file), maxDim.maxWidth, maxDim.maxHeight)
      distImg.write(path.join(cwd, 'output', file))
    }))
    log.success('done!')
  } catch (err) {
    throw err
  }
}
