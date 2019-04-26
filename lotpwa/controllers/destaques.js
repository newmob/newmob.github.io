// log
var logger = require('../config/logger');
var request = require("request");
var config = require('../config/config');

module.exports = {

    criaHTML: async function () {
        let header = {
            headers: config.apiDestaque.headers,
            uri: config.apiDestaque.uri,
            method: config.apiDestaque.method
        };

        //console.log("Acessando endPoint: " + config.apiDestaque.uri);

        try {
            console.log("call pegaToken");
            var tokenAPI = await pegaToken();
            var refreshToken = tokenAPI.refresh_token;
            console.log("show pegaToken");
            console.log(refreshToken);
        } catch (err) {
            if (err.message) {
                logger.log('error', 'criaHTML abortado, erro na chamada da API de Token: ' + err.message)
            } else {
                errStr = JSON.stringify(err);
                logger.log('error', 'criaHTML abortado, erro na chamada da API de Token: ' + errStr);
            }
            return false;
        }

        /*
        request.get(header,
            (error, response, body) => {
                if (error) {
                    return console.dir(error);
                }

                const info = JSON.parse(body);
                procTemplates(config, info)
            });
        */
    }

}

async function procTemplates(config, info) {
    const pug = require('pug');
    const fs = require('fs');

    for (i = 0; i < info.payload.length; i++) {
        const modalidade = info.payload[i].modalidade;
        const dados = info.payload[i];
        const template = config.templates[modalidade];
        const template_fname = global.dir_views + "\\" + template;
        const html_fname = global.dir_html + "\\" + dados.modalidade.toLowerCase() + "_" + dados.tipoConcurso.toLowerCase() + ".html";
        console.log(modalidade + " -> " + dados.tipoConcurso);

        if (template) {
            const html = pug.renderFile(template_fname, dados);
            try {
                const data = fs.writeFileSync(html_fname, html);
            }
            catch (err) {
                logger.log('error', 'Erro na gravacao do arquivo ' + err)
            }
            finally {
                //logger.log('info', 'Arquivo gerado com sucesso: ' + html_fname)
            }
        } else {
            logger.log('error', "Template '" + modalidade + "' nao configurado.");
        }
    }
}

async function pegaToken() {
    var options = {
        headers: config.apiAccessToken.headers,
        url: config.apiAccessToken.uri,
        method: config.apiAccessToken.method,
        form: config.apiAccessToken.form
    };

    return new Promise((resolve, reject) => {

        request.post(options, (err, response, body) => {
            if (err) {
                return reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    });
}