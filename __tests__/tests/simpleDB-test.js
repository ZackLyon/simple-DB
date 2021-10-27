const { rm, mkdir } = require('fs/promises');
const simpleDB = require('../../src/simpleDB');

describe('make file', () => {
  const rootDir = './__tests__/objects';

  beforeEach(() => {
    return rm(rootDir, { force: true, recurisive: true }).then(() => {
      mkdir(rootDir, { recursive: true });
    });
  });

  it('should make a file in the objects folder', () => {});
});
