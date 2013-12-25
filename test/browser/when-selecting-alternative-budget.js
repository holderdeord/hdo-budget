describe("When selecting alternative budget", function () {
  var scope;
  var alternative;
  var original;

  beforeEach(module('budgetApp', 'mocks'));

  beforeEach(inject(function ($rootScope, $controller, d3, mockD3Csv) {
    scope = $rootScope.$new();
    original = {name: "default budget", year: 2014, "default": true, structure: "structure.csv", posts: ["post.csv"]};
    alternative = {name: "alternative", year: 2014, "default": false, structure: "structure.csv", posts: ["post2.csv"]};
    spyOn(d3, "json").andCallFake(function (url, cb) {
      cb([original, alternative]);
    });
    d3.csv = mockD3Csv({
      "structure.csv": [{ frameNo: 1, frameName: "test", chapterNo: 11, chapterName: "test" }],
      "post.csv": [{ chapterNo: 11, postNo: 3, text: "test", amount: 100000}],
      "post2.csv": [{ chapterNo: 11, postNo: 3, text: "test", amount: 150000}]
    });
    $controller('BudgetController', { $scope: scope, d3: d3 });
    $rootScope.$apply();
    scope.selectAlternative(alternative);
  }));

  it("should select alternative budget", function () {
    expect(scope.selectedAlternative).toBe(alternative);
  });

  it("should load alternative budget", function () {
    scope.$apply();
    expect(scope.budget.alternative.name).toEqual("alternative");
  });

  it("should also populate frames", function () {
    scope.$apply();
    expect(scope.budget.alternative.cost).toEqual(150000);
  });

  it("should not stack multiple selections of alternative budget", function () {
    scope.$apply();
    scope.selectAlternative(alternative);
    scope.$apply();
    expect(scope.budget.alternative.cost).toEqual(150000);
  });
});