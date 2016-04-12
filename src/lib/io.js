import {curry} from 'ramda'
import jsonfile from 'jsonfile'
import path from 'path'

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
export const read = curry((db, name, handle) => 
    jsonfile.readFile(path.join(dataFolder, name + '.json'), (err, data) => {
        if(err) throw err
        handle(data)
    })
)
