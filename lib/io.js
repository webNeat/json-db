'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.read = undefined;

var _ramda = require('ramda');

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a function which when called will read a collection asynchronousely 
 * from the database and pass the result to the given callback.
 *
 * @function
 * @since v0.1.0
 * @category IO
 * @signature DB -> String -> (Collection -> *) -> IO
 * @param {DB} db
 * @param {String} name
 * @param {Function} handle
 * @return {IO} The collection will be read from the database and passed to `handle`.
 * @see readSync
 * @example
 *
 *      // Get all users from the database and log their names
 *      var fetchUsers = read(db, 'users')
 *      fetchUsers(users => {
 *          var names = users.map(user => user.name)
 *          console.log(names)
 *      })
 */
var read = exports.read = (0, _ramda.curry)(function (db, name, handle) {
    return _jsonfile2.default.readFile(_path2.default.join(dataFolder, name + '.json'), function (err, data) {
        if (err) throw err;
        handle(data);
    });
});