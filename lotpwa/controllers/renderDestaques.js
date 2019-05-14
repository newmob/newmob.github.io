/*
    Caixa - CEDESSP042 - Loterias PWA
    ----------------------------------
    Módulo:     renderDestaques.js
    Objetivo:   Gerar blocos de HTML fazendo o merge de templates PUG com um arquivo JSON consolidado com dados de loterias.
    Autor:      c129426 - Marcelo de Araujo Maximiano
    Data:       14/05/2019
*/
var logger = require('../config/logger');
var request = require("request");
var config = require('../config/config');
var fs = require('fs');

module.exports = {

    criaHTML: async function () {
        var dados;

        // lê arquivo Json com os dados de loterias
        try {
            var obj = fs.readFileSync(config.jsonDestaques).toString();
            dados = JSON.parse(obj);
            await procTemplates(dados);
        } catch (err) {
            logger.log('error', "leJsonDestaques erro na leitura do arquivo jSON '" + config.jsonDestaques + "': " + err);
            return false;
        }
    }
}

async function procTemplates(jsonDestaques) {
    const pug = require('pug');
    const fs = require('fs');

    for (i = 0; i < jsonDestaques.length; i++) {
        const modalidade = jsonDestaques[i].modalidade;
        const dados = jsonDestaques[i];
        const template = config.templates[modalidade];
        const template_fname = global.dir_views + "\\" + template;
        const tipoConcurso = (dados.concursoEspecial ? "especial" : "normal");
        const html_fname = global.dir_html + "\\" + dados.modalidade.toLowerCase() + "_" + tipoConcurso + ".html";

        if (template) {
            try {
                const html = pug.renderFile(template_fname, dados);
                try {
                    const data = fs.writeFileSync(html_fname, html);
                }
                catch (err) {
                    logger.log('error', 'Erro na gravacao do arquivo ' + err)
                }
                finally {
                    // logar somente quando for para produção
                    //logger.log('info', 'Arquivo gerado com sucesso: ' + html_fname)
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            logger.log('error', "Template '" + modalidade + "' nao configurado.");
        }
    }
}

// Esta função deverá ser executada client-side
function apostasEncerram(dt) {
    var now = new Date();
    var retStr = "";

    var diff = dt - now;

    if (diff > 0) {
        var d, h, m, s;
        s = Math.floor(diff / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;

        d = 4;
        h = 12;

        if (d > 0) {
            retStr = d + (d > 1 ? " dias " : " dia ");
        }
        if (h > 0) {
            retStr = retStr + (d > 0 ? "e " : "");
            retStr = retStr + h + (h > 1 ? " horas" : " hora");
        }
    }

    return retStr;
}

