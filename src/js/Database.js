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
            const frameMap = {};
            const chapterMap = {};

            structure.forEach(r => {
                let frame = frameMap[r.frameNo] = frameMap[r.frameNo] || {
                        id: r.frameNo,
                        name: r.frameName,
                        chapters: [],
                        revenue: 0,
                        cost: 0
                    };

                let chapter = {
                    id: r.chapterNo,
                    name: r.chapterName,
                    revenue: 0,
                    cost: 0,
                    posts: []
                };

                frame.chapters.push(chapter);

                frameMap[frame.id] = frame;
                chapterMap[chapter.id] = chapter;
            });

            posts.forEach(p => {
                let chapter = chapterMap[p.chapterNo];

                if (chapter) {
                    let post = {
                        id: p.postNo,
                        description: p.text,
                        amount: +p.amount
                    };

                    // FIXME: don't trust this logic
                    if (+chapter.id <= 2800) {
                        chapter.cost += Math.abs(post.amount);
                    } else if (+chapter.id > 3000) {
                        chapter.revenue += Math.abs(post.amount);
                    } else {
                        log(`warning: not sure if chapter ${chapter.id} is cost or revenue`);
                    }

                    chapter.posts.push(post);
                } else {
                    log(`warning: could not find chapter ${p.chapterNo} in ${raw.name}`);
                }
            });

            const frames = Object.values(frameMap);

            frames.forEach(frame => {
                frame.chapters.forEach(chapter => {
                    frame.revenue += chapter.revenue;
                    frame.cost += chapter.cost;
                });
            });

            return {
                id: slugify(raw.name),
                name: raw.name,
                year: raw.year,
                creator: {
                    id: slugify('Stoltenberg II'),
                    name: 'Stoltenberg II'
                },
                frames: frames
            };
        });
    }

    constructor(budgets) {
        this.budgets = budgets;
        this.budgetsById = {};

        budgets.forEach(b => this.budgetsById[b.id] = b);
    }

    allBudgets() {
        return this.budgets;
    }

    getBudgetById(id) {
        return this.budgetsById[id];
    }

    getBudgetFrameByIds(budgetId, frameId) {
        const budget = this.getBudgetById(budgetId);

        if (!budget.framesById) {
            budget.framesById = {};
            budget.frames.forEach(f => budget.framesById[f.id] = f);
        }

        return budget.framesById[frameId];
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
