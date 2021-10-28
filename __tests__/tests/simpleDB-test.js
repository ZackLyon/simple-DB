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

  // it('should create an object with a unique id with that id as the name of JSON file', ())
});
