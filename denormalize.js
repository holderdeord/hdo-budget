#!/usr/bin/env node

var program = require('commander');

import BudgetFactory from './src/js/factories/Budget.js';

program.parse(process.argv);

var structureFile = program.args.shift();
var budget = BudgetFactory.loadStructureExplicitly(structureFile, program.args);

// console.log(structure, BudgetFactory.loadStructureExplicitly);
