'use strict';

class Configuration {
  constructor(fileHandler) {
    this._fileHandler = fileHandler;
    this._config = this._initializeConfig();
  }

  parseCLI(options) {
    // CLI will always override the settings done by the configuration file
    if (options.source && options.destination) {
      this._config.folders.push(this._createSyncObject(options));
    }

    if (options.historyStorage) {
      this._config.historyFile = options.historyStorage;
    }

    if (options.debugMode) {
      this._config.debugMode = options.debugMode;
    }

    if (options.silentMode) {
      this._config.silentMode = options.silentMode;
    }

    if (options.force) {
      this._config.force = options.force;
    }

    if (options.verbose) {
      this._config.console.level = 'debug';
    }

    if (options.logFile) {
      Object.assign(this._config, {
        file: {
          level: options.verbose ? 'debug' : 'info',
          path: options.logFile
        }
      });
    }

    this._validate();
  }

  parseConfigFile(fullFileName) {
    if (!this._fileHandler.fileExistsSync(fullFileName)) {
      throw new Error(`File ${fullFileName} does not exsists`);
    }

    const configFile = this._fileHandler.readFileSync(fullFileName);
    const config = JSON.parse(configFile);

    this._config.folders = [];
    config.sync.syncFolders.forEach((syncFolder) => {
      this._config.folders.push(this._createSyncObject(syncFolder));
    });

    this._config.historyFile = config.historyFile;

    this._config.debugMode = config.debugMode || false;
    this._config.silentMode = config.silentMode || false;
    this._config.force = config.force || false;

    this._config.console.level = config.logging.console.level || 'info';

    if (config.logging.file) {
      Object.assign(this._config, {
        file: {
          level: config.logging.file.level || 'info',
          path: config.logging.file.path
        }
      });
    }

    this._validate();
  }

  _initializeConfig() {
    return {
      folders: [],
      historyFile: '/var/raptor',
      debugMode: false,
      silentMode: false,
      force: false,
      console: {
        level: 'info'
      },
      file: undefined
    };
  }

  _createSyncObject(options) {
    return {
      source: options.source,
      destination: options.destination,
      fileType: options.fileType || '*',
      cronSchedule: options.cronSchedule
    };
  }

  _validate() {
    if (!this._fileHandler.fileExistsSync(this._config.historyFile)) {
      throw new Error(`History storage path ${this._config.historyFile} does not exists`);
    }

    if (this._config.folders.length === 0) {
      throw new Error('No sync folders defined');
    }

    this._config.folders.forEach((folder) => {
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

  get syncFolders() {
    return this._config.folders;
  }

  get historyFile() {
    return this._config.historyFile;
  }

  get silentMode() {
    return this._config.silentMode;
  }

  get debugMode() {
    return this._config.debugMode;
  }

  get force() {
    return this._config.force;
  }

  get consoleLog() {
    return this._config.console;
  }

  get fileLog() {
    return this._config.file;
  }
}

module.exports = Configuration;
