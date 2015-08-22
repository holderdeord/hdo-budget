import Promise from 'bluebird';
import fs from 'fs';

// models
import Budget from '../models/Budget';
import Frame from '../models/Frame';

var parse = require('csv-parse');

class BudgetFactory {
  constructor() {

  }

  loadStructureExplicitly(budgetName, structureFile, postFiles) {
    var budget = new Budget(budgetName);
    var chapterMap = {};
    return streamToPromise(fs.createReadStream(structureFile).pipe(parse({
      columns: true
    }, function (err, chapters) {
      chapters.forEach(function (chapter) {
        var frame = budget.addFrame(chapter.frameNo, chapter.frameName);
        chapterMap[chapter.chapterNo] = frame.addChapter(chapter.chapterNo, chapter.chapterName);
      });
    }))).then(function () {
      return Promise.map(postFiles, function (postFile) {
        return streamToPromise(fs.createReadStream(postFile).pipe(parse({
          columns: true
        }, function (err, posts) {
          posts.forEach(function (post) {
            chapterMap[post.chapterNo].addPost(post.postNo, post.text, post.amount);
          });
        })));
      }).then(function () {
        return budget;
      });
    });
  }
}

const budgetFactory = new BudgetFactory();

export default budgetFactory;

function streamToPromise(stream) {
    return new Promise(function(resolve, reject) {
        stream.on("end", resolve);
        stream.on("error", reject);
    });
}