var budgetFactory = require("../../src/budgetFactory");
var Q = require("q");
var buster = require("buster");
var assert = buster.assert;

buster.testCase("When using the budget factory", {
  setUp: function (done) {
    var b = this.budget = budgetFactory.$new(Q, { name: "test" });
    var promises = [];
    promises.push(this.budget.addFrame(1, "test"));
    promises.push(this.budget.addChapter(1, 11, "test"));
    promises.push(this.budget.addChapter(1, 3001, "test"));
    promises.push(this.budget.addPost(11, 1, "test", 100));
    Q.all(promises).then(done(function () {
      assert.equals(b.meta.name, "test");
      assert.equals(b.meta.cost, 100);
      assert.equals(b.meta.revenue, 0);
    }));
  },

  "can add frames": function () {
    this.budget.addFrame(2, "test");
    assert.equals(this.budget.frames.length, 2);
  },

  "should be able to add chapter": function (done) {
    var b = this.budget;
    b.addChapter(1, 12, "test").then(done(function () {
      assert.equals(b.chapters.length, 3);
    }));
  },

  "should add chapter to frame": function (done) {
    var b = this.budget;
    b.addChapter(1, 12, "test").then(done(function () {
      assert.equals(b.frames[0].chapters.length, 3);
    }));
  },

  "should not add redundant chapters": function (done) {
    var b = this.budget;
    b.addChapter(1, 11, "test").then(done(function () {
      assert.equals(b.chapters.length, 2);
    }));
  },

  "should be able to add post": function (done) {
    var b = this.budget;
    b.addPost(11, 2, "test", 100).then(done(function () {
      assert.equals(b.posts.length, 2);
    }));
  },

  "should add post to chapter": function (done) {
    var b = this.budget;
    b.addPost(11, 2, "test", 100).then(done(function () {
      assert.equals(b.chapters[0].posts.length, 2);
    }));
  },

  "should be able to accumulate posts": function (done) {
    var b = this.budget;
    b.addPost(11, 1, "test", 100).then(done(function () {
      assert.equals(b.posts.length, 1);
      assert.equals(b.posts[0].cost, 200);
    }));
  },

  "should add amount to post's cost": function (done) {
    var b = this.budget;
    b.addPost(11, 1, "test", 100).then(done(function () {
      assert.equals(b.posts[0].revenue, 0);
      assert.equals(b.posts[0].cost, 200);
    }));
  },

  "should add amount to chapter": function (done) {
    var b = this.budget;
    b.addPost(11, 2, "test", 100).then(done(function () {
      assert.equals(b.chapters[0].revenue, 0);
      assert.equals(b.chapters[0].cost, 200);
    }));
  },

  "should add amount to frame": function (done) {
    var b = this.budget;
    b.addPost(11, 2, "test", 100).then(done(function () {
      assert.equals(b.frames[0].revenue, 0);
      assert.equals(b.frames[0].cost, 200);
    }));
  },

  "should be able to add chapter after posts": function (done) {
    var b = this.budget;
    var promises = [];
    promises.push(b.addPost(12, 1, "test post 1", 100));
    promises.push(b.addPost(12, 2, "test post 2", 100));
    promises.push(b.addChapter(1, 12, "test chapter"));
    Q.all(promises).then(done(function () {
      assert.equals(b.frames[0].chapters[2].posts.length, 2);
    }));
  },

  "should be able to add alternative posts": function (done) {
    var b = this.budget;
    var promises = [];
    promises.push(b.addAlternativePost(11, 1, "test", 200));
    promises.push(b.addAlternativePost(3001, 1, "test", 300));
    Q.all(promises).then(done(function () {
      assert.equals(b.frames[0].chapters[0].posts[0].alternative.cost, 200);
      assert.equals(b.frames[0].chapters[1].posts[0].alternative.revenue, 300);
    }));
  },

  "should be able to add alternative posts even though the original budget don't have one": function (done) {
    var b = this.budget;
    b.addAlternativePost(11, 3, "test 3", 200).then(done(function () {
      assert.equals(b.frames[0].chapters[0].posts[1].no, 3);
      assert.equals(b.frames[0].chapters[0].posts[1].text, "test 3");
      assert.equals(b.frames[0].chapters[0].posts[1].cost, 0);
      assert.equals(b.frames[0].chapters[0].posts[1].alternative.cost, 200);
    }));
  },

  "should update chapter, frame, and budget": function (done) {
    var b = this.budget;
    var promises = [];
    promises.push(b.addAlternativePost(11, 1, "test", 200));
    promises.push(b.addAlternativePost(3001, 1, "test", 300));
    Q.all(promises).then(done(function () {
      assert.equals(b.frames[0].chapters[0].alternative.cost, 200);
      assert.equals(b.frames[0].chapters[1].alternative.revenue, 300);
      assert.equals(b.frames[0].alternative.cost, 200);
      assert.equals(b.frames[0].alternative.revenue, 300);
      assert.equals(b.alternative.cost, 200);
      assert.equals(b.alternative.revenue, 300);
    }));
  },

  "should add posts without chapter available": function (done) {
    var b = this.budget;
    b.addPost(12, 1, "test", 100).then(done(function () {
      assert.equals(b.posts.length, 2)
    }));
  }
});