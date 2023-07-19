'use strict'
const path = require('path')
const readdir = require('readdir-enhanced')

const maxSize = require('./maxsize')
const pad = require('./pad')
const log = require('./log')

module.exports = async function (input, flags) {
  const cwd = process.cwd()
  const [srcDir = cwd, destDir = path.join(cwd, './output')] = input

  log.info(`reading from dir: ${srcDir}`)

  let files
  try {
    files = await readdir.async(srcDir, {filter: '*.png'})
  } catch (err) {
    throw err
  }

  if (!files || files.length === 0) {
    throw new Error('no png files found!')
  }

  let {width, height, position} = flags

  if (!width || !height) {
    try {
      ({maxWidth: width, maxHeight: height} = await maxSize(files))
      log.info(`found max dimension is: ${width} * ${height}`)
    } catch (err) {
      throw err
    }
  }
  log.info(`the output dimension should be ${width} * ${height}`)

  try {
    await Promise.all(files.map(async file => {
      log.info(`Processing ${file} ...`)
      const distImg = await pad(path.join(srcDir, file), width, height, position)
      distImg.write(path.join(destDir, file))
    }))
    log.success(`done in dir: ${destDir}`)
  } catch (err) {
    throw err
  }
}
