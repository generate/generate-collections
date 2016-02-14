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

  describe('load', function() {
    describe('collections', function() {
      it('should add collections to the instance', function(cb) {
        collections.invoke(app);

        assert.equal(typeof app.docs, 'function');
        assert.equal(typeof app.includes, 'function');
        assert.equal(typeof app.layouts, 'function');
        cb();
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
  });

  describe('function', function() {
    it('', function(cb) {

      cb();
    });
  });
});
