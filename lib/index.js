const path = require('path')
const readdir = require('readdir-enhanced')

const maxSize = require('./maxsize')
const pad = require('./pad')

module.exports = async function () {
  const cwd = process.cwd()
  console.log('Reading from dir:', cwd)

  const files = await readdir.async(cwd, {filter: '*.png'})

  const maxDim = await maxSize(files)

  console.log('max dimension is:', maxDim)

  try {
    await Promise.all(files.map(async file => {
      console.log('Processing', file, '...')
      const distImg = await pad(path.join(cwd, file), maxDim.maxWidth, maxDim.maxHeight)
      distImg.write(path.join(cwd, 'output', file))
    }))
    console.log('Done!')
  } catch (err) {
    console.error(err)
  }
}
