'use strict';

var utils = require('./utils');

/**
 * When invoked, this creates three view collections, `layouts`, `docs`
 * and `includes`, but only if they're not already on the instance.
 *
 * If a collection does already exist on the instance, its options will
 * be updated with any options defined on your application instance,
 * or options passed directly to the [load](#load) function.
 *
 * In your generator:
 *
 * ```js
 * app.extendWith(require('generate-collections'));
 * ```
 * @param {Object} `app` instance of generator, verb or assemble.
 * @api public
 */

module.exports = function(app) {
  app.task('collections', { silent: true }, task(app));
  app.task('default', ['collections']);
};

/**
 * Exposes the `collections` task function directly, so you can register
 * the task with any name that makes sense for your project.
 *
 * ```js
 * var collections = require('generate-collections');
 * app.task('foo', collections.task(app));
 * ```
 * @param {Object} `app`
 * @return {Function} Returns the task callback
 * @api public
 */

function task(app) {
  return function(cb) {
    collections(app);
    cb();
  };
}

/**
 * Exposes the generator on the `invoke` property, allowing you to load
 * the collections wherever and whenever it makes sense.
 *
 * ```js
 * var collections = require('generate-collections');
 *
 * // in your generator
 * collections.invoke(app, [options]);
 * ```
 * @name .invoke
 * @param {Object} `app`
 * @param {Object} `options`
 * @api public
 */

function collections(app, options) {
  var opts = utils.extend({}, app.options, options);

  app.create('docs', { viewType: 'partial' });
  app.create('badges', { viewType: 'partial' });
  app.create('includes', { viewType: 'partial' });
  app.create('layouts', { viewType: 'layout' });

  // "noop" layout
  app.layout('empty', {content: '{% body %}'});

  // create collections defined on the options
  if (utils.isObject(opts.create)) {
    for (var key in opts.create) {
      if (opts.create.hasOwnProperty(key)) {
        app.create(key, opts.create[key]);
      }
    }
  }
};

/**
 * Expose collections on the `load` property and as a task.
 */

module.exports.invoke = collections;
module.exports.task = task;
