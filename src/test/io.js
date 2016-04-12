import path from 'path'
import should from 'should'
import {
    readFile, 
    writeFile,
    readFileSync, 
    writeFileSync } from 'jsonfile'

import {read} from '../lib/io.js'

// mocking the database
let db = { 
    folder: path.join(__dirname, 'data')
}

describe('read', () => {

    let usersCollection
    before(() => {
        usersCollection = [
            {name: 'Foo', age: 32},
            {name: 'Bar', age: 23},
            {name: 'Baz', age: 21}
        ]
        writeFileSync(path.join(db.folder, 'users.json'), usersCollection)
    })

    it('is curried', () => {
        let fetch = read(db)
        let fetchUsers = fetch('users')
        fetchUsers.should.be.Function()
        fetchUsers.should.have.length(1)
    })

    it('reads a collection and passes it to the handle function', done => {
        read(db, 'users', (users) => {
            users.should.deepEqual(usersCollection)
            done()
        })
    })

    it('reads and returns the collection when handle is null', () => {
        read(db, 'users', null).should.deepEqual(usersCollection)
        read(db, 'users')(null).should.deepEqual(usersCollection)
    })
})
