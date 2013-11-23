angular.module("budgetApp", [])
	.constant("structure", [
		{frameNo: 7, frameName: "Arbeid og sosial", chapterNo: 600, chapterName: "Arbeidsdepartementet"},
		{frameNo: 7, frameName: "Arbeid og sosial", chapterNo: 601, chapterName: "Utredningsvirksomhet, forskning m.m."},
		{frameNo: 12, frameName: "Olje og energi", chapterNo: 1800, chapterName: "Olje- og energidepartementet"},
		{frameNo: 12, frameName: "Olje og energi", chapterNo: 1810, chapterName: "Oljedirektoratet"}
	])
	.constant("data", [
		{chapterNo: 600, postNo: 1, text: "Driftsutgifter", amount: 180370000},
		{chapterNo: 601, postNo: 21, text: "Spesielle driftsutgifter", amount: 62400000},
		{chapterNo: 601, postNo: 50, text: "Norges forskningsråd", amount: 134120000},
		{chapterNo: 601, postNo: 70, text: "Tilskudd", amount: 22860000},
		{chapterNo: 1800, postNo: 21, text: "Spesielle driftsutgifter, kan overføres, kan nyttes under postene 70 og 72", amount: 30845000},
		{chapterNo: 1810, postNo: 1, text: "Driftsutgifter", amount: 247100000}
	])
	.factory("budget", function () {
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
			var frameMap = {};
			var frames = [];
			return {
				add: function (frameNo, frameName) {
					if (frameMap[frameNo]) return;
					var frame = new Frame(frameNo, frameName);
					frameMap[frameNo] = frame;
					frames.push(frame);
				},
				frameMap: frameMap,
				frames: frames
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
			var chapterMap = {};
			var chapters =  [];
			return {
				add: function (frameNo, chapterNo, chapterName) {
					if (chapterMap[chapterNo]) return;
					var frame = frames.frameMap[frameNo];
					var chapter = new Chapter(frame, chapterNo, chapterName);
					chapterMap[chapterNo] = chapter;
					chapters.push(chapter);
					frame.addChapter(chapter);
				},
				chapterMap: chapterMap,
				chapters: chapters
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
					var chapter = chapters.chapterMap[chapterNo];
					var post = new Post(chapter, postNo, text, amount);
					posts.push(post);
					chapter.addPost(post);
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
	})
	.controller("BudgetController", ["$scope", "structure", "data", "budget", function ($scope, structure, posts, budget) {
		$scope.budget = budget.$new();
		structure.forEach(function (line) {
			$scope.budget.addFrame(line.frameNo, line.frameName);
			$scope.budget.addChapter(line.frameNo, line.chapterNo, line.chapterName);
		});
		posts.forEach(function (post) {
			$scope.budget.addPost(post.chapterNo, post.postNo, post.text, post.amount);
		});
	}]);