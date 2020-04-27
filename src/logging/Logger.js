'use strict';

const { transports, format } = require('winston');

const chalk = require('chalk');

class Logger {
  constructor(logger) {
    this._logger = logger;
    this._debugMode = false;
  }

  set debugMode(value) {
    this._debugMode = value;
  }

  debug(message) {
    this._logger.debug(message);
  }

  info(message) {
    this._logger.info(message);
  }

  warning(message) {
    this._logger.warn(chalk.yellow(message));
  }

  error(message, error) {
    if (error && this._debugMode) {
      console.log(error);
      this._logger.error(chalk.red(message));
    } else {
      this._logger.error(chalk.red(message));
    }
  }

  addFileLogger(fullPath, logLevel = 'info') {
    const logFilePath = `${fullPath.trim('/')}/raptor.log`;

    this._logger.add(new transports.File({
      filename: logFilePath,
      logLevel,
      format: format.combine(
        format.timestamp(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      )
    }));
  }
}

module.exports = Logger;
