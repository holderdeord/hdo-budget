angular.module("budgetApp", [])
	.factory("budget", ['$q', function ($q) {
		function FrameFactory () {
			function Frame(frameNo, frameName) {
				this.no = frameNo;
				this.name = frameName;
				this.chapters = [];
				this.amount = 0;
				this.addChapter = function (chapter) {
					this.chapters.push(chapter);
				}
				this.updateAmount = function (amount) {
					this.amount += amount;
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
				this.amount = 0;
				this.posts = [];
				this.addPost = function (post) {
					this.posts.push(post);
					this.amount += post.amount;
					this.frame.updateAmount(post.amount);
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
				this.amount = amount;
			}
			var posts = [];
			return {
				add: function (chapterNo, postNo, text, amount) {
					chapters.get(chapterNo).then(function (chapter) {
						console.log("TEST");
						var post = new Post(chapter, postNo, text, amount);
						posts.push(post);
						chapter.addPost(post);
					});
				},
				posts: posts
			}
		}
		return {
			$new: function () {
				var frames = new FrameFactory();
				var chapters = new ChapterFactory(frames);
				var posts = new PostFactory(chapters);
				return {
					addFrame: frames.add,
					addChapter: chapters.add,
					addPost: posts.add,
					chapters: chapters.chapters,
					frames: frames.frames,
					posts: posts.posts
				}
			}
		}
	}])
	.controller("BudgetController", ["$scope", "budget", function ($scope, budget) {
		$scope.budget = budget.$new();
		d3.csv("/data/frames.csv", function (d){
			return {
				frameNo: d.frameNo,
				frameName: d.frameName,
				chapterNo: d.chapterNo,
				chapterName: d.chapterName
			};
		}, function (error, rows) {
			rows.forEach(function (r) {
				$scope.budget.addFrame(r.frameNo, r.frameName);
				$scope.budget.addChapter(r.frameNo, r.chapterNo, r.chapterName);
			});
			$scope.$digest();
		});
		/*
		structure.forEach(function (line) {
			$scope.budget.addFrame(line.frameNo, line.frameName);
			$scope.budget.addChapter(line.frameNo, line.chapterNo, line.chapterName);
		});
		posts.forEach(function (post) {
			$scope.budget.addPost(post.chapterNo, post.postNo, post.text, post.amount);
		});
*/
	}]);