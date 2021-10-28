const { rm, readdir } = require('fs/promises');
const SimpleDB = require('../../src/simpleDB');

describe('make file', () => {
  const rootDir = './__tests__/objects';

  beforeEach(() => {
    //this is the fs version of rm -rf
    return rm(rootDir, { force: true, recursive: true });
  });

  it('should create a new objects directory in __tests__', async () => {
    new SimpleDB(rootDir);
    const actual = await readdir('./__tests__');
    const expected = ['objects'];

    expect(actual).toEqual(expect.arrayContaining(expected));
  });
});
