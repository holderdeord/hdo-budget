var config = module.exports;

config["Combiner tests"] = {
  environment: "node",
  rootPath: "../",
  sources: [
    'combiner.js'
  ],
  tests: [
    "test/combiner/*.js"
  ]
};