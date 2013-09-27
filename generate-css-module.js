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

var SINGLE_MODULE_TPL = '(function(module) {\n' +
    'try {\n' +
    '  module = angular.module(\'%s\');\n' +
    '} catch (e) {\n' +
    '  module = angular.module(\'%s\', []);\n' +
    '}\n' +
    'module.run([function() {\n' +
      CSS_INJECTOR +
    '}]);\n' +
    '})();\n';

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
 * Generate angular templateCache from string
 * @param  {String} options
 * @return {String}
 */
function generateCssModule(options) {
  if (options.moduleName) {
    return(util.format(SINGLE_MODULE_TPL,
      options.moduleName,
      options.moduleName,
      escapeContent(options.content)));
  } else {
    return(util.format(TEMPLATE,
      options.cssPath,
      escapeContent(options.content)));
  }
}

module.exports = generateCssModule;
