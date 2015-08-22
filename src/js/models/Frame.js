import Chapter from './Chapter';

class Frame {
  constructor(frameNo, frameName) {
  	this.no = frameNo;
    this.name = frameName;
    this.chaptersMap = {};
  }

  addChapter(chapterNo, chapterName) {
  	this.chaptersMap[chapterNo] = this.chaptersMap[chapterNo] || new Chapter(this, chapterNo, chapterName);
  	return this.chaptersMap[chapterNo];
  }

  getPosts() {
  	return Object.keys(this.chaptersMap).reduce((posts, chapterNo) => {
  		return posts.concat(this.chaptersMap[chapterNo].getPosts());
  	}, []);
  }
}

export default Frame;