module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@app': './src/app',
          '@entities': './src/entities',
          '@features': './src/features',
          '@screen': './src/screen',
          '@shared': './src/shared',
          '@widgets': './src/widgets',
        },
      },
    ],
  ],
};
