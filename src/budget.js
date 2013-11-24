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
		var format = "0,0";
		function FrameFactory () {
			function Frame(frameNo, frameName) {
				this.no = frameNo;
				this.name = frameName;
				this.chapters = [];
				this.cost = 0;
				this.costFormatted = numeral(0).format(format);
				this.revenue = 0;
				this.revenueFormatted = numeral(0).format(format);
				this.addChapter = function (chapter) {
					this.chapters.push(chapter);
				}
				this.update = function (cost, revenue) {
					this.cost += cost;
					this.costFormatted = numeral(this.cost).format(format);
					this.revenue += revenue;
					this.revenueFormatted = numeral(this.revenue).format(format);
				}
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
				this.costFormatted = numeral(0).format(format);
				this.revenue = 0;
				this.revenueFormatted = numeral(0).format(format);
				this.posts = [];
				this.addPost = function (post) {
					this.posts.push(post);
					this.cost += post.cost;
					this.costFormatted = numeral(this.cost).format(format);
					this.revenue += post.revenue;
					this.revenueFormatted = numeral(this.revenue).format(format);
					this.frame.update(post.cost, post.revenue);
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
				this.costFormatted = numeral(amount).format(format)
				this.revenue = chapter.no > 3000 ? amount : 0;
				this.revenueFormatted = numeral(amount).format(format)
			}
			var posts = [];
			return {
				add: function (chapterNo, postNo, text, amount) {
					chapters.get(chapterNo).then(function (chapter) {
						var post = new Post(chapter, postNo, text, amount);
						posts.push(post);
						chapter.addPost(post);
					});
				},
				posts: posts
			}
		}
		return {
			$new: function (name) {
				var frames = new FrameFactory();
				var chapters = new ChapterFactory(frames);
				var posts = new PostFactory(chapters);
				return {
					addFrame: frames.add,
					addChapter: chapters.add,
					addPost: posts.add,
					chapters: chapters.chapters,
					frames: frames.frames,
					name: name,
					posts: posts.posts
				}
			}
		}
	}])
	.service("d3", function () {
		return d3;
	})
	.service("budgetLoader", ['$rootScope', '$q', 'budget', 'd3', function ($rootScope, $q, budget, d3) {
		var cachedStructure = {};
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
		function parseStructure(budget, deferred) {
			return function (rows) {
				rows.forEach(function (r) {
					budget.addFrame(r.frameNo, r.frameName);
					budget.addChapter(r.frameNo, r.chapterNo, r.chapterName);
				});
				deferred.resolve();
			}
		}
		function $new(bJson) {
			var b = budget.$new(bJson.name);
			var deferred = $q.defer();
			var promises = bJson.posts.map(function (url) {
				var d = $q.defer();
				posts(url).then(parsePosts(b, d));
				return d.promise;
			});
			var structureDeferred = $q.defer();
			structure(bJson.structure).then(parseStructure(b, structureDeferred));
			promises.push(structureDeferred);
			$q.all(promises).then(function () {
				deferred.resolve(b);
			});
			return deferred.promise;
		}
		return {
			$new: $new,
			posts: posts,
			structure: structure
		};
	}])
	.controller("BudgetController", ["$scope", "budgetLoader", "d3", function ($scope, budgetLoader, d3) {
		d3.json("/data/budgets.json", function (budgets) {
			$scope.budgets = budgets;
			budgetLoader.$new(budgets[0]).then(function (budget) {
				$scope.budget = budget;
			});
			/*
			$scope.years = meta.budgets.reduce(function (years, b) {
				if (years.indexOf(b.year) === -1) {
					years.push(b.year);
				}
				return years;
			}, []).sort(function (a, b) { return b - a; });
			$scope.year = meta.default;
			$scope.selectedBudget = meta.budgets.reduce(function (budget, b) {

			}

			*/
		});
		/*
		var year = 2014;
		var structure = budgetLoader.structure("/data/" + year + "/structure.csv");
		var posts = ["/data/" + year + "/main-cost.csv", "/data/" + year + "/main-revenue.csv"];
		budgetLoader.$new(structure, posts).then(function (budget) {
			$scope.budget = budget;
		});
*/
	}]);