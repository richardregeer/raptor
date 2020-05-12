'use strict';

const path = require('path');
const chalk = require('chalk');

class FolderSync {
  constructor(fileHistoryRepository, directoryFileScanner, fileHandler, logger, schedular) {
    this._fileHandler = fileHandler;
    this._directoryFileScanner = directoryFileScanner;
    this._fileHistoryRepository = fileHistoryRepository;
    this._logger = logger;
    this._schedular = schedular;
    this._files = [];
  }

  syncFolder(fullSource, fullDestination, fileType, cronSchedule, deleteSource, force, dryRun) {
    if (cronSchedule && !dryRun) {
      this._logger.debug(`Cron schedule ${cronSchedule} found`);

      this._schedular.startJob(cronSchedule, () => {
        this._syncFolderTask(fullSource, fullDestination, fileType, deleteSource, force, dryRun);
      });

      return;
    }

    if (dryRun) {
      this._logger.info(chalk.yellow('Dry-run started'));
    }

    this._syncFolderTask(fullSource, fullDestination, fileType, deleteSource, force, dryRun);
  }

  _syncFolderTask(fullSource, fullDestination, fileType, deleteSource, force, dryRun) {
    this._logger.debug('Started folder sync');

    const files = this._directoryFileScanner.scan(fullSource, fileType);

    // TODO add task locking
    let filesAdded = 0;
    files.forEach((file) => {
      if (!this._fileHistoryRepository.exists(file) || force) {
        const fileName = path.basename(file);

        this._logger.info(`Sync ${file} to ${fullDestination}/${fileName}`);

        if (!dryRun) {
          this._fileHandler.copyFileSync(file, `${fullDestination}/${fileName}`);
          this._fileHistoryRepository.add(file);
          filesAdded++;

          if (deleteSource) {
            this._logger.info(`Deleted source ${file}`);
            this._fileHandler.deleteFileSync(file);
          }
        }
      }
    });

    if (filesAdded > 0) {
      this._fileHistoryRepository.store();
    }

    this._logger.debug(chalk.green('Finished folder sync'));
  }
}

module.exports = FolderSync;
