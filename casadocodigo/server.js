const http = require('http');

const servidor = http.createServer(function(req, resp) {
    resp.end(`
    <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>Hello World Node.JS</h1>
        </body>
    </html>
    `);
});

servidor.listen(3000,'localhost');
