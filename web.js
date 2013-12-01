var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.configure(function () {
    app.use(
        "/", //the URL throught which you want to access to you static content
        express.static(__dirname) //where your static content is located in your filesystem
    );
});
app.listen(port); //the port you want to use
console.log("Express server running on http://localhost:" + port);