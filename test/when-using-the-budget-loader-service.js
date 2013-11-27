describe("When using the budget loader service", function () {
  var bl;
  var b = {
    "name": "test budget",
    "structure": "frames",
    "posts": ["post", "post2"]
  };

  beforeEach(module('budgetApp'));
  beforeEach(module('mocks'));
  beforeEach(inject(function (budget, budgetLoader, d3, mockD3Csv) {
    bl = budgetLoader;
    d3.csv = mockD3Csv({
      "frames": [ { frameNo: 1, frameName: "test", chapterNo: 11, chapterName: "test" } ],
      "post": [
        { chapterNo: 11, postNo: 1, text: "test", amount: "100 000"},
        { chapterNo: 11, postNo: 11, text: "test2", amount: "20 000"}
      ],
      "post2": [ { chapterNo: 11, postNo: 3, text: "test", amount: "100 000"} ]
    });
  }));

  it("should return a promise when calling .structure", function () {
    var structure = bl.structure("frames");
    expect(structure.then).toEqual(jasmine.any(Function));
  });

  it("should resolve .structure with rows", inject(function ($rootScope) {
    bl.structure("frames").then(function (rows) {
      expect(rows.length).toBe(1);
    });
    $rootScope.$apply();
  }));

  it("should cache .structure", inject(function ($rootScope, d3) {
    bl.structure("frames");
    bl.structure("frames");
    $rootScope.$apply();
    expect(d3.csv.calls.length).toBe(1);
  }));

  it("should return a promise when calling .posts", function () {
    var posts = bl.posts("post");
    expect(posts.then).toEqual(jasmine.any(Function));
  });

  it("should resolve .posts with rows", inject(function ($rootScope) {
    bl.posts("post").then(function (rows) {
      expect(rows.length).toBe(2);
    });
    $rootScope.$apply();
  }));

  it("should return a promise when calling .$new", function () {
    var structure = bl.structure("frames");
    var budget = bl.$new(b);
    expect(budget.then).toEqual(jasmine.any(Function));
  });

  it("should resolve .$new with a new budget", inject(function ($rootScope) {
    var structure = bl.structure("frames");
    bl.$new(b).then(function (budget) {
      expect(budget.meta.name).toEqual("test budget");
      expect(budget.frames.length).toBe(1);
      expect(budget.chapters.length).toBe(1);
      expect(budget.posts.length).toBe(3);
    });
    $rootScope.$apply();
  }));

  it("should cache budgets", inject(function ($rootScope, d3) {
    bl.$new(b);
    $rootScope.$apply();
    bl.$new(b);
    $rootScope.$apply();
    expect(d3.csv.calls.length).toBe(3);
  }));
});