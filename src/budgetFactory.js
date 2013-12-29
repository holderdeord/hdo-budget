var angular = require("angular");
var util = require("util");

var update = function (cost, revenue) {
  this.cost += cost;
  this.revenue += revenue;
};
var Budget = function (meta) {
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
};
var FrameFactory = function ($q, budget) {
  var Frame = function (frameNo, frameName) {
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
  };
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
};
var ChapterFactory = function ($q, frames) {
  var Chapter = function (frame, chapterNo, chapterName) {
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
  };
  var chapterIsResolved = {};
  var chapterMap = {};
  var chapters =  [];
  return {
    add: function (frameNo, chapterNo, chapterName) {
      if (chapterIsResolved[chapterNo]) {
        return chapterMap[chapterNo].promise
      }
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
};
var PostFactory = function ($q, chapters) {
  var resolveCost = function (chapterNo, amount) {
    return chapterNo <= 2800 ? amount : 0;
  };
  var resolveRevenue = function (chapterNo, amount) {
    return chapterNo > 3000 ? amount : 0;
  };
  var Post = function (chapterNo, postNo, text, amount) {
    this.chapterNo = chapterNo;
    this.chapter = null;
    this.chapterDeferred = $q.defer();
    this.no = postNo;
    this.text = text;
    this.cost = resolveCost(chapterNo, amount);
    this.revenue = resolveRevenue(chapterNo, amount);
    this.alternative = null;
    this.setAlternative = function (alternative) {
      this.alternative = alternative;
      if (this.chapter) {
        this.chapter.addAlternative(alternative);
      } else {
        this.chapterDeferred.promise.then(function (chapter) {
          chapter.addAlternative(alternative);
        });
      }
    };
    this.setChapter = function (chapter) {
      chapter.addPost(this);
      this.chapter = chapter;
      this.chapterDeferred.resolve(chapter);
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
    var post = postIsResolved[key];
    if (post) {
      post.cost += resolveCost(chapterNo, amount);
      post.revenue += resolveRevenue(chapterNo, amount);
    } else {
      post = new Post(chapterNo, postNo, text, amount);
      posts.push(post);
      postIsResolved[key] = post;
      postMap[key].resolve(post);
      if (alternative) {
        post.setAlternative(alternative);
      }
      chapters
        .get(chapterNo)
        .then(function (chapter) {
          post.setChapter(chapter);
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
};
var OutputFactory = function ($q, postFactory) {
  return {
    postsAsCsv: function () {
      var output = "chapterNo,postNo,text,amount";
      angular.forEach(postFactory.posts, function (post) {
        output += util.format("\n%d,%d,%s,%d", post.chapterNo, post.no, post.text, post.cost + post.revenue);
      });
      return output;
    }
  }
};
module.exports = {
  $new: function ($q, meta) {
    var budget = new Budget(meta);
    var frames = FrameFactory($q, budget);
    var chapters = ChapterFactory($q, frames);
    var posts = PostFactory($q, chapters);
    var output = OutputFactory($q, posts);
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
      output: output,
      posts: posts.posts,
      resetAlternative: budget.resetAlternative,
      setAlternative: budget.setAlternative
    }
  }
};