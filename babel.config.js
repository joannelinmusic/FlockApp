const { withNextEnv } = require('@next/env');

module.exports = function(api) {
  api.cache(true);
  
  return withNextEnv({
    presets: ['babel-preset-expo'],
  });
};
