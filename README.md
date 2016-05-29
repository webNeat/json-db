# This is still under development
# JSON DB

[![Build Status](https://travis-ci.org/webNeat/json-db.svg?branch=master)](https://travis-ci.org/webNeat/json-db)
[![API Doc](https://doclets.io/webNeat/json-db/master.svg)](https://doclets.io/webNeat/json-db/master)

This is a small [Node](https://nodejs.org) module to provide an easy database api which uses [JSON](http://json.org) files to store data.

## Overview of the usage (May change within development)

```javascript
import {db, schema, type, constraint, relation, query, model} from 'json-db'
import {pipe} from 'ramda'

// Create a database
let store = db.create()

// Define custom constraints
const between = (min, max) => constraint.merge(constraint.min(min), constraint.max(max))

// Define custom types
const userType = type.enum(['simple','moderator','admin'])

// Create a schema
let userSchema = schema.create('user', {
    name: type.string(constraint.required(), constraint.unique(), constraint.minLength(5)),
    age:  type.integer(between(10, 150)),
    type: userType(constraint.default('simple')),
    registered: type.date(constraint.required()),
    friends: relation.hasMany('user')
})

// Adding schema to database
const errorHandler = error => {
    console.error(error.text)
}
// Applying changes asynchroniousely
db.apply(errorHandler, store, newStore => {
        store = newStore
}, userSchema)
// Applying changes synchroniousely
let newStore = db.apply(errorHandler, store, null, userSchema)
if (newStore !== null)
    store = newStore

// Getting schema from a database
userSchema = db.getSchema(store, 'user')

// Modifying a schema
store = pipe(
    schema.update({
        age: type.integer(between(10, 200)), // modify
        email: type.string(constraint.match('email-regex')), // add
        registered: null // remove
    }),
    schema.rename('member'), // renaming
    db.apply(errorHandler, store, null)
)(userSchema)

// Removing a schema
store = pipe(
    schema.remove,
    db.apply(errorHandler, store, null)
)(userSchema)

// Saving the database to filesystem
// asynchroniousely
db.save(errorHandler, 'path/to/database/folder', () => {
    // Succesfully done !
}, store)
// synchroniousely
db.save(errorHandler, 'path/to/database/folder', null, store)

// Loading database from filesystem
// asynchroniousely
db.load(errorHandler, 'path/to/database/folder', (loadedStore) => {
    store = loadedStore
})
// synchroniousely
store = db.load(errorHandler, 'path/to/database/folder', null)

// Removing a database : just remove its folder from the filesystem !

// Making and executing queries
// Making queries
const kids = query.find(errorHandler, store, 'user', [
    query.where(user => user.age < 16),
    query.with('friends', [query.limit(5)])
])

const theUser = query.findOne(errorHandler, store, 'user', 5)

// Executing queries
// asynchroniousely
kids(result => {
    // ...
})
theUser(user => {
    // ...
})
// synchroniousely
let result = kids(null)
let user = theUser(null)

// Saving models
const saveUser = model.save(errorHandler, store, 'user')
user.name = 'Foo'
saveUser(user, (savedUser) => {
    //...
})
savedUser = saveUser(user)

// Removing models
const removeUser = model.remove(errorHandler, store, 'user')
removeUser(user, () => {
    // ...
})
removeUser(user, null)
```
