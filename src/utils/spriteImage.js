const nsg = require("node-sprite-generator");
const config = require('./config')

module.exports = function spriteImage() {
  return new Promise((resolve, reject) => {
    nsg(
      {
        src: [`${config.tempDir}/*.png`],
        spritePath: `${config.tempDir}/sprite.png`,
        stylesheetPath: `${config.tempDir}/sprite.css`,
        layout: "horizontal",
        compositor: "jimp"
      },
      function (err) {
        if (err) {
          reject();
          return;
        }
        resolve();
      }
    );
  });
};
