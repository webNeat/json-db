'use strict';

var _chai = require('chai');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      _chai.assert.equal(-1, [1, 2, 3].indexOf(5));
      _chai.assert.equal(-1, [1, 2, 3].indexOf(0));
    });
  });
});