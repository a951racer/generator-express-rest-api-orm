# generator-express-rest-api-orm [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Yeoman generator that creates an Express REST API using an ORM (TypeORM for now)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-express-rest-api-orm using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-express-rest-api-orm
```

Then generate your new project:

```bash
yo express-rest-api-orm
```

This custom Yeoman generator has been modified to accept a JSON file as input rather than interrogating the user with 1,000 questions.  This makes it much easier to turn-and-burn when tweaking your generator.  It also simplifies the process of creating multiple apps - you can simply copy-paste the configuration file from an existing app and edit the new file for the new app.  Tons easier than typing in redundant data during the typical Yeoman Q&A phase.



## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Jon M Hobbs](www.jonmhobbs.com)


[npm-image]: https://badge.fury.io/js/generator-express-rest-api-orm.svg
[npm-url]: https://npmjs.org/package/generator-express-rest-api-orm
[travis-image]: https://travis-ci.org/a951racer/generator-express-rest-api-orm.svg?branch=master
[travis-url]: https://travis-ci.org/a951racer/generator-express-rest-api-orm
[daviddm-image]: https://david-dm.org/a951racer/generator-express-rest-api-orm.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/a951racer/generator-express-rest-api-orm
