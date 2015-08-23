module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      { pattern: 'test/test-context.js', watched: false }
    ],
    preprocessors: {
      "test/test-context.js": ["webpack"]
    },
    webpack: {
      module: {
        loaders: [
          { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    },
    browsers: ['Chrome'],
    reporters: ['dots'],
  });
};