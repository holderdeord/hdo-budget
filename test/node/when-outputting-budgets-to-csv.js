var budgetFactory = require("../../src/budgetFactory");
var Q = require("q");
var buster = require("buster");
var assert = buster.assert;

buster.testCase("Wehn outputting budgets to csv", {
  setUp: function (done) {
    var b = this.budget = budgetFactory.$new(Q, { name: "test" });
    var promises = [];
    promises.push(this.budget.addFrame(1, "test"));
    promises.push(this.budget.addChapter(1, 11, "test"));
    promises.push(this.budget.addPost(11, 3001, "test 2", 1000));
    this.budget.addPost(11, 1, "test", 100).then(function () {
      promises.push(b.addPost(11, 1, "test", 300));
      Q.all(promises).then(done);
    });
  },

  "Should output a valid csv-string": function () {
    assert.equals(this.budget.output.postsAsCsv(), "chapterNo,postNo,text,amount\n11,3001,test 2,1000\n11,1,test,400");
  }
});