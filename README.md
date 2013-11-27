hdo-budget
==========

A simple application that loads the Norwegian state budget (and its alternatives) as CSVs and display them. It can also be used to compare budgets.

Setup
-----

The application is a [node.js](http://nodejs.org/) project, and uses [npm](https://npmjs.org/) to manage its backend components and [Bower](http://bower.io/) for its frontend components. In addition it uses [Grunt](http://gruntjs.com/) to as a task runner. In order to use these with the commands described below, you need to install them globally (but grunt and bower is also available locally in the `node_modules` folder).

	// install node.js from http://nodejs.org/
	npm install -g bower
	npm install -g grunt

Components required to run the application are installed with the following:

	npm install
	bower install

To run the webserver:

	grunt

To run the tests:

	grunt test

To compile less:

	grunt less

To autocompile less upon saving files:

	grunt watch

Models
------

The application starts by loading a `data/budgets.json`. The JSON contains a list of budgets, and the application will load the first budget by default.
