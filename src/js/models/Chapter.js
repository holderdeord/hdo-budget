import Post from './Post';

class Chapter {
  constructor(chapterNo, chapterName) {
  	this.no = chapterNo;
    this.name = chapterName;
    this.postsMap = {};
  }

  addPost(postNo, text, amount) {
  	this.postsMap[postNo] = this.postsMap[postNo] || new Post(postNo, text, amount);
  	return this.postsMap[postNo];
  }
}

export default Chapter;