'use strict';

var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('falsey');
require('extend-shallow', 'extend');
require('fs-exists-sync', 'exists');
require('is-valid-app', 'isValid');
require('isobject', 'isObject');
require('parser-front-matter', 'parser');
require = fn;

utils.renameFile = function(app) {
  return function(file, next) {
    var dest = app.options.dest || app.cwd;
    file.base = dest;
    file.cwd = dest;

    // strip prefixes from dotfile and config templates
    file.basename = file.basename.replace(/^_/, '.');
    file.basename = file.basename.replace(/^\$/, '');

    var data = utils.extend({}, file.data);
    if (utils.isObject(data.rename)) {
      for (var key in data.rename) {
        if (data.rename.hasOwnProperty(key)) {
          file[key] = data.rename[key];
        }
      }
    }
    file.path = path.join(file.base, file.basename);
    next();
  };
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
