const { rm, readdir } = require('fs/promises');
const SimpleDB = require('../../src/simpleDB');

describe('make folder', () => {
  const rootDir = './__tests__/objects';

  beforeEach(async () => {
    //this is the fs version of rm -rf
    return rm(rootDir, { force: true, recursive: true });
  });

  it('should create a new objects directory in __tests__', () => {
    const expected = ['objects'];
    new SimpleDB(rootDir)
      .then(() => readdir('./__tests__'))
      .then((folders) =>
        expect(folders).toEqual(expect.arrayContaining(expected))
      );
  });

  it('.save should take in an object and add a unique id then make a JSON file with that id as the name, then .get should use id to get that file and parse it', () => {
    const databaseEntry = new SimpleDB(rootDir);

    const objectToSave = { something: 'something' };
    const expected = { id: expect.any(String), something: 'something' };

    return databaseEntry
      .save(objectToSave)
      .then((id) => databaseEntry.get(id))
      .then((obj) => expect(obj).toEqual(expected));
  });
});
