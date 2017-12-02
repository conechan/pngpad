const path = require('path')
const getSize = require('./getsize')

module.exports = async function (files) {
  const cwd = process.cwd()
  let maxWidth = 0
  let maxHeight = 0

  try {
    await Promise.all(files.map(async file => {
      const dim = await getSize(path.join(cwd, file))
      if (dim.width > maxWidth) {
        maxWidth = dim.width
      }
      if (dim.height > maxHeight) {
        maxHeight = dim.height
      }
    }))
  } catch (err) {
    console.error(err)
  }

  return {
    maxWidth,
    maxHeight
  }
}
