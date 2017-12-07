'use strict'
const Jimp = require('jimp')

module.exports = file => Jimp.read(file).then(img => {
  return {
    width: img.bitmap.width,
    height: img.bitmap.height
  }
})
