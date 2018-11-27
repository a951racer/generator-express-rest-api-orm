# generator-express-rest-api-orm

> A custom Yeoman (http://yeoman.io/) generator that creates a REST API.  The resulting API is constructed of Node.js, Express, TypeORM and MySQL

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

Also, with additional custom generators, a single input file can be used to generate a backend API as well as one or more client UIs.  This will allow basic, yet fully functional applications to be spun up with very little effort.

```bash
yo express-rest-api-orm --config=myconfig.json
```

Currently the generator is set-up to handle a MySQL back-end, however, it can easily be extended to handle any datastore that TypeORM can handle (MongoDB, MySQL, SQL Server, etc.).  These back-ends will be added in future versions of the generator.

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
