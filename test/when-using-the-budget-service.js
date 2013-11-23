describe("When using the budget-service", function () {
	var b;

	beforeEach(module('budgetApp'));
	beforeEach(inject(function (budget) {
		b = budget.$new();
		b.addFrame(1, "test");
		b.addChapter(1, 11, "test");
		b.addPost(11, 1, "test", 100);
	}));
	
	it("should be able to add frame", function () {
		b.addFrame(2, "test");
		expect(b.frames.length).toBe(2);
	});

	it("should not add frame twice", function () {
		b.addFrame(1, "test");
		expect(b.frames.length).toBe(1);
	});

	it("should be able to add chapter", inject(function ($rootScope) {
		b.addChapter(1, 12, "test");
		$rootScope.$apply();
		expect(b.chapters.length).toBe(2);
	}));

	it("should add chapter to frame", inject(function ($rootScope) {
		b.addChapter(1, 12, "test");
		$rootScope.$apply();
		expect(b.frames[0].chapters.length).toBe(2);
	}));

	it("should not add redundant chapters", inject(function ($rootScope) {
		b.addChapter(1, 11, "test");
		$rootScope.$apply();
		expect(b.chapters.length).toBe(1);
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
});