const { mkdir, writeFile, readFile } = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

class SimpleDB {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  save(obj) {
    this.id = nanoid().slice(0, 5);
    const filename = `${this.id}.json`;
    const filePath = path.join(this.rootDir, filename);

    obj.id = this.id;
    const stringyObj = JSON.stringify(obj);
    return writeFile(filePath, stringyObj);
  }

  get(id) {
    const newPath = `${this.rootDir}/${id}.json`;
    return readFile(newPath, JSON)
      .then((result) => JSON.parse(result))
      .catch((err) => {
        if (err.code === 'ENOENT') {
          return null;
        }
        throw err;
      });
  }
}

module.exports = SimpleDB;
