const Jimp = require("jimp");
const sharp = require("sharp");
const fs = require('fs');

fs.readdir("./images/", (err, files) => {
    files.forEach(file => {
        if(!file.includes('.jpg') && !file.includes('.output')) {
            return;
        }

        let fileName = `./images/${file}`;
        let resultFile = `./temp/${file}`;

        Jimp.read(fileName, function (err, image) {
            console.log("Processing: " + file);
            if (err) throw err;
            image.autocrop()
                .quality(100)
                .write(resultFile, function (err, image) {
                    sharp(resultFile)
                        .jpeg({
                            quality: 100,
                        })
                        .background({r: 255, g: 255, b: 255, alpha: 1})
                        .extend({top: 10, bottom: 20, left: 10, right: 10})
                        .toFile(`output-${file}`, function (err) {
                        });
                });
        });
    });
});

