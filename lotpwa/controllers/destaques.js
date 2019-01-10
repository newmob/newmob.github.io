// log
var logger = require('../config/logger');

module.exports = {

    criaHTML: function (config) {
        var Request = require("request");

        let header = {
            headers: config.apiDestaque.headers,
            uri: config.apiDestaque.uri,
            method: config.apiDestaque.method
        };

        //console.log("Acessando endPoint: " + config.apiDestaque.uri);

        Request.get(header,
            (error, response, body) => {
                if (error) {
                    return console.dir(error);
                }

                const info = JSON.parse(body);
                procTemplates(config, info)
            });

    }

}

function procTemplates(config, info) {
    const pug = require('pug');
    const fs = require('fs');

    for (i = 0; i < info.payload.length; i++) {
        const modalidade = info.payload[i].modalidade;
        const dados = info.payload[i];
        const template = config.templates[modalidade];
        const template_fname = global.dir_views + "\\" + template;
        const html_fname = global.dir_html + "\\" + dados.modalidade.toLowerCase() + "_" + dados.tipoConcurso.toLowerCase() + ".html";
        console.log(html_fname);

        if (template) {
            const html = pug.renderFile(template_fname, dados);
            try {
                const data = fs.writeFileSync(html_fname, html);
            } catch (err) {
                logger.log('error', 'Erro na gravacao do arquivo ' + err)
            }
        } else {
            logger.log('error', "Template '" + modalidade + "' nao configurado.");
        }
    }
}
