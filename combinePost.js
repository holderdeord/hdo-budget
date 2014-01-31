#!/usr/bin/env node

var program = require('commander');
var Q = require("q");
var fs = require("fs");
var d3 = require("d3");
var budgetFactory = require("./src/budgetFactory");
var util = require("util");

program
  .option('-m, --multiply [value]', 'Number to multiply with (integer)')
  .option('-o, --output [value]', 'Name of file to output csv to; if none given will output to console')
  .option('-f, --flip [type]', 'Type of posts to flip (revenue|cost)')
  .parse(process.argv);

var budget = budgetFactory.$new(Q);
var multiply = program.multiply || 1;
var flipRevenue = program.flip && program.flip == 'revenue' ? -1 : 1;
var flipCost = program.flip && program.flip == 'cost' ? -1 : 1;
var isRevenue = function (chapterNo) {
  return chapterNo > 3000;
}
var promises = program.args.map(function (path) {
  var deferred = Q.defer();
  var amount = 0;
  var flip = 1;
  fs.readFile(path, 'utf-8', function (err, data) {
    var d = d3.csv.parse(data).forEach(function (p) {
      amount = p.amount.replace(/(-−)?\s+/g, "");
      multiply *= (amount[0] == '−' || amount[0] == '-') ? -1 : 1;
      flip = isRevenue(p.chapterNo) ? flipRevenue : flipCost;
      amount = (amount[0] == '−' || amount[0] == '-') ? amount.substr(1) : amount;
      amount = parseInt(amount) * multiply * flip;
      budget.addPost(p.chapterNo, p.postNo, p.text, amount);
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