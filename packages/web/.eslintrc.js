const path = require('path');
const eslintConfig = require('@go-barber/eslint-config');

eslintConfig.settings['import/resolver'] = {
  'babel-plugin-root-import': {
    rootPathSuffix: path.join('packages', 'web', 'src'),
  },
};

eslintConfig.rules['import/no-unresolved'] = ['error', { ignore: ['^[~]'] }];
eslintConfig.rules['import/extensions'] = 'off';

module.exports = eslintConfig;
