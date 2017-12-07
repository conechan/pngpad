'use strict'
const Jimp = require('jimp')

module.exports = function (file, maxWidth, maxHeight) {
  return Jimp.read(file).then(img => {
    return (new Jimp(maxWidth, maxHeight))
      .composite(img, (maxWidth - img.bitmap.width) / 2,
       (maxHeight - img.bitmap.height) / 2)
  })
}
