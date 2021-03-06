'use strict';
let generator = require('yeoman-generator');
let utils = require('../../utils/all');
let prompts = require('./prompts');

module.exports = generator.Base.extend({

  constructor: function () {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
    this.argument('hasState', { type: Boolean, required: false });
  },

  prompting: function () {
    if (this.hasState === undefined) {
      let done = this.async();
      this.prompt(prompts, function (props) {
        // Set needed global vars for yo
        this.hasState = props.hasState;
        done();
      }.bind(this));
    }
    else{
      this.hasState = this.hasState === 'true' || this.hasState === true;
    }
  },

  writing: function () {
    const baseName = utils.paths.getBaseName(this.name);
    const rootReducerPath = this.destinationPath('src/reducers/index.js');
    const relativePath = utils.paths.getRelativePath('reducer', 'components/' + this.name, 'js');
    const depth = this.name.split('/').length - 1;
    const prefix = '../'.repeat(depth);

    if (this.hasState) {
      utils.copy.tpl.call(this, 'src/components', baseName);
      // Add the reducer to the root reducer
      utils.attach.toRootReducer(this.fs, rootReducerPath, relativePath, baseName);
    }
    else {
      var args = { name: baseName, prefix: prefix };
      this.fs.copyTpl(
        this.templatePath('ui.js'),
        this.destinationPath(utils.paths.getDestinationPath('index', 'components/' + baseName, 'js')),
        args
      );
      this.fs.copyTpl(
        this.templatePath('styles.js'),
        this.destinationPath(utils.paths.getDestinationPath('styles', 'components/' + baseName, 'js')),
        args
      );
    }
  },

  install: function () {
    this.conflicter.force = true;
    utils.attach.commit();
  }
});
