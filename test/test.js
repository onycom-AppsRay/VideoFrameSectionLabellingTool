const assert = require('assert');
const prettyHTML = require('diffable-html');
require('jsdom-global')();

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    })

    it('Header component - HTML', () => {
      const el = document.createElement('div');
      
      const outputHTML = prettyHTML(`
        <header class="header">
          <h1>todos</h1>
          <input class="new-todo" placeholder="What needs to be done?" value="" />
        </header>
      `);
    })
  });
});
