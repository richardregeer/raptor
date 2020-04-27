'use strict';

class FileHistoryRepository {
  constructor(fileHasher, fileHandler, historyFileName, logger) {
    this._fileHasher = fileHasher;
    this._fileHandler = fileHandler;
    this._historyFileName = `${historyFileName.trim('/')}/data`;
    this._logger = logger;

    this._files = [];
  }

  exists(fileName) {
    const fileHash = this._fileHasher.hashFileSync(fileName);

    if (this._files.length === 0) {
      this._initialize();
    }

    const exists = this._files.includes(fileHash);
    this._logger.debug(`File hash ${fileHash} exists in store ${exists}`);

    return exists;
  }

  add(fileName, autoStore = false) {
    const fileHash = this._fileHasher.hashFileSync(fileName);

    if (!this.exists(fileName)) {
      this._files.push(fileHash);
      this._logger.debug(`New file hash ${fileHash} added to store`);
    }

    if (autoStore) {
      this.store();
    }
  }

  store() {
    const historyToSave = this._files.join('\n');
    this._fileHandler.writeFileSync(this._historyFileName, historyToSave);
    this._logger.debug(`Stored history data file to ${this._historyFileName}`);
  }

  _initialize() {
    if (!this._fileHandler.fileExistsSync(this._historyFileName)) {
      this._logger.debug(`History data file ${this._historyFileName} not found. Creating a new one`);
      this.store();
    }

    this._logger.debug(`Read history data file ${this._historyFileName} in memory`);
    const historyFiles = this._fileHandler
      .readFileSync(this._historyFileName)
      .split('\n');

    this._files = historyFiles;
  }
}

module.exports = FileHistoryRepository;
