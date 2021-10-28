const { rm, readdir, mkdir } = require('fs/promises');
const SimpleDB = require('../../src/simpleDB');

describe('make folder', () => {
  const rootDir = './storage/objects';

  beforeEach(() => {
    //this is the fs version of rm -rf
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  it('should create a new objects directory in __tests__', () => {
    const expected = ['objects'];
    new SimpleDB(rootDir);

    return readdir('./storage').then((folders) =>
      expect(folders).toEqual(expect.arrayContaining(expected))
    );
  });

  it('.save should take in an object and add a unique id then make a JSON file with that id as the name, then .get should use id to get that file and parse it', () => {
    const newDB = new SimpleDB(rootDir);
    const newObj = { something: 'something' };
    return newDB
      .save(newObj)
      .then(() => newDB.get(newObj.id))
      .then((results) => expect(results).toEqual(newObj));
  });

  it('should return null if get(id) does not find a file', () => {
    const fakeId = 'looksFake';
    const newDB = new SimpleDB(rootDir);
    return newDB.get(fakeId).then((results) => expect(results).toEqual(null));
  });
});
