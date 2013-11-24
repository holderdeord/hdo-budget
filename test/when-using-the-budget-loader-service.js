describe("When using the budget loader service", function () {
	var bl;
	var b;

	beforeEach(module('budgetApp'));
	beforeEach(inject(function (budget, budgetLoader, d3) {
		b = budget.$new();
		bl = budgetLoader;
		d3.csv = function (url, row, cb) {
			switch(url) {
				case "frames":
					cb({}, [ { frameNo: 1, frameName: "test", chapterNo: 11, chapterName: "test" } ]);
					break;
				case "post":
					cb({}, [ 
						{ chapterNo: 11, postNo: 1, text: "test", amount: "100 000"},
						{ chapterNo: 11, postNo: 11, text: "test2", amount: "20 000"}
					]);
					break;
				case "post2":
					cb({}, [ { chapterNo: 11, postNo: 3, text: "test", amount: "100 000"} ]);
					break;
			}
		}
	}));

	it("should return a promise when calling .structure", function () {
		var structure = bl.structure("frames");
		expect(structure.then).toEqual(jasmine.any(Function));
	});

	it("should resolve .structure with rows", inject(function ($rootScope) {
		bl.structure("frames").then(function (rows) {
			expect(rows.length).toBe(1);
		});
		$rootScope.$apply();
	}));

	it("should return a promise when calling .posts", function () {
		var posts = bl.posts("posts");
		expect(posts.then).toEqual(jasmine.any(Function));
	});

	it("should resolve .posts with rows", inject(function ($rootScope) {
		bl.posts("posts").then(function (rows) {
			expect(rows.length).toBe(2);
		});
		$rootScope.$apply();
	}));

	it("should return a promise when calling .$new", function () {
		var structure = bl.structure("frames");
		var budget = bl.$new(structure, ["post", "post2"]);
		expect(budget.then).toEqual(jasmine.any(Function));
	});

	it("should resolve .$new with a new budget", inject(function ($rootScope) {
		var structure = bl.structure("frames");
		bl.$new(structure, ["post", "post2"]).then(function (budget) {
			expect(budget.frames.length).toBe(1);
			expect(budget.chapters.length).toBe(1);
			expect(budget.posts.length).toBe(3);
		});
		$rootScope.$apply();
	}));

/*
	it("should populate budget with structure", function () {
		bl.structure(b, "test");
		expect(b.frames.length).toBe(1);
		expect(b.chapters.length).toBe(1);
	});
*/
});