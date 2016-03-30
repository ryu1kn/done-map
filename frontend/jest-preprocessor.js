
var babel = require('babel-core');
var es2015Preset = require('babel-preset-es2015');
var jestPreset = require('babel-preset-jest');
var reactPreset = require('babel-preset-react');

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        presets: [jestPreset, reactPreset, es2015Preset],
        retainLines: true
      }).code;
    }
    return src;
  }
};
