#!/usr/bin/env node

var program = require('commander');
var Q = require("q");
var fs = require("fs");
var d3 = require("d3");
var budgetFactory = require("./src/budgetFactory");
var util = require("util");

program
  .option('-o, --output [value]', 'Name of file to output csv to; if none given will output to console')
  .parse(process.argv);

var budget = budgetFactory.$new(Q);
var promises = program.args.map(function (path) {
  var deferred = Q.defer();
  fs.readFile(path, 'utf-8', function (err, data) {
    var d = d3.csv.parse(data).forEach(function (p) {
      budget.addPost(p.chapterNo, p.postNo, p.text, parseInt(+p.amount.replace(/\s/g, "")));
    });
    deferred.resolve(d);
  });
  return deferred.promise;
});

Q.all(promises).then(function () {
  var output = budget.output.postsAsCsv();
  if(program.output) {
    fs.writeFile(program.output, output, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(util.format("The csv was saved to %s", program.output));
      }
    });
  } else {
    console.log(output);
  }
});