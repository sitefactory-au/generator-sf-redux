'use strict';
let generator = require('yeoman-generator');
let paths = require('../../utils/paths');


module.exports = generator.Base.extend({

  constructor: function () {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function () {
    const baseName = paths.getBaseName(this.name);
    const depth = this.name.split('/').length - 1;
    const prefix = '../'.repeat(depth);

    var filesToCopy = ['index.js', 'api.js', 'mock.js'];

    var args = {
      name: baseName,
      prefix: prefix
    };

    // Copy the template files
    this.log('Scaffolding ' + this.name + ' api');

    filesToCopy.forEach((file) => {
      var destPath = 'src/services/' + baseName + '/' + file;
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(destPath),
        args
      );
    })

    this.composeWith('sf-redux:ajax', {
      args: ['ajax']
    });
  }
});
