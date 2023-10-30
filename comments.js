// Create a web server for comments
// Run it with: node comments.js
// Then, open http://localhost:8000/comments.html in a browser to see the comments page.

var http = require('http');
var fs = require('fs');
var url = require('url');

var comments = [];

// Create a server that will respond to requests for comments
var server = http.createServer(function (request, response) {
    // Get the path from the URL
    var path = url.parse(request.url).pathname;
    // If the path is /comments, then we are adding a comment
    if (path == '/comments') {
        // Get the comment from the URL query string
        var comment = url.parse(request.url, true).query.comment;
        // Add the comment to the list of comments
        comments.push(comment);
        // Send back a response
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Thanks for your comment!');
    }
    // If the path is /show, then we are showing all comments
    else if (path == '/show') {
        // Send back a response
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(comments.join('\n'));
    }
    // Otherwise, we are requesting a web page
    else {
        // Get the file name from the path
        var fileName = path.substring(1);
        // Read the file asynchronously
        fs.readFile(fileName, function(err, data) {
            // If there is an error, send back a 404 page
            if (err) {
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.end('404 Not Found');
            }
            // Otherwise, send back the file
            else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data.toString());
            }
        });
    }
});

// Start listening for requests
server.listen(8000);
console.log('Server running at http://localhost:8000');