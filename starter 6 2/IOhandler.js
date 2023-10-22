/*
 * Project: Lab 6
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: 20 October 2023
 * Author: Teddy Nakad
 *
 */

const unzipper = require("unzipper");
const fs = require("fs").promises;
const PNG = require("pngjs").PNG;
const path = require("path");
const { createReadStream, createWriteStream } = require("fs");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return fs.access(pathIn)
  .then(() => {createReadStream(pathIn)
      .pipe(unzipper.Extract({ path: pathOut }))})
  .then(() => (console.log('file has been unzipped')))     
  .catch((err) => {console.error(err)});
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  const PNGfiles = [];
  fs.readdir(dir)
  .then((files) => {
    files.forEach((file) => {if (path.extname(file) === '.png') {PNGfiles.push(path.join(dir, file));}});
    return PNGfiles;
  })
  .catch((err) => {console.error(err)});
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  pathIn.forEach((file) => {
  createReadStream(file)
    .pipe(new PNG({}))
    .on('parsed', function () {
      for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            let idx = (this.width * y + x) << 2;
            const gray = (this.data[idx] + this.data[idx+1] + this.data[idx+2])/3;
            this.data[idx] = gray; //RED
            this.data[idx + 1] = gray; //GREEN
            this.data[idx + 2] = gray; //BLUE

            this.data[idx + 3] = this.data[idx + 3] >> 1; //ALPHA
          }}
          this.pack().pipe(createWriteStream(pathOut));
      });
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
