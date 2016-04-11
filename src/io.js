import {curry} from 'ramda'
import jsonfile from 'jsonfile'
import path from 'path'

export const readSync = curry((dataFolder, collection) => {
    return jsonfile.readFileSync(path.join(dataFolder, collection + '.json'))
})
