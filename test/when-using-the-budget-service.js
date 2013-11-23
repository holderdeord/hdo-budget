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

	it("should be able to add chapter", function () {
		b.addChapter(1, 12, "test");
		expect(b.chapters.length).toBe(2);
	});

	it("should add chapter to frame", function () {
		b.addChapter(1, 12, "test");
		expect(b.frames[0].chapters.length).toBe(2);
	});

	it("should not add redundant chapters", function () {
		b.addChapter(1, 11, "test");
		expect(b.chapters.length).toBe(1);
	});

	it("should be able to add post", function () {
		b.addPost(11, 1, "test", 100);
		expect(b.posts.length).toBe(2);
	});

	it("should add post to chapter", function () {
		b.addPost(11, 1, "test", 100);
		expect(b.chapters[0].posts.length).toBe(2);
	});

	it("should add amount to chapter", function () {
		b.addPost(11, 1, "test", 100);
		expect(b.chapters[0].amount).toBe(200);
	});

	it("should add amount to frame", function () {
		b.addPost(11, 1, "test", 100);
		expect(b.frames[0].amount).toBe(200);
	});
});