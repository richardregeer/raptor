'use strict';

class Configuration {
  constructor() {
    this.folders = [];
    this.historyFile = '/var/raptor';
    this.debugMode = false;
    this.silentMode = false;
    this.force = false;
    this.dryRun = false;
    this.console = {
      level: 'info'
    };
    this.file = undefined;
  }

  createFolderSyncObject() {
    return {
      source: undefined,
      destination: undefined,
      fileType: '*',
      cronSchedule: undefined,
      deleteSource: false
    };
  }
}

module.exports = Configuration;
