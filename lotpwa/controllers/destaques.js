module.exports = {

    criaHTML: function (config) {
        var Request = require("request");
                
        let header = {
            headers: config.apiDestaque.headers,
            uri: config.apiDestaque.uri,
            method: config.apiDestaque.method
        };

        console.log("Acessando endPoint: " + config.apiDestaque.uri);

        Request.get(header,
            (error, response, body) => {
                if (error) {
                    return console.dir(error);
                }

                const info = JSON.parse(body);

                procTemplates(config,info)
            });

    }

}

function procTemplates(config,info) {
    const pug = require('pug');

    for (i = 0; i < info.payload.length; i++) {
        const modalidade = info.payload[i].modalidade;
        const dados = info.payload[i];
        const template = config.templates[modalidade]
        const html = pug.renderFile(template, dados); 
        console.log(html);
    }
}