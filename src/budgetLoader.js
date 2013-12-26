var d3 = require("d3");
var budget = require("./budgetFactory");

var cachedStructure = {};
var cachedBudgets = {};
function structure($q, url) {
  var deferred = $q.defer();
  if (cachedStructure[url]) {
    deferred.resolve(cachedStructure[url]);
  } else {
    d3.csv(url, function (d){
      var keys = Object.keys(d);
      return {
        frameNo: d[keys[0]],
        frameName: d[keys[1]],
        chapterNo: d[keys[2]],
        chapterName: d[keys[3]]
      };
    }, function (error, rows) {
      cachedStructure[url] = rows;
      deferred.resolve(rows);
    });
  }
  return deferred.promise;
}
function posts($q, url) {
  var deferred = $q.defer();
  d3.csv(url, function parseKeys(d) {
    var keys = Object.keys(d);
    return {
      chapterNo: d[keys[0]],
      postNo: d[keys[1]],
      text: d[keys[2]],
      amount: parseInt(+d[keys[3]].replace(/\s/g, ""))
    };
  }, function (error, rows) {
    deferred.resolve(rows);
  });
  return deferred.promise;
}
function parsePosts(budget, deferred) {
  return function (rows) {
    rows.forEach(function (r) {
      budget.addPost(r.chapterNo, r.postNo, r.text, r.amount);
    });
    deferred.resolve(budget);
  };
}
function parseAlternatives(budget, deferred) {
  return function (rows) {
    rows.forEach(function (r) {
      budget.addAlternativePost(r.chapterNo, r.postNo, r.text, r.amount);
    });
    deferred.resolve(budget);
  }
}
function parseStructure(budget, deferred) {
  return function (rows) {
    rows.forEach(function (r) {
      budget.addFrame(r.frameNo, r.frameName);
      budget.addChapter(r.frameNo, r.chapterNo, r.chapterName);
    });
    deferred.resolve();
  }
}
function $new($q, meta) {
  var deferred = $q.defer();
  if (cachedBudgets[meta.name]) {
    deferred.resolve(cachedBudgets[meta.name]);
  } else {
    var b = budget.$new($q, meta);
    var promises = meta.posts.map(function (url) {
      var d = $q.defer();
      posts($q, url).then(parsePosts(b, d));
      return d.promise;
    });
    var structureDeferred = $q.defer();
    structure($q, meta.structure).then(parseStructure(b, structureDeferred));
    promises.push(structureDeferred);
    $q.all(promises).then(function () {
      deferred.resolve(b);
      cachedBudgets[meta.name] = b;
    });
  }
  return deferred.promise;
}
function alternative($q, budget, meta) {
  budget.resetAlternative();
  var deferred = $q.defer();
  var promises = meta.posts.map(function (url) {
    var d = $q.defer();
    posts($q, url).then(parseAlternatives(budget, d));
    return d.promise;
  });
  $q.all(promises).then(function () {
    budget.setAlternative(meta);
    deferred.resolve(budget);
  });
  return deferred.promise;
}
module.exports = {
  $new: $new,
  alternative: alternative,
  posts: posts,
  structure: structure
};