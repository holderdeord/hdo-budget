import Frame from './Frame';

class Budget {
  constructor(name) {
    this.name = name;
    this.framesMap = {};
  }

  addFrame(frameNo, frameName) {
  	this.framesMap[frameNo] = this.framesMap[frameNo] || new Frame(frameNo, frameName);
  	return this.framesMap[frameNo];
  }
}

export default Budget;