'use strict';
let generator = require('yeoman-generator');
let utils = require('../../utils/all');


module.exports = generator.Base.extend({

  constructor: function () {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function () {
    const baseName = utils.paths.getBaseName(this.name);

    utils.copy.tpl.call( this, 'src/services', baseName);

    this.composeWith('sf-redux:ajax', {
      args: ['ajax']
    });
  }
});
