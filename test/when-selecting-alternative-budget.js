describe("When selecting alternative budget", function () {
	var scope;
	var alternative;
	var original;

	beforeEach(module('budgetApp'));
	beforeEach(module('mocks'));

	beforeEach(inject(function ($rootScope, $controller, d3, mockD3Csv) {
		scope = $rootScope.$new();
		original = {name: "default budget", year: 2014, "default": true, structure: "structure.csv", posts: ["post.csv"]};
		alternative = {name: "alternative", year: 2014, "default": false, structure: "structure.csv", posts: ["post.csv"]};
		spyOn(d3, "json").andCallFake(function (url, cb) {
			cb([original, alternative]);
		});
		d3.csv = mockD3Csv({
			"structure.csv": [{ frameNo: 1, frameName: "test", chapterNo: 11, chapterName: "test" }],
			"post.csv": [{ chapterNo: 11, postNo: 3, text: "test", amount: "100 000"}]
		});
		$controller('BudgetController', { $scope: scope, d3: d3 });
		$rootScope.$apply();
		scope.selectAlternative(alternative);
	}));

	it("should select alternative budget", function () {
		expect(scope.selectedAlternative).toBe(alternative);
	});

	it("should set alternative budget to null before its loaded", function () {
		expect(scope.alternative).toBeNull();
	});

	it("should load alternative budget", function ($rootScope) {
		scope.$apply();
		expect(scope.alternative.meta.name).toEqual("alternative");
	});
});