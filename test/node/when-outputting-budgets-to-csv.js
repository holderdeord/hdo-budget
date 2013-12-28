var budgetFactory = require("../../src/budgetFactory");
var Q = require("q");
var buster = require("buster");
var assert = buster.assert;

buster.testCase("Wehn outputting budgets to csv", {
  setUp: function (done) {
    this.budget = budgetFactory.$new(Q, { name: "test" });
    var promises = [];
    promises.push(this.budget.addFrame(1, "test"));
    promises.push(this.budget.addChapter(1, 11, "test"));
    promises.push(this.budget.addChapter(1, 3001, "test"));
    promises.push(this.budget.addPost(11, 1, "test", 100));
    Q.all(promises).then(done);
  }
});