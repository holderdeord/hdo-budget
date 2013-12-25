var budgetFactory = require("../../src/budgetFactory");
var Q = require("q");
var buster = require("buster");

buster.testCase("When using the budget factory", {
  "can initiate budget": function () {
    var budget = budgetFactory.$new(Q, { name: "test" });
    buster.assert.equals(budget.meta.name, "test");
  }
});