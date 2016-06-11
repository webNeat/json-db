import path from 'path'
import {curry} from 'ramda'
import {
    readFile, 
    writeFile,
    readFileSync, 
    writeFileSync } from 'jsonfile'

/**
 * [DB](#dl-DB) -> String -> (Collection -> *) | null -> IO
 * 
 * Reads a collection asynchronousely from the database and pass the result 
 * to the `handle` callback. If `handle == null`, it will read the collection
 * synchronousely from the database and return the result.
 * 
 * @function
 * @since v0.1.0
 * @signature DB -> String -> (Collection -> *) | null -> IO
 * @category IO
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
export const read = curry((db, name, handle) => {
    let filename = path.join(db.folder, name + '.json')
    if (handle !== null) {
        readFile(filename, (err, data) => {
            if (err) throw err
            handle(data)
        })
    } else
        return readFileSync(filename)
})

/**
 * Writes a collection asynchronousely to the database then calls the `callback` 
 * If `callback == null`, it will write the collection synchronousely.
 *
 * @function
 * @since v0.1.0
 * @category IO
 * @signature DB -> String -> Collection -> (* -> *) | null -> IO
 * @param {DB} db
 * @param {String} name
 * @param {Array} collection
 * @param {Function} callback
 * @return {IO} The collection will be written to the database
 * @see read
 * @example
 * ```
 * var usersCollection = [
 *     {name: 'Foo', age: 32},
 *     {name: 'Bar', age: 23},
 *     {name: 'Baz', age: 21}
 * ]
 * var writeUsers = write(db, 'users')
 * // Asynchronousely
 * writeUsers(usersCollection, function(){
 *     // users were written ...
 * })
 * // Synchronousely
 * writeUsers(usersCollection, null)
 * ```
 */
export const write = curry((db, name, collection, callback) => {
    let filename = path.join(db.folder, name + '.json')
    if (callback !== null) {
        writeFile(filename, collection, (err, data) => {
            if (err) throw err
            if (callback) callback()
        })
    } else
        return writeFileSync(filename, collection)
})
