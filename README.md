hdo-budget
==========

A simple application that loads the Norwegian state budget (and its alternatives) as CSVs and display them. It can also be used to compare budgets.

Setup
-----

The application is a [node.js](http://nodejs.org/) project, and uses [npm](https://npmjs.org/) to manage its backend components and [Bower](http://bower.io/) for its frontend components. You need to install the components to run the application.

	npm install
	bower install

To run the webserver you'll need [Grunt](http://gruntjs.com/).

	grunt

To run the tests.

	grunt test

To compile less

	grunt less

To autocompile less upon saving files.

	grunt watch

Models
------

The application starts by loading a `data/budgets.json`. The JSON contains a list of budgets, and the application will load the first budget by default.
