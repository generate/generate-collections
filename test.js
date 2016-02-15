'use strict';

require('mocha');
var assert = require('assert');
var generate = require('generate');
var collections = require('./');
var app;

describe('generate-collections', function() {
  beforeEach(function() {
    app = generate();
  });

  describe('task', function() {
    it('should work as a task', function(cb) {
      app.task('foo', collections.task(app));
      app.build('foo', function(err) {
        if (err) return cb(err);
        cb();
      });
    });
  });

  describe('collections', function() {
    it('should add collections to the instance', function(cb) {
      collections.invoke(app);

      assert.equal(typeof app.docs, 'function');
      assert.equal(typeof app.includes, 'function');
      assert.equal(typeof app.layouts, 'function');
      cb();
    });

    it('should create custom collections passed on invoke options', function(cb) {
      app.generator('foo', function(foo) {
        collections.invoke(this, {
          create: {
            snippet: { viewType: 'partial' },
            section: { viewType: 'partial' },
            block: { viewType: 'layout' }
          }
        });
        var count = 0;

        foo.task('bar', function(next) {
          assert(foo.views.hasOwnProperty('snippets'));
          assert(foo.views.hasOwnProperty('sections'));
          assert(foo.views.hasOwnProperty('blocks'));
          count++;
          next();
        });

        foo.task('default', ['bar']);
        foo.build('default', function(err) {
          if (err) return cb(err);
          assert.equal(count, 1);
          cb();
        });
      });
    });
  });

  describe('generator', function() {
    it('should extend a generator', function(cb) {
      app.generator('foo', function(foo) {
        foo.extendWith(collections);
        var count = 0;

        foo.task('bar', function(next) {
          assert(foo.views.hasOwnProperty('docs'));
          assert(foo.views.hasOwnProperty('layouts'));
          assert(foo.views.hasOwnProperty('includes'));
          count++;
          next();
        });

        foo.task('default', ['collections', 'bar']);
        foo.build('default', function(err) {
          if (err) return cb(err);
          assert.equal(count, 1);
          cb();
        });
      });
    });

    it('should set layout to `empty` on renderable templates with no layout', function(cb) {
      app.generator('foo', function(app) {
        app.extendWith(collections);
        var count = 0;

        app.task('templates', function(cb) {
          app.doc('aaa', {content: 'this is content'});
          app.doc('bbb', {content: 'this is content', layout: 'default'});
          app.doc('ccc', {content: 'this is content', layout: null});
          count++;
          cb();
        });

        app.task('render', function(cb) {

          count++;
          cb();
        });

        app.task('default', ['collections', 'templates']);
        app.build('default', function(err) {
          if (err) return cb(err);
          assert.equal(count, 1);
          assert(app.views.docs)
          assert(app.views.docs.aaa);
          // assert.equal(app.views.docs.aaa.layout, 'empty');
          // assert.equal(app.views.docs.bbb.layout, 'default');
          // assert.equal(app.views.docs.ccc.layout, 'empty');
          cb();
        });
      });
    });
  });
});
