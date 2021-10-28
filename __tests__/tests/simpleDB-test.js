const { rm, mkdir, readdir } = require('fs/promises');
const SimpleDB = require('../../src/simpleDB');

describe('make file', () => {
  const rootDir = './__tests__/objects';

  beforeEach(() => {
    return mkdir(rootDir, { recursive: true });
  });

  afterEach(() => {
    //this is the fs version of rm -rf
    return rm(rootDir, { force: true, recursive: true });
  });

  it('should create a new objects directory in __tests__', async () => {
    const actual = await readdir('./__tests__');
    const expected = ['objects'];

    expect(actual).toEqual(expect.arrayContaining(expected));
  });
});
