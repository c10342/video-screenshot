const Jimp = require("jimp");
const path = require("path");

const config = require('./config')

module.exports = function moveImage(data) {
  return new Promise((resolve, reject) => {
    Jimp.read(`${config.tempDir}/sprite.png`, function (err, lenna) {
      if (err) {
        reject();
        return;
      }
      lenna
        .quality(parseInt(data.quality))
        .write(path.resolve(process.cwd(), data.output));
      resolve();
    });
  });
};
