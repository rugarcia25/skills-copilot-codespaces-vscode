// Create simple web application that responds to requests to /comments and
// /comments/new. The /comments/new path should accept a POST request and add
// the submitted comment to the comment list. The /comments path should
// display all of the submitted comments. Use the following HTML as a starting
// point for your application:

var http = require('http');
var qs = require('querystring');

var comments = [];

function renderForm(comment) {
  var html = '<!doctype html>';
  html += '<html><head><title>Guest Book</title></head>';
  html += '<body><h1>Guest Book</h1>';
  html += '<form method="post" action="/comments/new">';
  html += '<input type="text" name="comment">';
  html += '<input type="submit" value="Submit">';
  html += '</form>';
  html += '<h2>Comments</h2>';
  html += '<ul>';
  comments.forEach(function(comment) {
    html += '<li>' + comment + '</li>';
  });
  html += '</ul>';
  html += '</body></html>';
  return html;
}

http.createServer(function(req, res) {
  if (req.method === 'POST' && req.url === '/comments/new') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      var comment = qs.parse(body).comment;
      comments.push(comment);
      res.writeHead(302, { 'Location': '/comments' });
      res.end();
    });
  } else if (req.url === '/comments') {
    var html = renderForm();
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end(html);
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(3000); server