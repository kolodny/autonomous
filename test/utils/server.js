var http = require('http');

var server = http.createServer(function (request,response) {
    if (/submit/.test(request.url)) {
        response.writeHead(200,{"Content-Type": "text/html"});
        response.end(
          '<script>setTimeout("document.body.innerHTML = location.search")<\/script>'
        );
    }
    else {
        response.writeHead(200,{"Content-Type": "text/html"});
        response.end('<form action=submit><input name=n><button>');
    }
}).listen();

module.exports = server

