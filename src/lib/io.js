import path from 'path'
import {curry} from 'ramda'
import {
    readFile, 
    writeFile,
    readFileSync, 
    writeFileSync } from 'jsonfile'

/**
 * Reads a collection asynchronousely from the database and pass the result 
 * to the `handle` callback. If `handle == null`, it will read the collection
 * Synchronousely from the database and return the result.
 *
 * @function
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
export const read = curry((db, name, handle) => {
    let filename = path.join(db.folder, name + '.json')
    if (handle != null) {
        readFile(filename, (err, data) => {
            if(err) throw err
            handle(data)
        })
    } else
        return readFileSync(filename)
})
