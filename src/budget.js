angular.module("budgetApp", [])
  .directive("hdoToggle", function () {
    return function (scope, element) {
      element.addClass("toggler");
      element.on("click", function () {
        element.parent().children().toggleClass("toggled");
      });
    }
  })
  .factory("budget", ['$q', function ($q) {
    function getDiff (other) {
      return this.revenue - other.revenue - this.cost + other.cost;
    }
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
      this.setAlternative = function (meta) {
        this.alternative.name = meta.name;
        this.alternative.cost = this.alternative.cost || 0;
        this.alternative.revenue = this.alternative.revenue || 0;
      };
      this.addAlternative = function (alternative) {
        this.alternative.cost += alternative.cost;
        this.alternative.revenue += alternative.revenue;
      };
      this.getDiff = function () {
        return getDiff.call(this, this.alternative);
      };
      this.update = function (cost, revenue) {
        update.call(this, cost, revenue);
      };
    }
    function FrameFactory (budget) {
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
        this.getDiff = function () {
          return getDiff.call(this, this.alternative);
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
    function ChapterFactory(frames) {
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
        }
        this.addAlternative = function (alternative) {
          this.frame.addAlternative(alternative);
          this.alternative.cost += alternative.cost;
          this.alternative.revenue += alternative.revenue;
        }
        this.getDiff = function () {
          return getDiff.call(this, this.alternative);
        }
      }
      var chapterIsResolved = {};
      var chapterMap = {};
      var chapters =  [];
      return {
        add: function (frameNo, chapterNo, chapterName) {
          if (chapterIsResolved[chapterNo]) return;
          chapterMap[chapterNo] = chapterMap[chapterNo] || $q.defer();
          frames.get(frameNo).then(function (frame) {
            var chapter = new Chapter(frame, chapterNo, chapterName);
            chapterMap[chapterNo].resolve(chapter);
            chapters.push(chapter);
            frame.addChapter(chapter);
          });
          chapterIsResolved[chapterNo] = true;
        },
        chapterMap: chapterMap,
        chapters: chapters,
        get: function (chapterNo) {
          chapterMap[chapterNo] = chapterMap[chapterNo] || $q.defer();
          return chapterMap[chapterNo].promise;
        }
      }
    }
    function PostFactory(chapters) {
      function Post(chapter, postNo, text, amount) {
        this.chapter = chapter;
        this.no = postNo;
        this.text = text;
        this.cost = chapter.no <= 2800 ? amount : 0;
        this.revenue = chapter.no > 3000 ? amount : 0;
        this.alternative = null;
        this.getDiff = function () {
          return getDiff.call(this, this.alternative);
        };
        this.setAlternative = function (alternative) {
          this.alternative = alternative;
          this.chapter.addAlternative(alternative);
        };
      }
      function AlternativePost(chapterNo, amount) {
        this.cost = chapterNo <= 2800 ? amount : 0;
        this.revenue = chapterNo > 3000 ? amount : 0;
      }
      var postMap = {};
      var posts = [];
      function add (chapterNo, postNo, text, amount, alternative) {
        chapters.get(chapterNo).then(function (chapter) {
          var post = new Post(chapter, postNo, text, amount);
          posts.push(post);
          chapter.addPost(post);
          postMap[chapterNo + '-' + postNo] = post;
          if (alternative) {
            post.setAlternative(alternative);
          }
        });
      }
      return {
        add: add,
        addAlternative: function (chapterNo, postNo, text, amount) {
          var alternative = new AlternativePost(chapterNo, amount);
          var post = postMap[chapterNo + '-' + postNo];
          if (post) {
            post.setAlternative(alternative);
            return;
          }
          add(chapterNo, postNo, text, 0, alternative);
        },
        posts: posts
      }
    }
    return {
      $new: function (meta) {
        var budget = new Budget(meta);
        var frames = new FrameFactory(budget);
        var chapters = new ChapterFactory(frames);
        var posts = new PostFactory(chapters);
        return {
          addFrame: frames.add,
          addChapter: chapters.add,
          addPost: posts.add,
          addAlternativePost: posts.addAlternative,
          alternative: budget.alternative,
          chapters: chapters.chapters,
          frames: frames.frames,
          meta: budget,
          posts: posts.posts,
          setAlternative: budget.setAlternative
        }
      }
    }
  }])
  .service("d3", function () {
    return d3;
  })
  .service("budgetLoader", ['$rootScope', '$q', 'budget', 'd3', function ($rootScope, $q, budget, d3) {
    var cachedStructure = {};
    var cachedBudgets = {};
    function structure(url) {
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
            $rootScope.$digest();
          });
      }
      return deferred.promise;
    }
    function posts(url) {
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
    function $new(meta) {
      var deferred = $q.defer();
      if (cachedBudgets[meta.name]) {
        deferred.resolve(cachedBudgets[meta.name]);
      } else {
        var b = budget.$new(meta);
        var promises = meta.posts.map(function (url) {
          var d = $q.defer();
          posts(url).then(parsePosts(b, d));
          return d.promise;
        });
        var structureDeferred = $q.defer();
        structure(meta.structure).then(parseStructure(b, structureDeferred));
        promises.push(structureDeferred);
        $q.all(promises).then(function () {
          deferred.resolve(b);
          cachedBudgets[meta.name] = b;
        });
      }
      return deferred.promise;
    }
    function alternative(budget, meta) {
      var deferred = $q.defer();
      var promises = meta.posts.map(function (url) {
        var d = $q.defer();
        posts(url).then(parseAlternatives(budget, d));
        return d.promise;
      });
      $q.all(promises).then(function () {
        budget.setAlternative(meta);
        deferred.resolve(budget);
      });
      return deferred.promise;
    }
    return {
      $new: $new,
      alternative: alternative,
      posts: posts,
      structure: structure
    };
  }])
  .controller("BudgetController", ["$scope", "budgetLoader", "d3", function ($scope, budgetLoader, d3) {
    function prepareAlternatives(budgets, selected) {
      return budgets.filter(function (b) {
        return b !== selected;
      });
    }
    d3.json("/data/budgets.json", function (budgets) {
      $scope.budgets = budgets;
      $scope.selectedBudget = budgets[0];
      $scope.alternatives = prepareAlternatives(budgets, $scope.selectedBudget);
      budgetLoader.$new(budgets[0]).then(function (budget) {
        $scope.budget = budget;
      });
    });
    $scope.m = function (value) {
      return numeral(value).format("0,0");
    }
    $scope.selectAlternative = function (alternative) {
      $scope.selectedAlternative = alternative;
      budgetLoader.alternative($scope.budget, alternative).then(function (newBudget) {
        $scope.budget = newBudget;
      });
    };
    $scope.selectBudget = function (budget) {
      $scope.selectedBudget = budget;
      $scope.alternatives = prepareAlternatives($scope.budgets, budget);
      $scope.budget = null;
      $scope.alternative = null;
      $scope.selectedAlternative = null;
      budgetLoader.$new(budget).then(function (newBudget) {
        $scope.budget = newBudget;
      });
    };
  }]);