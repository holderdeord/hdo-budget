import Post from './Post';

class Chapter {
  constructor(frame, chapterNo, chapterName) {
  	this.frame = frame;
  	this.no = chapterNo;
    this.name = chapterName;
    this.postsMap = {};
  }

  addPost(postNo, text, amount) {
  	this.postsMap[postNo] = this.postsMap[postNo] || new Post(this, postNo, text, amount);
  	return this.postsMap[postNo];
  }

  getPosts() {
  	return Object.keys(this.postsMap).map(postNo => {
  		return this.postsMap[postNo];
  	});
  }
}

export default Chapter;