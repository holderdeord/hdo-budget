import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import slug from 'slug';
import csv from 'csv';
import debug from 'debug';

const log = debug('hdo-budget:database');

Promise.promisifyAll(fs);
Promise.promisifyAll(csv);

//
// Just read in everything from the file system for now.
//

export default class Database {
    static get() {
        return fs.readFileAsync(
            path.resolve(__dirname, '../../data/budgets.json'), {encoding: 'utf-8'}
        ).then((content) => {
            return Promise
                .map(JSON.parse(content), ::this._loadBudget)
                .then(budgets => new Database(budgets));
        });
    }

    static _loadBudget(raw) {
        return Promise.join(
            loadCsv(raw.structure),
            loadCsv(raw.posts)
        ).then(([structure, posts]) => {
            console.log({structure: structure.length, posts: posts.length});

            const frameMap = {};
            const chapterMap = {}

            structure.forEach(r => {
                let frame = frameMap[r.frameNo] = frameMap[r.frameNo] || {id: r.frameNo, name: r.frameName, chapters: []}
                let chapter = {
                    id: r.chapterNo,
                    name: r.chapterName,
                    posts: []
                };

                frame.chapters.push(chapter)

                frameMap[frame.id] = frame;
                chapterMap[chapter.id] = chapter;
            });

            posts.forEach(p => {
                let chapter = chapterMap[p.chapterNo];

                if (chapter) {
                    chapter.posts.push({
                        id: p.postNo,
                        description: p.text,
                        amount: +p.amount
                    });
                } else {
                    log(`warning: could not find chapter ${p.chapterNo} in ${raw.name}`);
                }
            });

            return {
                id: slugify(raw.name),
                name: raw.name,
                year: raw.year,
                creator: {
                    id: slugify('Stoltenberg II'),
                    name: 'Stoltenberg II'
                },
                frames: Object.keys(frameMap).map(id => frameMap[id])
            };
        });
    }

    constructor(budgets) {
        this.budgets = budgets;
        this.budgetsById = {}

        budgets.forEach(b => this.budgetsById[b.id] = b);
    }

    allBudgets() {
        return this.budgets;
    }

    getBudgetById(id) {
        return this.budgetsById[id];
    }
}

function slugify(str) {
    return slug(str, {lower: true});
}

function loadCsv(name) {
    return fs
            .readFileAsync(path.resolve(__dirname, `../..${name}`), {encoding: 'utf-8'})
            .then(d => csv.parseAsync(d, {columns: true}));
}
