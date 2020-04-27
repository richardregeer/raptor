'use strict';

const fs = require('fs');
const path = require('path');

class FileHasher {
  constructor(hash, logger) {
    this._hash = hash;
    this._logger = logger;
  }

  hashFileSync(fullFileName) {
    const fileName = path.basename(fullFileName);

    if (!fs.existsSync(fullFileName)) {
      throw new Error(`File ${fileName} does not exsists`);
    }

    const fileHash = this._hash.fromFileSync(fullFileName, { algorithm: 'sha1' });
    this._logger.debug(`Calculated sha1 hash ${fileHash} from file ${fullFileName}`);

    return fileHash;
  }
}

module.exports = FileHasher;
