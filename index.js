'use strict';

var falsey = require('falsey');
var isObject = require('isobject');

/**
 * Register the plugin.
 *
 * ```js
 * var collections = require('generate-collections');
 *
 * // in your generator
 * this.use(collections());
 * ```
 * @api public
 */

function collections(options) {
  options = options || {};

  return function plugin(app, base) {
    if (!isValidInstance(app)) return;

    this.option(base.options);
    this.option(options);

    /**
     * Middleware for collections created by this generator
     */

    this.preLayout(/\.md/, function(view, next) {
      if (falsey(view.layout) && !view.isType('partial')) {
        // use the empty layout created above, to ensure that all
        // pre-and post-layout middleware are still triggered
        view.layout = app.resolveLayout(view) || 'empty';
        next();
        return;
      }

      if (view.isType('partial')) {
        view.options.layout = null;
        view.data.layout = null;
        view.layout = null;
        if (typeof view.partialLayout === 'string') {
          view.layout = view.partialLayout;
        }
      }
      next();
    });

    // add default view collections
    this.create('files', { viewType: 'renderable'});
    this.create('includes', { viewType: 'partial' });
    this.create('layouts', { viewType: 'layout' });

    // generator-specific collections
    if (this.isGenerator) {
      this.create('templates', { viewType: 'renderable' });
    }

    // "noop" layout
    this.layout('empty', {content: '{% body %}'});

    // create collections defined on the options
    if (isObject(this.options.create)) {
      for (var key in this.options.create) {
        if (!this[key]) {
          this.create(key, this.options.create[key]);
        } else {
          this[key].option(this.options.create[key]);
        }
      }
    }

    // pass the plugin to sub-generators
    return plugin;
  };
}

/**
 * Validate instance
 */

function isValidInstance(app) {
  if (!app.isApp) {
    return false;
  }
  if (app.isRegistered('generate-collections')) {
    return false;
  }
  return true;
}

/**
 * Expose `plugin` function so that verb-collections
 * can be run as a global generator
 */

module.exports = collections();

/**
 * Expose `collection` function so that options can be passed
 */

module.exports.create = collections;
