'use strict';

class DirectoryFileScanner {
  constructor(cli, logger) {
    this._cli = cli;
    this._logger = logger;
  }

  scan(fullPath, fileType) {
    if (!this._cli.test('-e', fullPath)) {
      throw new Error(`${fullPath} does not exists`);
    }

    const searchQuery = `${fullPath.trim('/')}/*.${fileType}`;

    const files = this._cli.ls(searchQuery);
    this._logger.debug(`Found ${files.length} files in path ${searchQuery}`);

    return files;
  }
}

module.exports = DirectoryFileScanner;
