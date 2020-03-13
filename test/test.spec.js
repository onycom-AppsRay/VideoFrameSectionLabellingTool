import fileExplorer from '../src/helpers/file_explorer';

describe('test', () => {
  it('test', (done) => {
    fileExplorer.getFileList('/Users/parkyounghwan/Documents/programming/nodejs/electron-boilerplate')
      .then((res) => {
        done(res);
      })
      .catch((err) => {
        throw done(err);
      });
  })
})
