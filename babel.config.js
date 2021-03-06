module.exports = function babel(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
      [
        '@babel/plugin-proposal-decorators',
        {
          'legacy': true
        }
      ]]
  };
};
