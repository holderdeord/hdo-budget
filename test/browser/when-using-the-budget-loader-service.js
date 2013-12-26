describe("When using the budget loader service", function () {
  var bl;
  var b = {
    "name": "test budget",
    "structure": "frames",
    "posts": ["post", "post2"]
  };
  var b2 = {
    "name": "alternative budget",
    "structure": "frames",
    "posts": ["post3"]
  };

  beforeEach(module('budgetApp'));
  beforeEach(module('mocks'));
  beforeEach(inject(function (budget, budgetLoader, d3, mockD3Csv) {
    bl = budgetLoader;
    d3.csv = mockD3Csv({
      "frames": [ { frameNo: 1, frameName: "test", chapterNo: 11, chapterName: "test" } ],
      "post": [
        { chapterNo: 11, postNo: 1, text: "test", amount: 100000},
        { chapterNo: 11, postNo: 11, text: "test2", amount: 20000}
      ],
      "post2": [ { chapterNo: 11, postNo: 3, text: "test", amount: 100000} ],
      "post3": [ { chapterNo: 11, postNo: 3, text: "test", amount: 20000} ]
    });
  }));

  it("should return a promise when calling .structure", inject(function ($q) {
    var structure = bl.structure($q, "frames");
    expect(structure.then).toEqual(jasmine.any(Function));
  }));

  it("should resolve .structure with rows", inject(function ($rootScope, $q) {
    bl.structure($q, "frames").then(function (rows) {
      expect(rows.length).toBe(1);
    });
    $rootScope.$apply();
  }));

// Don't know how to make this test work
//  it("should cache .structure", inject(function ($rootScope, d3, $q) {
//    bl.structure($q, "frames");
//    bl.structure($q, "frames");
//    $rootScope.$apply();
//    expect(d3.csv.calls.length).toBe(1);
//  }));

  it("should return a promise when calling .posts", inject(function ($q) {
    var posts = bl.posts($q, "post");
    expect(posts.then).toEqual(jasmine.any(Function));
  }));

  it("should resolve .posts with rows", inject(function ($rootScope, $q) {
    bl.posts($q, "post").then(function (rows) {
      expect(rows.length).toBe(2);
    });
    $rootScope.$apply();
  }));

  it("should return a promise when calling .$new", inject(function ($q) {
    var budget = bl.$new($q, b);
    expect(budget.then).toEqual(jasmine.any(Function));
  }));

  it("should resolve .$new with a new budget", inject(function ($rootScope, $q) {
    var structure = bl.structure($q, "frames");
    bl.$new($q, b).then(function (budget) {
      expect(budget.meta.name).toEqual("test budget");
      expect(budget.frames.length).toBe(1);
      expect(budget.chapters.length).toBe(1);
      expect(budget.posts.length).toBe(3);
    });
    $rootScope.$apply();
  }));

// Don't know how to make this test work
//  it("should cache budgets", inject(function ($rootScope, d3, $q) {
//    bl.$new($q, b);
//    $rootScope.$apply();
//    bl.$new($q, b);
//    $rootScope.$apply();
//    expect(d3.csv.calls.length).toBe(3);
//  }));

  describe("Populating a budget with its alternative", function () {
    var budget;

    beforeEach(inject(function ($rootScope, $q) {
      bl.$new($q, b).then(function (newBudget) {
        budget = newBudget;
      });
      $rootScope.$apply();
    }));

    it("Should return a promise", inject(function ($rootScope, $q) {
      var promise = bl.alternative($q, budget, b2);
      $rootScope.$apply();
      expect(promise.then).toEqual(jasmine.any(Function));
    }));

    it("When resolved, should have set name on alternative", inject(function ($rootScope, $q) {
      bl.alternative($q, budget, b2).then(function (populatedBudget) {
        expect(populatedBudget.alternative.name).toEqual("alternative budget");
      });
      $rootScope.$apply();
    }));
  });
});