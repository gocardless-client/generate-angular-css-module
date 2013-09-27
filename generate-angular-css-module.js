'use strict';

var util = require('util');

var CSS_INJECTOR = 'var css = \'%s\';\n' +
  'var head  = document.head || document.getElementsByTagName(\'head\')[0];\n' +
  'var style = document.createElement(\'style\');\n' +
  'style.type = \'text/css\';\n' +
  'if (style.styleSheet) { style.styleSheet.cssText = css; }\n' +
  'else { style.appendChild(document.createTextNode(css)); }\n' +
  'head.appendChild(style);\n';

var TEMPLATE = 'angular.module(\'%s\', []).run([function() {\n' +
    CSS_INJECTOR +
  '}]);\n';

/**
 * Escape string
 * @param  {String} content
 * @return {String}
 */
var escapeContent = function(content) {
  return content
    .replace(/\\/g, '\\\\')
    .replace(/'/g, '\\\'')
    .replace(/\r?\n/g, '\\n\' +\n    \'');
};

/**
 * Generate angular css module from string
 * @param  {String} options
 * @return {String}
 */
function generateAngularCssModule(options) {
  return(util.format(TEMPLATE,
    options.moduleName,
    escapeContent(options.content)));
}

module.exports = generateAngularCssModule;
