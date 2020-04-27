'use strict';

const { CronJob } = require('cron');

class Schedular {
  constructor(logger) {
    this._logger = logger;
  }

  startJob(cronSchedule, task) {
    try {
      this._logger.debug(`Create a new job with schedule ${cronSchedule}`);
      const job = new CronJob(cronSchedule, task);

      job.start();
      this._logger.debug(`Job with schedule ${cronSchedule} started`);
    } catch (error) {
      throw new Error(`${cronSchedule} is an invalid cron pattern`);
    }
  }
}

module.exports = Schedular;
