'use strict';

const fs = require('fs');
const path = require('path');

const coreFileSystemAdapter = {
  fs,
  path
};

module.exports = coreFileSystemAdapter;
