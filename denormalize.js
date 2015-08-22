#!/usr/bin/env node

var program = require('commander');

import BudgetFactory from './src/js/factories/Budget.js';

program.parse(process.argv);

var structureFile = program.args.shift();
BudgetFactory.loadStructureExplicitly('denormalize', structureFile, program.args).then(budget => {
	console.log(budget.getPosts().length);
});

// console.log(structure, BudgetFactory.loadStructureExplicitly);
