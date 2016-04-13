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
let collectionFile = path.join(db.folder, 'users.json')
let collection

describe('read', () => {

    before(() => {
        collection = [
            {name: 'Foo', age: 32},
            {name: 'Bar', age: 23},
            {name: 'Baz', age: 21}
        ]
        writeFileSync(collectionFile, collection)
    })

    it('is curried', () => {
        let fetch = read(db)
        let fetchUsers = fetch('users')
        fetchUsers.should.be.Function()
        fetchUsers.should.have.length(1)
    })

    it('reads a collection and passes it to the handle function', done => {
        read(db, 'users', (users) => {
            users.should.deepEqual(collection)
            done()
        })
    })

    it('reads and returns the collection when handle is null', () => {
        read(db, 'users', null).should.deepEqual(collection)
        read(db, 'users')(null).should.deepEqual(collection)
    })
})

describe('write', () => {

    before(() => {
        collection = [
            {name: 'Foo', age: 32},
            {name: 'Bar', age: 14},
            {name: 'Baz', age: 25}
        ]
    })

    beforeEach(() => {
        // clear the collection
        writeFileSync(collectionFile, [])
    })

    it('is curried', () => {
        let save = write(db)
        let saveUsers = save('users')
        let clearUsers = saveUsers([])
        clearUsers.should.be.Function()
        clearUsers.should.have.length(1)
    })

    it('writes a collection asynchronousely then run the callback', done => {
        write(db, 'users', collection, () => {
            readFileSync(collectionFile).should.deepEqual(collection)
            done()
        })
    })

    it('writes the collection synchronousely when the callback is null', () => {
        write(db, 'users', collection)
        readFileSync(collectionFile).should.deepEqual(collection)
    })
})
