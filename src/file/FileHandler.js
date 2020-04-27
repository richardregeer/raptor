'use strict';

const fs = require('fs');
const path = require('path');

class FileHandler {
  fileExistsSync(fullFileName) {
    if (!fs.existsSync(fullFileName)) {
      return false;
    }

    return true;
  }

  copyFileSync(fullSource, fullDestination) {
    const sourceDirName = path.dirname(fullSource);
    const destinationDirName = path.dirname(fullDestination);
    const fileName = path.basename(fullSource);

    if (!fs.existsSync(fullSource)) {
      throw new Error(`Unable to copy file ${fileName} from ${sourceDirName}, it does not exists`);
    }

    if (!fs.existsSync(destinationDirName)) {
      fs.mkdirSync(destinationDirName, { recursive: true });
    }

    fs.copyFileSync(fullSource, fullDestination);
  }

  readFileSync(fullFileName) {
    const fileName = path.basename(fullFileName);

    if (!fs.existsSync(fullFileName)) {
      throw new Error(`File ${fileName} does not exsists`);
    }

    return fs.readFileSync(fullFileName).toString();
  }

  writeFileSync(fullFileName, contents) {
    const dirName = path.dirname(fullFileName);

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }

    fs.writeFileSync(fullFileName, contents);
  }
}

module.exports = FileHandler;
