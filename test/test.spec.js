const { remote } = require('electron');

describe('test', () => {
  it('test', () => {
    const app = remote.app;

    console.log(app.getAppPath());
  })
})
