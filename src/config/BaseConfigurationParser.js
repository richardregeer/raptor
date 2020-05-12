'use strict';

class BaseConfiguration {
  constructor(fileHandler) {
    this._fileHandler = fileHandler;
  }

  parse(fullFileName) {
    throw new Error(`Please extend the parse method with argument ${fullFileName}`);
  }

  _createFolderSyncObject(options, config) {
    const folderSync = config.createFolderSyncObject();

    if (options.source) {
      folderSync.source = options.source;
    }

    if (options.destination) {
      folderSync.destination = options.destination;
    }

    if (options.fileType) {
      folderSync.fileType = options.fileType;
    }

    if (options.deleteSource) {
      folderSync.deleteSource = options.deleteSource;
    }

    if (options.cronSchedule) {
      folderSync.cronSchedule = options.cronSchedule;
    }

    return folderSync;
  }

  validate(config) {
    if (!this._fileHandler.fileExistsSync(config.historyFile)) {
      throw new Error(`History storage path ${config.historyFile} does not exists`);
    }

    if (config.folders.length === 0) {
      throw new Error('No sync folders defined');
    }

    config.folders.forEach((folder) => {
      if (!folder.source) {
        throw new Error('No source path found');
      }

      if (!folder.destination) {
        throw new Error('No destination path found');
      }

      if (!this._fileHandler.fileExistsSync(folder.source)) {
        throw new Error(`Source path ${folder.source} does not exists`);
      }

      if (!this._fileHandler.fileExistsSync(folder.destination)) {
        throw new Error(`Destination path ${folder.destination} does not exists`);
      }
    });
  }
}

module.exports = BaseConfiguration;
