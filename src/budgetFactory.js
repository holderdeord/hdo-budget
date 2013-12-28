var angular = require("angular");

function update (cost, revenue) {
  this.cost += cost;
  this.revenue += revenue;
}
function Budget(meta) {
  angular.extend(this, meta);
  this.cost = 0;
  this.revenue = 0;
  this.alternative = {
    cost: 0,
    revenue: 0
  };
  this.resetAlternative = function () {
    this.alternative.cost = 0;
    this.alternative.revenue = 0;
    this.frames.forEach(function (f) {
      f.resetAlternative();
      f.chapters.forEach(function (c) {
        c.resetAlternative();
      });
    });
  };
  this.setAlternative = function (meta) {
    this.alternative.name = meta.name;
    this.alternative.cost = this.alternative.cost || 0;
    this.alternative.revenue = this.alternative.revenue || 0;
  };
  this.addAlternative = function (alternative) {
    this.alternative.cost += alternative.cost;
    this.alternative.revenue += alternative.revenue;
  };
  this.update = function (cost, revenue) {
    update.call(this, cost, revenue);
  };
}
function FrameFactory ($q, budget) {
  function Frame(frameNo, frameName) {
    this.no = frameNo;
    this.name = frameName;
    this.chapters = [];
    this.cost = 0;
    this.revenue = 0;
    this.alternative = {
      cost: 0,
      revenue: 0
    };
    this.addAlternative = function (alternative) {
      budget.addAlternative(alternative);
      this.alternative.cost += alternative.cost;
      this.alternative.revenue += alternative.revenue;
    };
    this.addChapter = function (chapter) {
      this.chapters.push(chapter);
    };
    this.resetAlternative = function () {
      this.alternative = {
        cost: 0,
        revenue: 0
      };
    };
    this.update = function (cost, revenue) {
      budget.update(cost, revenue);
      update.call(this, cost, revenue);
    };
  }
  var frameIsResolved = {};
  var frameMap = {};
  var frames = [];
  return {
    add: function (frameNo, frameName) {
      if (frameIsResolved[frameNo]) return;
      frameMap[frameNo] = frameMap[frameNo] || $q.defer();
      var frame = new Frame(frameNo, frameName);
      frameMap[frameNo].resolve(frame);
      frames.push(frame);
      frameIsResolved[frameNo] = true;
    },
    frameMap: frameMap,
    frames: frames,
    get: function (frameNo) {
      frameMap[frameNo] = frameMap[frameNo] || $q.defer();
      return frameMap[frameNo].promise;
    }
  }
}
function ChapterFactory($q, frames) {
  function Chapter(frame, chapterNo, chapterName) {
    this.frame = frame;
    this.no = chapterNo;
    this.name = chapterName;
    this.cost = 0;
    this.revenue = 0;
    this.posts = [];
    this.alternative = {
      cost: 0,
      revenue: 0
    };
    this.addPost = function (post) {
      this.posts.push(post);
      this.cost += post.cost;
      this.revenue += post.revenue;
      this.frame.update(post.cost, post.revenue);
    };
    this.addAlternative = function (alternative) {
      this.frame.addAlternative(alternative);
      this.alternative.cost += alternative.cost;
      this.alternative.revenue += alternative.revenue;
    };
    this.resetAlternative = function () {
      this.alternative = {
        cost: 0,
        revenue: 0
      };
    }
  }
  var chapterIsResolved = {};
  var chapterMap = {};
  var chapters =  [];
  return {
    add: function (frameNo, chapterNo, chapterName) {
      if (chapterIsResolved[chapterNo]) {
        return chapterMap[chapterNo].promise
      };
      chapterMap[chapterNo] = chapterMap[chapterNo] || $q.defer();
      frames
        .get(frameNo)
        .then(function (frame) {
          var chapter = new Chapter(frame, chapterNo, chapterName);
          chapterMap[chapterNo].resolve(chapter);
          chapters.push(chapter);
          frame.addChapter(chapter);
        });
      chapterIsResolved[chapterNo] = true;
      return chapterMap[chapterNo].promise;
    },
    chapterMap: chapterMap,
    chapters: chapters,
    get: function (chapterNo) {
      chapterMap[chapterNo] = chapterMap[chapterNo] || $q.defer();
      return chapterMap[chapterNo].promise;
    }
  }
}
function PostFactory($q, chapters) {
  var resolveCost = function (chapterNo, amount) {
    return chapterNo <= 2800 ? amount : 0;
  };
  var resolveRevenue = function (chapterNo, amount) {
    return chapterNo > 3000 ? amount : 0;
  };
  var Post = function (chapter, postNo, text, amount) {
    this.chapter = chapter;
    this.no = postNo;
    this.text = text;
    this.cost = resolveCost(chapter.no, amount);
    this.revenue = resolveRevenue(chapter.no, amount);
    this.alternative = null;
    this.setAlternative = function (alternative) {
      this.alternative = alternative;
      this.chapter.addAlternative(alternative);
    };
  };
  var AlternativePost = function (chapterNo, amount) {
    this.cost = resolveCost(chapterNo, amount);
    this.revenue = resolveRevenue(chapterNo, amount);
  };
  var postIsResolved = {};
  var postMap = {};
  var posts = [];
  var add = function (chapterNo, postNo, text, amount, alternative) {
    var key = chapterNo + '-' + postNo;
    postMap[key] = postMap[key] || $q.defer();
    if (postIsResolved[key]) {
      var post = postIsResolved[key];
      post.cost += resolveCost(chapterNo, amount);
      post.revenue += resolveRevenue(chapterNo, amount);
    } else {
      chapters
        .get(chapterNo)
        .then(function (chapter) {
          var post = new Post(chapter, postNo, text, amount);
          postMap[key].resolve(post);
          posts.push(post);
          chapter.addPost(post);
          if (alternative) {
            post.setAlternative(alternative);
          }
          postIsResolved[key] = post;
        });
    }
    return postMap[key].promise;
  };
  return {
    add: add,
    addAlternative: function (chapterNo, postNo, text, amount) {
      var alternative = new AlternativePost(chapterNo, amount);
      var key = chapterNo + '-' + postNo;
      if (postMap[key]) {
        postMap[key].promise.then(function (post) {
            post.setAlternative(alternative);
            return post.chapter;
        });
        return postMap[key];
      }
      return add(chapterNo, postNo, text, 0, alternative);
    },
    posts: posts
  }
}
module.exports = {
  $new: function ($q, meta) {
    var budget = new Budget(meta);
    var frames = new FrameFactory($q, budget);
    var chapters = new ChapterFactory($q, frames);
    var posts = new PostFactory($q, chapters);
    return {
      addFrame: frames.add,
      addChapter: chapters.add,
      addPost: posts.add,
      addAlternativePost: posts.addAlternative,
      alternative: budget.alternative,
      chapters: chapters.chapters,
      chapterMap: chapters.chapterMap,
      frames: frames.frames,
      meta: budget,
      posts: posts.posts,
      resetAlternative: budget.resetAlternative,
      setAlternative: budget.setAlternative
    }
  }
};