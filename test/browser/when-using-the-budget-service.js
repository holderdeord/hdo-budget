describe("When using the budget-service", function () {
  var b;

  beforeEach(module('budgetApp'));
  beforeEach(inject(function (budget, $q) {
    b = budget.$new($q, {name: "test"});
    b.addFrame(1, "test");
    b.addChapter(1, 11, "test");
    b.addChapter(1, 3001, "test");
    b.addPost(11, 1, "test", 100);
  }));

  it("should be able to name budget", function () {
    expect(b.meta.name).toEqual("test");
  });

  it("should be able to see cost and revenue", function () {
    expect(b.meta.cost).toBe(0);
    expect(b.meta.revenue).toBe(0);
  });

  it("should set alternative", function () {
    expect(b.alternative).toEqual(jasmine.any(Object));
  });

  it("should be able to add frame", function () {
    b.addFrame(2, "test");
    expect(b.frames.length).toBe(2);
  });

  it("should be able to add frame", function () {
    b.addFrame(2, "test");
    expect(b.frames.length).toBe(2);
  });

  it("should be able to add chapter", inject(function ($rootScope) {
    b.addChapter(1, 12, "test");
    $rootScope.$apply();
    expect(b.chapters.length).toBe(3);
  }));

  it("should add chapter to frame", inject(function ($rootScope) {
    b.addChapter(1, 12, "test");
    $rootScope.$apply();
    expect(b.frames[0].chapters.length).toBe(3);
  }));

  it("should not add redundant chapters", inject(function ($rootScope) {
    b.addChapter(1, 11, "test");
    $rootScope.$apply();
    expect(b.chapters.length).toBe(2);
  }));

  it("should not add redundant chapters", inject(function ($rootScope) {
    b.addChapter(1, 11, "test");
    $rootScope.$apply();
    expect(b.chapters.length).toBe(2);
  }));

  it("should be able to add post", inject(function ($rootScope) {
    b.addPost(11, 1, "test", 100);
    $rootScope.$apply();
    expect(b.posts.length).toBe(2);
  }));

  it("should add post to chapter", inject(function ($rootScope) {
    b.addPost(11, 1, "test", 100);
    $rootScope.$apply();
    expect(b.chapters[0].posts.length).toBe(2);
  }));

  it("should add amount to post's cost", inject(function ($rootScope) {
    b.addPost(11, 1, "test", 100);
    $rootScope.$apply();
    expect(b.posts[0].revenue).toBe(0);
    expect(b.posts[0].cost).toBe(100);
  }));

  it("should add amount to chapter", inject(function ($rootScope) {
    b.addPost(11, 1, "test", 100);
    $rootScope.$apply();
    expect(b.chapters[0].revenue).toBe(0);
    expect(b.chapters[0].cost).toBe(200);
  }));

  it("should add amount to frame", inject(function ($rootScope) {
    b.addPost(11, 1, "test", 100);
    $rootScope.$apply();
    expect(b.frames[0].revenue).toBe(0);
    expect(b.frames[0].cost).toBe(200);
  }));

  it("should be able to add chapter after posts", inject(function ($rootScope) {
    b.addPost(12, 1, "test post 1", 100);
    b.addPost(12, 2, "test post 2", 100);
    b.addChapter(1, 12, "test chapter");
    $rootScope.$apply();
    expect(b.frames[0].chapters[2].posts.length).toBe(2);
  }));

  it("should be able to add alternative posts", inject(function ($rootScope) {
    $rootScope.$apply();
    b.addAlternativePost(11, 1, "test", 200);
    b.addAlternativePost(3001, 1, "test", 300);
    $rootScope.$apply();
    expect(b.frames[0].chapters[0].posts[0].alternative.cost).toBe(200);
    expect(b.frames[0].chapters[1].posts[0].alternative.revenue).toBe(300);
  }));

  it("should be able to add alternative posts even though the original budget don't have one", inject(function ($rootScope) {
    $rootScope.$apply();
    b.addAlternativePost(11, 3, "test 3", 200);
    $rootScope.$apply();
    expect(b.frames[0].chapters[0].posts[1].no).toBe(3);
    expect(b.frames[0].chapters[0].posts[1].text).toEqual("test 3");
    expect(b.frames[0].chapters[0].posts[1].cost).toBe(0);
    expect(b.frames[0].chapters[0].posts[1].alternative.cost).toBe(200);
  }));

  it("should update chapter", inject(function ($rootScope) {
    $rootScope.$apply();
    b.addAlternativePost(11, 1, "test", 200);
    b.addAlternativePost(3001, 1, "test", 300);
    $rootScope.$apply();
    expect(b.frames[0].chapters[0].alternative.cost).toBe(200);
    expect(b.frames[0].chapters[1].alternative.revenue).toBe(300);
  }));

  it("should update frame", inject(function ($rootScope) {
    $rootScope.$apply();
    b.addAlternativePost(11, 1, "test", 200);
    b.addAlternativePost(3001, 1, "test", 300);
    $rootScope.$apply();
    expect(b.frames[0].alternative.cost).toBe(200);
    expect(b.frames[0].alternative.revenue).toBe(300);
  }));

  it("should update the budget", inject(function ($rootScope) {
    $rootScope.$apply();
    b.addAlternativePost(11, 1, "test", 200);
    b.addAlternativePost(3001, 1, "test", 300);
    $rootScope.$apply();
    expect(b.alternative.cost).toBe(200);
    expect(b.alternative.revenue).toBe(300);
  }));
});