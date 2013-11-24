describe("When loading budget(s) into the budget controller", function () {
	var scope;
	var defaultBudget;

	beforeEach(module('budgetApp'));
	beforeEach(module('mocks'));

	beforeEach(inject(function ($rootScope, $controller, d3, budget, budgetLoader) {
		scope = $rootScope.$new();
		spyOn(d3, "json").andCallFake(function (url, cb) {
			cb([
				{name: "test", year: 2013, "default": true, structure: "structure.csv", files: ["post.csv"]},
				{name: "default budget", year: 2014, "default": true, structure: "structure.csv", files: ["post.csv"]},
				{name: "alternative", year: 2014, "default": false, structure: "structure.csv", files: ["post.csv"]}
			]);
		});
		spyOn(budgetLoader, "$new").andCallFake(function () {
			return { then: function (cb) { cb(budget.$new("default budget")); }};
		});
		$controller('BudgetController', { $scope: scope, budgetLoader: budgetLoader, d3: d3 });
		$rootScope.$apply();
	}));

	it("should load a list of budgets", inject(function (d3) {
		expect(d3.json).toHaveBeenCalledWith("/data/budgets.json", jasmine.any(Function));
		expect(scope.budgets.length).toBe(3);
	}));

	it("should load default budget", function () {
		expect(scope.budget.name).toEqual("default budget");
	})
});