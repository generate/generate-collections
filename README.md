# generate-collections [![NPM version](https://img.shields.io/npm/v/generate-collections.svg)](https://www.npmjs.com/package/generate-collections) [![Build Status](https://img.shields.io/travis/jonschlinkert/generate-collections.svg)](https://travis-ci.org/jonschlinkert/generate-collections)

> Use this generator to add some common default settings to your 'generate', verb, and assemble generators.

You might also be interested in [generate](https://github.com/generate/generate).

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i generate-collections --save
```

## Usage

If you're not already familiar with [generate][], you might find generate's [getting started guide](https://github.com/generate/generate/blob/master/docs/getting-started.md) useful.

**Extend your generator**

Extend your own generator with all of the settings in this generator:

```js
app.extendWith('generate-collections');
```

## API

If a collection does already exist on the instance, its options will
be updated with any options defined on your application instance,
or options passed directly to the [load](#load) function.
In your generator:

**Params**

* `app` **{Object}**: instance of generator, verb or assemble.

**Example**

```js
app.extendWith(require('generate-collections'));
```

### [task](index.js#L40)

Exposes the `collections` task function directly, so you can register the task with any name that makes sense for your project.

**Params**

* `app` **{Object}**
* `returns` **{Function}**: Returns the task callback

**Example**

```js
var collections = require('generate-collections');
app.task('foo', collections.task(app));
```

### [.invoke](index.js#L63)

Exposes the generator on the `invoke` property, allowing you to load the collections wherever and whenever it makes sense.

**Params**

* `app` **{Object}**
* `options` **{Object}**

**Example**

```js
var collections = require('generate-collections');

// in your generator
collections.invoke(app, [options]);
```

## Compatibility

This generator works with:

* [generate][]
* [verb](https://github.com/verbose/verb)
* update (soon)
* assemble (soon)

## Related projects

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Generate docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm i -d && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/generate-collections/issues/new).

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the [MIT license](https://github.com/jonschlinkert/generate-collections/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on February 13, 2016._