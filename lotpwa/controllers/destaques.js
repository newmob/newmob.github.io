var logger = require('../config/logger');
var request = require("request");
var config = require('../config/config');
var fs = require('fs');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

module.exports = {

    criaHTML: async function () {
        var refreshToken = "";

        // ----------------------------------------------------------------------------------------------
        // pega o refresh token
        try {
            var tokenAPI = await pegaToken();
            refreshToken = tokenAPI.refresh_token;
        } catch (err) {
            if (err.message) {
                logger.log('error', 'criaHTML abortado, erro na chamada da API de Token: ' + err.message)
            } else {
                errStr = JSON.stringify(err);
                logger.log('error', 'criaHTML abortado, erro na chamada da API de Token: ' + errStr);
            }
            return false;
        }
        // atualiza o token no header
        config.apiLoterias.headers.Authorization = `Bearer ${refreshToken}`;
        // ----------------------------------------------------------------------------------------------

        const teste = await criaDados();
        console.log(teste);

        //const res = pegaJsonResultados();

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

async function pegaResultadoLoteria(loteria) {
    var options = {
        headers: config.apiLoterias.headers,
        url: config.apiLoterias.uri + "/" + loteria,
        method: config.apiLoterias.method,
        //rejectUnauthorized: false, 
        ca: fs.readFileSync(global.dir_ssl + "\\" + 'apicaixagovbr.crt')
    };
    return new Promise((resolve, reject) => {
        request.post(options, (err, response, body) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    });
}

async function pegaJsonResultados() {
    var retJson = [];

    // ----------------------------------------------------------------------------------------------
    // faz a chamada da API de resultados, loteria por loteria
    // Obs.: quando a nova API de loterias estiver pronta, deve substituir todo esse bloco
    for (const key in config.loterias) {
        let loteria = config.loterias[key];
        var json = "";
        console.log(loteria);

        // pega os dados da api de loterias
        try {
            json = await pegaResultadoLoteria(loteria);
            if (json == "") {
                logger.log('error', 'criaHTML sem resultado de ' + loteria)
            }
        } catch (err) {
            if (err.message) {
                logger.log('error', 'criaHTML abortado, erro na chamada da API de loterias: ' + err.message)
            } else {
                errStr = JSON.stringify(err);
                logger.log('error', 'criaHTML abortado, erro na chamada da API de loterias: ' + errStr);
            }
        }

        if (json != "") {
            console.log("------------------------------------");
            console.log(json);
            console.log("------------------------------------");

            // dados de retorno
            var dados = {};
            dados.modalidade = key;
            dados.descricao = "";
            dados.tipoConcurso = "";
            dados.concursoUltimo = "";
            dados.concursoProximo = "";
            dados.acumulou = "";
            dados.dataUltimo = "";
            dados.dataHoraSorteio = "";
            dados.resultado = "";
            dados.resultado2 = "";
            dados.valorApostaMinima = 0;

            switch (key) {
                case "MEGA_SENA":
                    dados.descricao = loteria;
                    dados.tipoConcurso = json.resultado.IC_CONCURSO_ESPECIAL;
                    dados.concursoUltimo = json.resultado.concurso;
                    dados.concursoProximo = parseInt(json.resultado.concurso, 10) + 1;
                    dados.acumulou = json.resultado.acumulado;
                    dados.dataUltimo = new Date(json.resultado.data);
                    dados.dataHoraSorteio = new Date(json.resultado.DT_PROXIMO_CONCURSO);
                    dados.resultado = json.resultado.resultado.split("-");
                    dados.resultado2 = [];
                    dados.valorApostaMinima = 3.50;   // hardcode - mudar quando tiver a nova API
                    break;

                case "LOTOFACIL":
                    break;

                default:
                    break;
            }


            retJson.push(dados);

            /*
                        var info = {};
                        info.modalidade = key;
                        info.concurso = json.concurso;   // concurso atual
                        info.concurso_prox = info.concurso + 1;
                        console.log(info);
            */
        }

        break;  // remover

    }

    console.log(retJson);
    return retJson;
}

/* 
    esta função cria uma estrutura de dados
    para guardar os resultados, a partir 
    dos dados retornados da API destaque
*/
async function criaDados() {
    var json = "";
    var dest = [];

    try {
        json = await pegaDestaques();
        if (json == "") {
            logger.log('error', 'criaHTML erro ao acessar API destaques')
        }
    } catch (err) {
        if (err.message) {
            logger.log('error', 'criaHTML abortado, erro na chamada da API de destaques: ' + err.message)
        } else {
            errStr = JSON.stringify(err);
            logger.log('error', 'criaHTML abortado, erro na chamada da API de destaques: ' + errStr);
        }
    }

    if (json != "") {
        for (i = 0; i < json.payload.length; i++) {
            var dados = {};
            dados.modalidade = json.payload[i].modalidade;
            dados.descricao = json.payload[i].modalidadeDetalhada.descricao;
            dados.descricaoEspecial = json.payload[i].modalidadeDetalhada.descricaoEspecial;
            dados.tipoConcurso = "";
            dados.concursoUltimo = "";
            dados.concursoProximo = "";
            dados.acumulou = "";
            dados.dataUltimo = "";
            dados.dataHoraSorteio = json.payload[i].dataHoraSorteio;
            dados.resultado = "";
            dados.resultado2 = "";
            dados.valorApostaMinima = json.payload[i].valorApostaMinima;
            dest.push(dados);
        }
    }

    return dest;
}

async function pegaDestaques() {
    let options = {
        headers: config.apiDestaque.headers,
        uri: config.apiDestaque.uri,
        method: config.apiDestaque.method
    };
    return new Promise((resolve, reject) => {
        request.get(options, (err, response, body) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    });
}
