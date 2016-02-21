# generate-collections [![NPM version](https://img.shields.io/npm/v/generate-collections.svg)](https://www.npmjs.com/package/generate-collections) [![Build Status](https://img.shields.io/travis/jonschlinkert/generate-collections.svg)](https://travis-ci.org/jonschlinkert/generate-collections)

> Add the docs, includes, badges, and layouts collections, along with a few generic defaults to your generator.

You might also be interested in [generate-defaults](https://github.com/jonschlinkert/generate-defaults).

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i generate-collections --save
```

## Quickstart

**Getting started**

If you're not already familiar with [generate](https://github.com/generate/generate), you might find generate's [getting started guide](https://github.com/generate/generate/blob/master/docs/getting-started.md) useful before continuining.

<br>

***

## Usage

With both `generate-collections` and `generate` installed globally, you should now be able to run this generator's default task with the following command:

```sh
$ gen collections
```

If the generator and its task completed successfuly, you should see something like this in the terminal:

```sh
[00:44:21] starting collections generator
[00:44:21] starting collections:default task
[00:44:22] finished collections:default task 63ms
[00:44:22] finished collections generator 68ms
[00:44:22] finished ✔
```

## Extend your generator

The [usage instructions](#usage) explain how to use this as a standalone generator, but you can also use `generate-collections` to extend your own generator, and cut down on boilerplate code needed to get up and running.

To extend your generator, add the  `.extendWith()` line inside your generator:

```js
var collections = require('generate-collections');

module.exports = function(app) {
  collections.invoke(app[, options]);

  // do generator stuff
};
```

That's it! you should now be able to use any features from `generate-collections` as if they were created in your own generator.

**Override settings**

You can override any feature or setting from `generate-collections` by defining new values. E.g. we aren't doing any magic, the `.invoke` method just calls this generator in the context of your generator's instance.

## Advanced usage

**Lazily-extend your generator**

Run the `collections` task to lazily add the features and settings from `generate-collections`.

This approach offers the advantage of choosing when and where to invoke `generate-collections` inside your own generator.

```js
module.exports = function(app) {
  app.extendWith(require('generate-collections'));

  app.task('foo', function(cb) {
    // do task stuff
    cb();
  });

  app.task('default', ['collections', 'foo']);
};
```

**Note that** _before running task `foo`, you MUST RUN the `collections` task_ to get the features from `generate-collections` loaded onto your generator's instance.

## API

## Compatibility

This generator works with:

* [generate](https://github.com/generate/generate)
* [verb](https://github.com/verbose/verb)
* update (soon)
* assemble (soon)

## Related projects

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/generate-collections/issues/new).

## Building docs

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

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the [MIT license](https://github.com/jonschlinkert/generate-collections/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on February 21, 2016._