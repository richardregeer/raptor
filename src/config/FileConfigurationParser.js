'use strict';

const BaseConfiguration = require('./BaseConfigurationParser');
const Configuration = require('./Configuration');

class FileConfiguration extends BaseConfiguration {
  parse(options, parsedConfig) {
    const config = parsedConfig || new Configuration();

    const fullFileName = options.configFile;

    if (!this._fileHandler.fileExistsSync(fullFileName)) {
      throw new Error(`File ${fullFileName} does not exsists`);
    }

    const configFile = this._fileHandler.readFileSync(fullFileName);
    const paresedConfig = JSON.parse(configFile);

    paresedConfig.sync.syncFolders.forEach((syncFolder) => {
      config.folders.push(this._createFolderSyncObject(syncFolder, config));
    });

    if (paresedConfig.historyFile) {
      config.historyFile = paresedConfig.historyFile;
    }

    if (paresedConfig.debugMode) {
      config.debugMode = paresedConfig.debugMode;
    }

    if (paresedConfig.silentMode) {
      config.silentMode = paresedConfig.silentMode;
    }

    if (paresedConfig.force) {
      config.force = paresedConfig.force;
    }

    if (paresedConfig.logging.console.level) {
      config.console.level = paresedConfig.logging.console.level;
    }

    if (paresedConfig.logging.file) {
      Object.assign(config, {
        file: {
          level: paresedConfig.logging.file.level || 'info',
          path: paresedConfig.logging.file.path
        }
      });
    }

    super.validate(config);

    return config;
  }
}

module.exports = FileConfiguration;
