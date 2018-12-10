module.exports = (app) => {
    app.get('/', function (req, resp) {
        resp.send(`
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Hello World Node.JS</h1>
            </body>
        </html>
        `
        )
    });

    app.get('/livros', function (req, resp) {
        resp.send(`
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Lista de Livros</h1>
            </body>
        </html>
        `
        )
    });
}