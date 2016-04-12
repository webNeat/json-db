'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _jsonfile = require('jsonfile');

var _io = require('../lib/io.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mocking the database
var db = {
    folder: _path2.default.join(__dirname, 'data')
};

describe('read', function () {

    var usersCollection = void 0;
    before(function () {
        usersCollection = [{ name: 'Foo', age: 32 }, { name: 'Bar', age: 23 }, { name: 'Baz', age: 21 }];
        (0, _jsonfile.writeFileSync)(_path2.default.join(db.folder, 'users.json'), usersCollection);
    });

    it('is curried', function () {
        var fetch = (0, _io.read)(db);
        var fetchUsers = fetch('users');
        fetchUsers.should.be.Function();
        fetchUsers.should.have.length(1);
    });

    it('reads a collection and passes it to the handle function', function (done) {
        (0, _io.read)(db, 'users', function (users) {
            users.should.deepEqual(usersCollection);
            done();
        });
    });

    it('reads and returns the collection when handle is null', function () {
        (0, _io.read)(db, 'users', null).should.deepEqual(usersCollection);
        (0, _io.read)(db, 'users')(null).should.deepEqual(usersCollection);
    });
});