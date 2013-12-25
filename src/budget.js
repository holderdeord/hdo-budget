angular.module("budgetApp", [])
  .directive("hdoToggle", function () {
    return {
      scope: {
        entity: "=",
        key: "@"
      },
      link: function (scope, element) {
        element.addClass("toggler");
        element.on("click", function () {
          scope.entity[scope.key + "Loaded"] = scope.entity[scope.key];
          element.parent().children().toggleClass("toggled");
          scope.$apply();
        });
      }
    }
  })
  .factory("budget", [function () {
    return require("./budgetFactory");
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
        var b = budget.$new($q, meta);
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
      budget.resetAlternative();
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
    $scope.d = function (entity, alternative) {
      if (!entity) return 0;
      if (!alternative) return entity.revenue - entity.cost;
      return entity.revenue - alternative.revenue - entity.cost + alternative.cost;
    };
    $scope.m = function (value) {
      if (value == 0) return "";
      return numeral(value).format("0,0");
    };
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