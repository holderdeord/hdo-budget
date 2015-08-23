#!/usr/bin/env node

var program = require('commander');

import Promise from 'bluebird';
import BudgetFactory from './src/js/factories/Budget.js';
import fs from 'fs';

Promise.promisifyAll(fs);

program
  .option('-o, --output [value]', 'Name of file to output csv to; if none given will output to console')
  .parse(process.argv);

var structureFile = program.args.shift();
BudgetFactory.loadStructureExplicitly('denormalize', structureFile, program.args).then(budget => {
  save(outputAsCsv(budget.getPosts()), program.output).then(console.log);
});

function outputAsCsv(posts) {
  return posts.reduce((memo, post) => {
    return memo + `${post.chapter.frame.no},"${post.chapter.frame.name}",${post.chapter.no},"${post.chapter.name}",${post.no},"${post.text}",${post.amount}\n`;
  }, 'frameNo,frameName,chapterNo,chapterName,postNo,postName,amount\n');
}

function save(output, file) {
  return file ? fs.writeFileAsync(file, output).then(err => {
    return err ? err : `The file was saved to ${file}`;
  }) : new Promise(resolve => resolve(output));
}