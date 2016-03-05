'use strict';

var falsey = require('falsey');
var utils = require('./utils');

/**
 * When invoked, this creates three view collections, `layouts`, `docs`
 * and `includes`, but only if they're not already on the instance.
 *
 * If a collection does already exist on the instance, its options will
 * be updated with any options defined on your application instance,
 * or options passed directly to the [invoke](#invoke) function.
 *
 * In your generator:
 *
 * ```js
 * app.extendWith(require('generate-collections'));
 * ```
 * @param {Object} `app` instance of generator, verb or assemble.
 * @api public
 */

function generator(app, base) {
  app.task('collections', { silent: true }, task(app, base.options));
  app.task('default', ['collections']);
}

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

function task(app, opts) {
  return function(cb) {
    invoke(app, opts);
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

function invoke(app, options) {
  var opts = utils.extend({}, app.options, options);

  // add middleware
  middleware(app);

  // add default view collections
  app.create('docs', { viewType: ['partial', 'renderable'] });
  app.create('badges', { viewType: 'partial' });
  app.create('includes', { viewType: 'partial' });
  app.create('layouts', { viewType: 'layout' });

  // "noop" layout
  app.layout('empty', {content: '{% body %}'});

  // create collections defined on the options
  if (utils.isObject(opts.create)) {
    for (var key in opts.create) {
      if (!app[key]) {
        app.create(key, opts.create[key]);
      } else {
        app[key].option(opts.create[key]);
      }
    }
  }
}

/**
 * Middleware for collections created by this generator
 */

function middleware(app) {
  // use an empty layout to unsure that all pre-and
  // post-layout middleware are still triggered
  app.preLayout(/\.md/, function(view, next) {
    if (falsey(view.layout) && view.isType('renderable')) {
      view.layout = 'empty';
    }
    if (view.isType('partial') || view.isType('layout') && view.layout === 'default') {
      view.layout = 'empty';
      view.options.layout = null;
    }
    next();
  });
}

/**
 * Expose collections on the `invoke` property and as a task to
 * support lazy invocation
 */

generator.invoke = invoke;
generator.task = task;

/**
 * Expose `generator`
 */

module.exports = generator;
