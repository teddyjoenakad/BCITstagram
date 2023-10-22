const path = require("path");
/*
 * Project: Lab 6
 * File Name: main.js
 * Description:
 *
 * Created Date: 20 October 2023
 * Author: Teddy Nakad
 *
 */

const IOhandler = require("./IOhandler");

const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

const unzip = IOhandler.unzip(zipFilePath, pathUnzipped);
const readDir = IOhandler.readDir(pathUnzipped);
const grayScale = IOhandler.grayScale(readDir, pathProcessed);

Promise.all([unzip, readDir, grayScale]).then(() => {console.log('All images are done!')})