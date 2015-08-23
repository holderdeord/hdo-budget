context = require.context('../src/js/models', true, /-spec\.js$/);
context.keys().forEach(context);
var context = require.context('.', true);
context.keys().forEach(context);