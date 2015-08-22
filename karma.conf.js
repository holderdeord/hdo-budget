module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      // "src/**/*.js",
      "test/**/*.js"
    ],
    preprocessors: {
      // "src/**/*.js": ["babel"],
      "test/**/*.js": ["babel"]
    },
    "babelPreprocessor": {
      // options go here
    },
    browsers: ['PhantomJS'],
    reporters: ['progress'],
  });
};