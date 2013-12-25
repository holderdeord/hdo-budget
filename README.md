hdo-budget
==========

A simple application that loads the Norwegian state budget (and its alternatives) as CSVs and display them. It can also be used to compare budgets.

# Setup

The application is a [node.js](http://nodejs.org/) project, and uses [npm](https://npmjs.org/) to manage its backend components and [Bower](http://bower.io/) for its frontend components. In addition it uses [Grunt](http://gruntjs.com/) to as a task runner. In order to use these with the commands described below, you need to install them globally (but grunt and bower is also available locally in the `node_modules` folder).

    // install node.js from http://nodejs.org/
    npm install -g bower
    npm install -g grunt-cli

Components required to run the application are installed with the following:

    npm install
    bower install

## JavaScript

To enable us to reuse code for both browsers and node, we've used [browserify](http://browserify.org/). By structuring our code as [node.js modules](http://nodejs.org/api/modules.html) browserify does all the bundling necessary.

In addition we compress the code with the help of [UglifyJS2](https://github.com/mishoo/UglifyJS2).

We've chosen [AngularJS](http://angularjs.org/) as framework to structure our code. In addition [D3.js](http://d3js.org/) is used to load data, and [Numeral.js](http://numeraljs.com/) is used to present the numbers.

## CSS

We use [LESS](http://lesscss.org/) as preprocessor for CSS.

## Commands

To run the web app (this will also bundle and uglify all necessary JS):

    grunt

To run the web app without bundling:

    grunt web

To compile all source files

    grunt build
    grunt watch:build // will automatically build when any of the source files are saved

To run tests:

    grunt test // both browser tests (run with [PhantomJS](http://phantomjs.org/)) and node tests (run with buster)
    grunt test:buster // only buster tests
    grunt test:karma // only browser tests (run in browser)

To compile less:

    grunt less

# Models

The application starts by loading a `data/budgets.json`. The JSON contains a list of budgets, and the application will load the first budget by default. The following is an example of an entry:

    {
        "name": "Statsbudsjettet 2014",
        "year": 2014,
        "government": true,
        "parties": ["H", "FrP"],
        "structure": "/data/2014/structure.csv",
        "posts": ["/data/2014/main-cost.csv", "/data/2014/main-revenue.csv"]
    }

## Structure

The structure model is an overview of all frames and chapters used in the budgets.

## Posts

The posts model is a list of posts in a given budget.