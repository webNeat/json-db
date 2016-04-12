'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.read = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ramda = require('ramda');

var _jsonfile = require('jsonfile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reads a collection asynchronousely from the database and pass the result 
 * to the `handle` callback. If `handle == null`, it will read the collection
 * Synchronousely from the database and return the result.
 *
 * @function
 * @data
 * @field {String} name
 * @field {Number} age
 * @since v0.1.0
 * @category IO
 * @signature DB -> String -> (Collection -> *) | null -> IO
 * @param {DB} db
 * @param {String} name
 * @param {Function} handle
 * @return {IO} The collection will be read from the database and passed to 
 *              `handle` or returned if `handle == null`
 * @see write
 * @example
 *
 *      // Get all users from the database and log their names
 *      var fetchUsers = read(db, 'users')
 *      // Asynchronous version
 *      fetchUsers(users => {
 *          var names = users.map(user => user.name)
 *          console.log(names)
 *      })
 *      // Synchronous version
 *      var names = fetchUsers(null).map(user => user.name)
 *      console.log(names)
 */
var read = exports.read = (0, _ramda.curry)(function (db, name, handle) {
    var filename = _path2.default.join(db.folder, name + '.json');
    if (handle != null) {
        (0, _jsonfile.readFile)(filename, function (err, data) {
            if (err) throw err;
            handle(data);
        });
    } else return (0, _jsonfile.readFileSync)(filename);
});