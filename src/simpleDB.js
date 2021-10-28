const { mkdir } = require('fs/promises');

class SimpleDB {
  constructor(rootDir) {
    return mkdir(rootDir, { force: true, recursive: true });
  }
}

module.exports = SimpleDB;
