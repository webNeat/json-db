'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readSync = undefined;

var _ramda = require('ramda');

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readSync = exports.readSync = (0, _ramda.curry)(function (dataFolder, collection) {
    return _jsonfile2.default.readFileSync(_path2.default.join(dataFolder, collection + '.json'));
});