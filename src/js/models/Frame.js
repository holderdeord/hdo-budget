import Chapter from './Chapter';

class Frame {
  constructor(frameNo, frameName) {
  	this.no = frameNo;
    this.name = frameName;
    this.chaptersMap = {};
  }

  addChapter(chapterNo, chapterName) {
  	this.chaptersMap[chapterNo] = this.chaptersMap[chapterNo] || new Chapter(chapterNo, chapterName);
  	return this.chaptersMap[chapterNo];
  }
}

export default Frame;