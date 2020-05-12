'use strict';

const shell = require('shelljs');
const program = require('commander');
const chalk = require('chalk');
const hasha = require('hasha');

const DirectoryFileScanner = require('./file/DirectoryFileScanner');
const FolderSync = require('./FolderSync');
const FileHandler = require('./file/FileHandler');
const FileHasher = require('./file/FileHasher');
const LoggerFactory = require('./logging/LoggerFactory');
const FileHistoryRepository = require('./history/FileHistoryRepository');
const CLIConfigurationParser = require('./config/CLIConfigurationParser');
const FileConfigurationParser = require('./config/FileConfigurationParser');

const Schedular = require('./cron/Schedular');

const { version } = require('../package.json');

const loggerFactory = new LoggerFactory();
let logger = loggerFactory.createLogger();

// Show ascii logo
console.log(chalk.green(shell.cat(shell.pwd() + '/assets/ascii-name.txt').toString()));

// Run application
program
  .name('raptor')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .version(version, '-v, --version')
  .option('-s,             --source <source>', 'The full path of the source directory to copy')
  .option('-d,             --destination <destination>', 'The full path of the destination directory of the files to copy')
  .option('--delete-source  <deleteSource>', 'After the file is copied, remove it from the source folder')
  .option('--dry-run', 'Test run, do not copy or remove files')
  .option('-i,             --history-storage <historyStorage>', 'The full path of the history storage file')
  .option('-t,             --file-type <type>', 'The type of files to copy')
  .option('-V,             --verbose', 'Log all output to console')
  .option('-D,             --debug-mode', 'Enable debug mode')
  .option('-f,             --force', 'Ignore history and copy all files')
  .option('-l,             --log-file <logFile>', 'The full path of the logfile')
  .option('-S,             --silent', 'Disable all console output')
  .option('-c,             --config-file <configFile>', 'The full path of the Config file to use')
  .action(run);

function run(options) {
  const fileHandler = new FileHandler();
  const fileConfigParser = new FileConfigurationParser(fileHandler);
  const cliConfigParser = new CLIConfigurationParser(fileHandler);
  let config = {};

  if (options.configFile) {
    config = fileConfigParser.parse(options);
  }

  // After the configuration parse the CLI options. They will override the config file.
  config = { ...config, ...cliConfigParser.parse(options, config) };

  logger = loggerFactory.createLogger(config.silentMode, config.console.level);

  if (config.debugMode) {
    logger.debugMode = true;
  }

  if (config.file) {
    logger.addFileLogger(config.file.path, config.file.level);
  }

  const schedular = new Schedular(logger);
  const fileHasher = new FileHasher(hasha, logger);
  const directoryFileScanner = new DirectoryFileScanner(shell, logger);
  const fileHistoryRepository = new FileHistoryRepository(
    fileHasher,
    fileHandler,
    config.historyFile,
    logger
  );
  const folderSync = new FolderSync(
    fileHistoryRepository,
    directoryFileScanner,
    fileHandler,
    logger,
    schedular
  );

  const { folders, force, dryRun } = config;
  folders.forEach((syncFolder) => {
    folderSync.syncFolder(
      syncFolder.source,
      syncFolder.destination,
      syncFolder.fileType,
      syncFolder.cronSchedule,
      syncFolder.deleteSource,
      force,
      dryRun
    );
  });
}

try {
  program.parse(process.argv);
} catch (error) {
  logger.error(`Error in Raptor folder sync: ${error.message}`, error);
  process.exit(1);
}
