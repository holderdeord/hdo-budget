import Promise from 'bluebird';
import fs from 'fs';

// models
import Budget from '../models/Budget';
import Frame from '../models/Frame';

var parse = require('csv-parse');

class BudgetFactory {
  constructor() {

  }

  loadStructureExplicitly(structureFile, postFiles) {
    var budget = new Budget('test');
    var chapterMap = {};
    fs.createReadStream(structureFile).pipe(parse({
      columns: true
    }, function (err, chapters) {
      chapters.forEach(function (chapter) {
        var frame = budget.addFrame(chapter.frameNo, chapter.frameName);
        chapterMap[chapter.chapterNo] = frame.addChapter(chapter.chapterNo, chapter.chapterName);
      });
    }));
    postFiles.forEach(function (postFile) {
      fs.createReadStream(postFile).pipe(parse({
        columns: true
      }, function (err, posts) {
        posts.forEach(function (post) {
          chapterMap[post.chapterNo].addPost(post.postNo, post.text, post.amount);
        });
      }));
    });
    return budget;
  }
}

const budgetFactory = new BudgetFactory();

export default budgetFactory;