'use strict';
const Generator = require('yeoman-generator');
// Const chalk = require('chalk');
// const yosay = require('yosay');
const fs = require('fs');

//---------------------------------------------------------

/*
const prompts = [
  {
    type: 'input',
    name: 'apiName',
    message: 'API Name?'
  },

  {
    type: 'input',
    name: 'repositoryName',
    message: 'Git Repository Name?'
  },

  {
    type: 'list',
    name: 'database',
    message: 'Database?',
    choices: ['MySQL', 'SQL Server', 'MongoDB']
  },

  {
    type: 'input',
    name: 'dbPackageVersion',
    message: 'Database package version?'
  }
];

const mysqlPrompts = [
  {
    type: 'input',
    name: 'mysql_host',
    message: 'MySql Host?'
  },
  {
    type: 'input',
    name: 'mysql_user',
    message: 'MySql User?'
  },
  {
    type: 'input',
    name: 'mysql_password',
    message: 'MySql Password?'
  },
  {
    type: 'input',
    name: 'mysql_db',
    message: 'MySql DB?'
  }
];

const entityPrompts = [
  {
    type: 'input',
    name: 'entityName',
    message: 'Entity Name (Enter to stop)?'
  }
];
*/

// const entities = [];

// ==============================================================

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('config', {
      description: 'Optional json file that provides answers to all the prompts',
      type: String
    });
  }

  /*
  Prompting() {
    if (!this.options.config) {
      return this.prompt(prompts).then(props => {
        this.props = props;
      });
    }
  }
*/
  /*
  getDbConnection() {
    if (!this.options.config) {
      const done = this.async();
      this.log(this.props.database);
      switch (this.props.database) {
        case 'MySQL':
          return this.prompt(mysqlPrompts).then(props => {
            this.props.dbProps = props;
            done();
          });
        default:
          break;
      }
    }
  }
*/
  /*
  getEntities() {
    if (!this.options.config) {
      const done = this.async();
      return this.prompt(entityPrompts).then(props => {
        if (props.entityName === '') {
          this.props.entities = entities;
          this.log(this.props);
          done();
        } else {
          entities.push(props.entityName);
          this.getEntities();
        }
      });
    }
  }
*/
  readConfigFile() {
    if (this.options.config) {
      const done = this.async();
      fs.readFile(this.options.config, 'utf8', (err, data) => {
        if (err) throw err;
        this.props = JSON.parse(data);
        done();
      });
    }
  }

  writing() {
    // Config files
    switch (this.props.database) {
      case 'MySql':
        this.props.dbPackage = 'mysql';
        break;
      case 'SQL Server':
        this.props.dbPackage = 'mssql';
        break;
      case 'MongoDB':
        this.props.dbPackage = 'mongodb';
        break;
      default:
        this.props.dbPackage = 'mysql';
        break;
    }

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.apiName,
        repositoryName: this.props.repositoryName,
        dbPackage: this.props.dbPackage,
        dbPackageVersion: this.props.dbPackageVersion
      }
    );

    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.copyTpl(
      this.templatePath(this.props.dbPackage + '_ormconfig.json'),
      this.destinationPath('ormconfig.json'),
      {
        dbPackage: this.props.dbPackage,
        mysqlHost: this.props.dbProps.mysql_host,
        mysqlUser: this.props.dbProps.mysql_user,
        mysqlPassword: this.props.dbProps.mysql_password,
        mysqlDb: this.props.dbProps.mysql_db
      }
    );

    // Entities
    // index.ts
    var entityName = '';
    var entityRoutesString = '';
    var entityModelString = '';
    var entityRegisterString = '';
    var relationsString = '';
    var relatedEntityName = '';
    var columnString = '';
    var listString = '';
    var importString = '';
    var brackets = '';
    var relatedList = '';
    this.props.entities.forEach(entity => {
      entityName =
        entity.name.charAt(0).toUpperCase() +
        entity.name.substr(1, entity.name.length - 1).toLowerCase();
      entityRoutesString +=
        'import {' + entityName + 'Routes} from "./routes/' + entityName + 'Routes";\n';
      entityModelString +=
        'import {' + entityName + '} from "./entities/' + entityName + '";\n';
      entityRegisterString +=
        '    ' +
        entityName +
        'Routes.forEach(route => {\n' +
        '        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {\n' +
        '            const result = (new (route.controller as any))[route.action](req, res, next);\n' +
        '            if (result instanceof Promise) {\n' +
        '                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);\n' +
        '            } else if (result !== null && result !== undefined) {\n' +
        '                res.json(result);\n' +
        '            }\n' +
        '        });\n' +
        '    });\n\n';

      // Entity
      entity.columns.forEach(column => {
        if (column.virtual) {
          columnString +=
            '    ' +
            column.name +
            ': ' +
            column.type +
            ';\n' +
            '    @AfterLoad()\n' +
            '    set' +
            column.name +
            '() {\n' +
            '        this.' +
            column.name +
            ' = "";\n' +
            '    }\n\n';
        } else {
          columnString +=
            '    @Column()\n    ' + column.name + ': ' + column.type + ';\n\n';
        }
      });
      var entityRelationsString = '';
      entity.relations.forEach(relation => {
        relationsString += '    ';
        relatedEntityName =
          relation.entity.charAt(0).toUpperCase() +
          relation.entity.substr(1, relation.entity.length - 1).toLowerCase();
        switch (relation.type) {
          case 'OM':
            relationsString += '@OneToMany(type => ';
            listString = 'List: ';
            brackets = '[]';
            relatedList = '';
            entityRelationsString += '"' + relatedEntityName.toLowerCase() + 'List", ';
            break;
          case 'MO':
            relationsString += '@ManyToOne(type => ';
            listString = ': ';
            brackets = '';
            relatedList = 'List';
            break;
          case 'MM':
          case 'MMT':
            relationsString += '@ManyToMany(type => ';
            listString = 'List: ';
            brackets = '[]';
            relatedList = 'List';
            entityRelationsString += '"' + relatedEntityName.toLowerCase() + 'List", ';
            break;
          default:
            break;
        }
        relationsString +=
          relatedEntityName +
          ', ' +
          relatedEntityName.toLowerCase() +
          ' => ' +
          relatedEntityName.toLowerCase() +
          '.' +
          entityName.toLowerCase() +
          relatedList;
        if (relation.options) {
          relationsString += ', {\n';
          relation.options.forEach(option => {
            relationsString += '        ' + option + ': true,\n';
          });
          relationsString += '    })\n';
        } else {
          relationsString += ')\n';
        }
        if (relation.type === 'MMT') {
          relationsString += '    @JoinTable()\n';
        }
        relationsString +=
          '    ' +
          relatedEntityName.toLowerCase() +
          listString +
          relatedEntityName +
          brackets +
          ';\n\n';
        importString +=
          'import { ' + relatedEntityName + " } from './" + relatedEntityName + "';\n";
      });
      this.fs.copyTpl(
        this.templatePath('src/entities/Entity.ts'),
        this.destinationPath('src/entities/' + entityName + '.ts'),
        {
          entityName: entityName,
          columns: columnString,
          relations: relationsString,
          imports: importString
        }
      );
      columnString = '';
      relationsString = '';
      importString = '';

      // Controller
      if (entityRelationsString) {
        entityRelationsString =
          ', { relations: [' +
          entityRelationsString.substr(0, entityRelationsString.length) +
          '] }';
      }
      this.fs.copyTpl(
        this.templatePath('src/controllers/EntityController.ts'),
        this.destinationPath('src/controllers/' + entityName + 'Controller.ts'),
        {
          entityImport:
            'import {' + entityName + '} from "../entities/' + entityName + '"',
          entityName: entityName,
          entityNameLower: entityName.toLowerCase(),
          entityRelations: entityRelationsString
        }
      );

      // Route
      this.fs.copyTpl(
        this.templatePath('src/routes/EntityRoutes.ts'),
        this.destinationPath('src/routes/' + entityName + 'Routes.ts'),
        {
          entityName: entityName,
          entityNameLower: entityName.toLowerCase()
        }
      );
    });

    this.fs.copyTpl(
      this.templatePath('src/index.ts'),
      this.destinationPath('src/index.ts'),
      {
        entityRoutes: entityRoutesString,
        entities: entityModelString,
        entityRegister: entityRegisterString,
        apiPort: this.props.apiPort
      }
    );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
