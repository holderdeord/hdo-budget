describe("When loading budget(s) into the budget controller", function () {
	var scope;

	beforeEach(module('budgetApp'));

	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller('BudgetController', { $scope: scope });
	}));
});