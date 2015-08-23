import Budget from '../../src/js/models/Budget';
import Frame from '../../src/js/models/Frame';
import Chapter from '../../src/js/models/Chapter';

describe('Model: Budget', function () {
  var budget;

  beforeEach(function () {
    budget = new Budget('test');
  });

  it('should set up basic', function () {
    expect(Object.keys(budget.framesMap).length).toBe(0);
  });

  describe('Adding content', function () {
    var frame, chapter, post;

    beforeEach(function () {
      budget = new Budget('test');
      frame = budget.addFrame(1, 'foo');
      chapter = frame.addChapter(1337, 'foz');
      post = chapter.addPost(1, 'fob', 42);
    });

    it('can add frames', function () {
      expect(Object.keys(budget.framesMap).length).toBe(1);
      expect(budget.addFrame(2, 'bar')).toEqual(new Frame(2, 'bar'));
    });

    it('caches single entries of frames by number', function () {
      expect(frame).toBe(budget.addFrame(1, 'bar'));
    });

    it('can get posts', function () {
      expect(budget.getPosts()).toEqual([post]);
    });
  });
});