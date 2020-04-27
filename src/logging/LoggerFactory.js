'use strict';

const { createLogger, transports, format } = require('winston');

const { printf } = format;

const Logger = require('./Logger');

class LoggerFactory {
  constructor(fileHandler) {
    this._fileHandler = fileHandler;
  }

  createLogger(silent = false, level = 'info') {
    const customFormat = printf(({ message }) => {
      return `${message}`;
    });

    const winstonLogger = createLogger({
      transports: [
        new transports.Console({ level, format: customFormat, silent })
      ]
    });

    return new Logger(winstonLogger);
  }
}

module.exports = LoggerFactory;
