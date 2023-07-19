'use strict'
const Jimp = require('jimp')

module.exports = function (file, maxWidth, maxHeight, position) {
  return Jimp.read(file).then(img => {
    const jimp = new Jimp(maxWidth, maxHeight)

    if (position === 'top') {
      return jimp.composite(
        img,
        (maxWidth - img.bitmap.width) / 2,
        0
      )
    } if (position === 'bottom') {
      return jimp.composite(
        img,
        (maxWidth - img.bitmap.width) / 2,
        maxHeight - img.bitmap.height
      )
    } if (position === 'left') {
      return jimp.composite(
        img,
        0,
        (maxHeight - img.bitmap.height) / 2
      )
    } if (position === 'right') {
      return jimp.composite(
        img,
        maxWidth - img.bitmap.width,
        (maxHeight - img.bitmap.height) / 2
      )
    }
    return jimp.composite(
      img,
      (maxWidth - img.bitmap.width) / 2,
      (maxHeight - img.bitmap.height) / 2
    )
  })
}
