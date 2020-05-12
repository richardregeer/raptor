'use strict';

const BaseConfiguration = require('./BaseConfigurationParser');
const Configuration = require('./Configuration');

class CLIConfiguration extends BaseConfiguration {
  parse(options, parsedConfig) {
    const config = parsedConfig || new Configuration();

    if (options.source && options.destination) {
      config.folders.push(this._createFolderSyncObject(options, config));
    }

    if (options.historyStorage) {
      config.historyFile = options.historyStorage;
    }

    if (options.debugMode) {
      config.debugMode = options.debugMode;
    }

    if (options.silentMode) {
      config.silentMode = options.silentMode;
    }

    if (options.force) {
      config.force = options.force;
    }

    if (options.dryRun) {
      config.dryRun = options.dryRun;
    }

    if (options.verbose) {
      config.console.level = 'debug';
    }

    if (options.logFile) {
      Object.assign(config, {
        file: {
          level: options.verbose ? 'debug' : 'info',
          path: options.logFile
        }
      });
    }

    super.validate(config);

    return config;
  }
}

module.exports = CLIConfiguration;
