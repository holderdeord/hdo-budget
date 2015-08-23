import Budget from '../../src/js/models/Budget';
import Frame from '../../src/js/models/Frame';
import Chapter from '../../src/js/models/Chapter';

describe('Model: Frame', function () {
  var frame;

  beforeEach(function () {
    frame = new Frame('test');
  });

  it('should set up basic', function () {
    expect(Object.keys(frame.chaptersMap).length).toBe(0);
  });

  describe('Adding content', function () {
    var chapter, post;

    beforeEach(function () {
      chapter = frame.addChapter(1337, 'foz');
      post = chapter.addPost(1, 'fob', 42);
    });

    it('can add chapters', function () {
      expect(Object.keys(frame.chaptersMap).length).toBe(1);
      expect(frame.addChapter(1338, 'bar')).toEqual(new Chapter(frame, 1338, 'bar'));
    });

    it('caches single entries of frames by number', function () {
      expect(chapter).toBe(frame.addChapter(1337, 'bar'));
    });

    it('can get posts', function () {
      expect(frame.getPosts()).toEqual([post]);
    });
  });
});