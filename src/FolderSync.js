'use strict';

const path = require('path');

class FolderSync {
  constructor(fileHistoryRepository, directoryFileScanner, fileHandler, logger, schedular) {
    this._fileHandler = fileHandler;
    this._directoryFileScanner = directoryFileScanner;
    this._fileHistoryRepository = fileHistoryRepository;
    this._logger = logger;
    this._schedular = schedular;
    this._files = [];
  }

  syncFolder(fullSource, fullDestination, fileType, cronSchedule, force) {
    if (cronSchedule) {
      this._logger.debug(`Cron schedule ${cronSchedule} found`);

      this._schedular.startJob(cronSchedule, () => {
        this._syncFolderTask(fullSource, fullDestination, fileType, force);
      });

      return;
    }

    this._syncFolderTask(fullSource, fullDestination, fileType, force);
  }

  _syncFolderTask(fullSource, fullDestination, fileType, force) {
    this._logger.debug('Started folder sync');

    const files = this._directoryFileScanner.scan(fullSource, fileType);

    // TODO add task locking
    let filesAdded = 0;
    files.forEach((file) => {
      if (!this._fileHistoryRepository.exists(file) || force) {
        const fileName = path.basename(file);

        this._logger.info(`Sync ${file} to ${fullDestination}/${fileName}`);

        this._fileHandler.copyFileSync(file, `${fullDestination}/${fileName}`);
        this._fileHistoryRepository.add(file);
        filesAdded++;
      }
    });

    if (filesAdded > 0) {
      this._fileHistoryRepository.store();
    }

    this._logger.debug('Finished folder sync');
  }
}

module.exports = FolderSync;
