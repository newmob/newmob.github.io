/*
    Caixa - CEDESSP042 - Loterias PWA
    ----------------------------------
    Módulo:     dadosDestaques.js
    Objetivo:   Consolidar dados de loterias provenientes das APIs do SIWLO.
    Obs:        Esse módulo deverá ser modificado para recuperar os dados da API do SISPL (atualmente em construção).
    Autor:      c129426 - Marcelo de Araujo Maximiano
    Data:       14/05/2019
*/
var logger = require('../config/logger');
var request = require("request");
var config = require('../config/config');
var fs = require('fs');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

module.exports = {

    criaJsonDestaques: async function () {
        var refreshToken = "";

        // ----------------------------------------------------------------------------------------------
        // pega o refresh token
        try {
            var tokenAPI = await pegaToken();
            refreshToken = tokenAPI.refresh_token;
        } catch (err) {
            if (err.message) {
                logger.log('error', 'criaJsonDestaques abortado, erro na chamada da API de Token: ' + err.message)
            } else {
                errStr = JSON.stringify(err);
                logger.log('error', 'criaJsonDestaques abortado, erro na chamada da API de Token: ' + errStr);
            }
            return false;
        }

        // atualiza o token no header
        config.apiLoterias.headers.Authorization = `Bearer ${refreshToken}`;
        // ----------------------------------------------------------------------------------------------

        var dados = await criaDados();
        const resultados = await complementaResultados(dados);

        //for (i = 0; i < resultados.length; i++) {
        //    console.log(resultados[i].modalidade + " : " + resultados[i].resultado);
        //}
        //console.log(resultados);
        try {
            fs.writeFileSync(config.jsonDestaques, JSON.stringify(resultados));
            logger.log('info', "criaJsonDestaques arquivo Json gravado com sucesso: '" + config.jsonDestaques + "'");
        } catch (err) {
            logger.log('error', "criaJsonDestaques erro na gravacao do arquivo jSON '" + config.jsonDestaques + "': " + err);
            return false;
        }

        return true;
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

/*
    Paramêtros: 
        loteria : uma constante com a identificação da loteria de acordo com o array config.loterias
        concurso : uma string com o número do concurso. Se não for fornecido, chama a API sem parâmetro,
                   mas por uma característica da API, sempre deve ser passado em branco ("") para forçar
                   o a chamada da API com o parâmetro vazio. Isso porque a API tem um comportamento
                   diferente quando o parâmetro é passado em branco e quando não é passado.
*/
async function pegaResultadoLoteria(loteria, concurso) {
    var param = "";

    if (concurso != undefined) {
        param = "?concurso=" + concurso;
    }

    var options = {
        headers: config.apiLoterias.headers,
        url: config.apiLoterias.uri + "/" + loteria + param,
        method: config.apiLoterias.method,
        //rejectUnauthorized: false, 
        ca: fs.readFileSync(global.dir_ssl + "\\" + 'apicaixagovbr.crt')
    };

    return new Promise((resolve, reject) => {
        request.post(options, (err, response, body) => {
            var jsonBody = JSON.parse(body);

            if (err) {
                //console.log(err);
                return reject(err);
            } else if (jsonBody.erro != undefined) {
                return reject(jsonBody);
            } else {
                resolve(JSON.parse(body));
            }
        })
    });
}

async function complementaResultados(dados) {
    var retJson = [];

    for (i = 0; i < dados.length; i++) {
        let loteria = config.loterias[dados[i].modalidade];
        var json = "";
        var json2 = "";
        //console.log(loteria);

        // pega os dados da api de loterias
        try {
            json = await pegaResultadoLoteria(loteria, "");
            if (json == "") {
                logger.log('error', 'criaJsonDestaques sem resultado de ' + loteria)
            }
            // no caso específico da Lotogol, a API tem que ser chamada 2 vezes,
            // uma passando o parâmetro "concurso=" e outra sem parâmetro.
            if (dados[i].modalidade == "LOTOGOL") {
                json2 = await pegaResultadoLoteria(loteria);
            }
        } catch (err) {
            if (err.message) {
                logger.log('error', 'criaJsonDestaques abortado, erro na chamada da API de loterias (' + loteria + ') :' + err.message)
            } else {
                errStr = JSON.stringify(err);
                logger.log('error', 'criaJsonDestaques abortado, erro na chamada da API de loterias (' + loteria + ') :' + errStr);
            }
        }

        if ((json != "") && (json.resultado != "")) {
            //console.log("-JSON-------------------------------");
            //console.log("json.resultado=" + json.resultado);
            //console.log("------------------------------------");
            try {
                switch (dados[i].modalidade) {
                    case "MEGA_SENA":
                        dados[i].concursoEspecial = getBoolean(json.resultado.IC_CONCURSO_ESPECIAL);
                        dados[i].titulo = (dados[i].concursoEspecial == true ? dados[i].descricaoEspecial : dados[i].descricao);
                        dados[i].concursoUltimo = json.resultado.concurso;
                        dados[i].concursoProximo = parseInt(dados[i].concursoUltimo, 10) + 1;
                        dados[i].acumulado = getBoolean(json.resultado.acumulado);
                        dados[i].valorAcumulado = json.resultado.valor_acumulado.formatMoney();
                        dados[i].valorEstimativa = json.resultado.VR_ESTIMATIVA.formatMoney();
                        dados[i].dataUltimo = new Date(json.resultado.data).formatDateDMY();
                        dados[i].resultado = numerosSorteados(json.resultado.resultado);
                        dados[i].descEstimativa = dados[i].valorEstimativa != "" ? "Prêmio estimado para o concurso <b>" + dados[i].concursoProximo + "</b>" : "Ainda sem estimativa de prêmio";
                        dados[i].dataHoraSorteio = mergeDataHora(json.resultado.DT_PROXIMO_CONCURSO, dados[i].dataHoraSorteio);
                        dados[i].valorArrecadado = json.resultado.VR_ARRECADADO.formatMoney();
                        dados[i].localSorteio = json.resultado.de_local_sorteio + " em " + json.resultado.no_cidade + ", " + json.resultado.sg_uf;
                        // ganhadores
                        ganhadores = [];
                        ganhadores[0] = ["Sena - 6 números acertados", ganhadoresStr(json.resultado.ganhadores, json.resultado.valor)];
                        ganhadores[1] = ["Quina - 5 números acertados", ganhadoresStr(json.resultado.ganhadores_quina, json.resultado.valor_quina)];
                        ganhadores[2] = ["Quadra - 4 números acertados", ganhadoresStr(json.resultado.ganhadores_quadra, json.resultado.valor_quadra)];
                        dados[i].ganhadores = ganhadores;
                        //console.log(dados[i]);
                        break;

                    case "LOTOFACIL":
                        dados[i].concursoEspecial = getBoolean(json.resultado.IC_CONCURSO_ESPECIAL);
                        dados[i].titulo = (dados[i].concursoEspecial == true ? dados[i].descricaoEspecial : dados[i].descricao);
                        dados[i].concursoUltimo = json.resultado.nu_concurso;
                        dados[i].concursoProximo = parseInt(dados[i].concursoUltimo, 10) + 1;
                        dados[i].valorAcumulado = json.resultado.vr_acumulado_faixa1.formatMoney();
                        dados[i].valorAcumulado2 = json.resultado.vr_acumulado_faixa2.formatMoney();
                        dados[i].acumulado = (dados[i].valorAcumulado == "" ? false : true);
                        dados[i].valorEstimativa = json.resultado.VR_ESTIMATIVA.formatMoney();
                        dados[i].dataUltimo = new Date(json.resultado.dt_apuracao).formatDateDMY();
                        dados[i].resultado = numerosSorteados(json.resultado.de_resultado);
                        dados[i].descEstimativa = dados[i].valorEstimativa != "" ? "Prêmio estimado para o concurso <b>" + dados[i].concursoProximo + "</b>" : "Ainda sem estimativa de prêmio";
                        dados[i].dataHoraSorteio = mergeDataHora(json.resultado.DT_PROXIMO_CONCURSO, dados[i].dataHoraSorteio);
                        dados[i].valorArrecadado = json.resultado.VR_ARRECADADO.formatMoney();
                        dados[i].localSorteio = json.resultado.de_local_sorteio + " em " + json.resultado.no_cidade + ", " + json.resultado.sg_uf;
                        // ganhadores
                        ganhadores = [];
                        ganhadores[0] = ["15 acertos", ganhadoresStr(json.resultado.qt_ganhador_faixa1, json.resultado.vr_rateio_faixa1)];
                        ganhadores[1] = ["14 acertos", ganhadoresStr(json.resultado.qt_ganhador_faixa2, json.resultado.vr_rateio_faixa2)];
                        ganhadores[2] = ["13 acertos", ganhadoresStr(json.resultado.qt_ganhador_faixa3, "")];
                        ganhadores[3] = ["12 acertos", ganhadoresStr(json.resultado.qt_ganhador_faixa4, "")];
                        ganhadores[4] = ["11 acertos", ganhadoresStr(json.resultado.qt_ganhador_faixa5, "")];
                        dados[i].ganhadores = ganhadores;
                        //console.log(dados[i].ganhadores);
                        break;

                    case "QUINA":
                        dados[i].concursoEspecial = getBoolean(json.resultado.IC_CONCURSO_ESPECIAL);
                        dados[i].titulo = (dados[i].concursoEspecial == true ? dados[i].descricaoEspecial : dados[i].descricao);
                        dados[i].concursoUltimo = json.resultado.concurso;
                        dados[i].concursoProximo = parseInt(dados[i].concursoUltimo, 10) + 1;
                        dados[i].acumulado = getBoolean(json.resultado.acumulado);
                        dados[i].valorAcumulado = json.resultado.valor_acumulado.formatMoney();
                        dados[i].valorEstimativa = json.resultado.VR_ESTIMATIVA.formatMoney();
                        dados[i].dataUltimo = new Date(json.resultado.data).formatDateDMY();
                        dados[i].resultado = numerosSorteados(json.resultado.resultado);
                        dados[i].descEstimativa = dados[i].valorEstimativa != "" ? "Prêmio estimado para o concurso <b>" + dados[i].concursoProximo + "</b>" : "Ainda sem estimativa de prêmio";
                        dados[i].dataHoraSorteio = mergeDataHora(json.resultado.DT_PROXIMO_CONCURSO, dados[i].dataHoraSorteio);
                        dados[i].valorArrecadado = json.resultado.VR_ARRECADADO.formatMoney();
                        dados[i].localSorteio = json.resultado.de_local_sorteio + " em " + json.resultado.no_cidade + ", " + json.resultado.sg_uf;
                        // ganhadores
                        ganhadores = [];
                        ganhadores[0] = ["Quina - 5 números acertados", ganhadoresStr(json.resultado.ganhadores, json.resultado.valor)];
                        ganhadores[1] = ["Quadra - 4 números acertados", ganhadoresStr(json.resultado.ganhadores_quadra, json.resultado.valor_quadra)];
                        ganhadores[2] = ["Terno - 3 números acertados", ganhadoresStr(json.resultado.ganhadores_terno, json.resultado.valor_terno)];
                        ganhadores[3] = ["Duque - 2 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_DUQUE, json.resultado.VR_RATEIO_DUQUE)];
                        dados[i].ganhadores = ganhadores;
                        //console.log(dados[i].ganhadores);
                        break;

                    case "LOTOMANIA":
                        dados[i].titulo = (dados[i].concursoEspecial == true ? dados[i].descricaoEspecial : dados[i].descricao);
                        dados[i].concursoUltimo = json.resultado.co_concurso;
                        dados[i].concursoProximo = parseInt(dados[i].concursoUltimo, 10) + 1;
                        dados[i].valorAcumulado = json.resultado.vr_acumulado_faixa1.formatMoney();
                        dados[i].valorAcumulado2 = json.resultado.vr_acumulado_faixa2.formatMoney();
                        dados[i].acumulado = (dados[i].valorAcumulado == "" ? false : true);
                        dados[i].valorEstimativa = json.resultado.VR_ESTIMATIVA.formatMoney();
                        dados[i].dataUltimo = new Date(json.resultado.dt_apuracao).formatDateDMY();
                        dados[i].resultado = numerosSorteados(json.resultado.de_resultado);
                        dados[i].descEstimativa = dados[i].valorEstimativa != "" ? "Prêmio estimado para o concurso <b>" + dados[i].concursoProximo + "</b>" : "Ainda sem estimativa de prêmio";
                        dados[i].dataHoraSorteio = mergeDataHora(json.resultado.DT_PROXIMO_CONCURSO, dados[i].dataHoraSorteio);
                        dados[i].valorArrecadado = json.resultado.VR_ARRECADADO.formatMoney();
                        dados[i].localSorteio = json.resultado.de_local_sorteio + " em " + json.resultado.no_cidade + ", " + json.resultado.sg_uf;
                        // ganhadores
                        ganhadores = [];
                        ganhadores[0] = ["20 números acertados", ganhadoresStr(json.resultado.qt_ganhadores_faixa1, json.resultado.vr_rateio_faixa1)];
                        ganhadores[1] = ["19 números acertados", ganhadoresStr(json.resultado.qt_ganhadores_faixa2, json.resultado.vr_rateio_faixa2)];
                        ganhadores[2] = ["18 números acertados", ganhadoresStr(json.resultado.qt_ganhadores_faixa3, json.resultado.vr_rateio_faixa3)];
                        ganhadores[3] = ["17 números acertados", ganhadoresStr(json.resultado.qt_ganhadores_faixa4, json.resultado.vr_rateio_faixa4)];
                        ganhadores[4] = ["16 números acertados", ganhadoresStr(json.resultado.qt_ganhadores_faixa5, json.resultado.vr_rateio_faixa5)];
                        ganhadores[5] = ["15 números acertados", ganhadoresStr(json.resultado.QT_GANHADORES_FAIXA7, json.resultado.VR_RATEIO_FAIXA7)];
                        ganhadores[6] = ["0 acertos", ganhadoresStr(json.resultado.qt_ganhadores_faixa6, json.resultado.vr_rateio_faixa6)];
                        dados[i].ganhadores = ganhadores;
                        //console.log(dados[i].ganhadores);
                        break;

                    case "TIMEMANIA":
                        dados[i].titulo = (dados[i].concursoEspecial == true ? dados[i].descricaoEspecial : dados[i].descricao);
                        dados[i].concursoUltimo = json.resultado.NU_CONCURSO;
                        dados[i].concursoProximo = parseInt(dados[i].concursoUltimo, 10) + 1;
                        dados[i].valorAcumulado = json.resultado.VR_ACUMULADO_FAIXA_1.formatMoney();
                        dados[i].valorAcumulado2 = json.resultado.VR_ACUMULADO_FAIXA_2.formatMoney();
                        dados[i].acumulado = (dados[i].valorAcumulado == "" ? false : true);
                        dados[i].valorEstimativa = json.resultado.VR_ESTIMATIVA_FAIXA_1.formatMoney();
                        dados[i].dataUltimo = new Date(json.resultado.DT_APURACAO).formatDateDMY();
                        dados[i].resultado = numerosSorteados(json.resultado.DE_RESULTADO);
                        dados[i].descEstimativa = dados[i].valorEstimativa != "" ? "Prêmio estimado para o concurso <b>" + dados[i].concursoProximo + "</b>" : "Ainda sem estimativa de prêmio";
                        dados[i].dataHoraSorteio = mergeDataHora(json.resultado.DT_PROXIMO_CONCURSO, dados[i].dataHoraSorteio);
                        dados[i].valorArrecadado = json.resultado.VR_ARRECADADO.formatMoney();
                        dados[i].localSorteio = json.resultado.DE_LOCAL_SORTEIO + " em " + json.resultado.NO_CIDADE + ", " + json.resultado.SG_UF;
                        dados[i].timeCoracao = (config.times[json.resultado.CO_TIME_CORACAO] != "undefined" ? config.times[json.resultado.CO_TIME_CORACAO] : "");
                        // // ganhadores
                        ganhadores = [];
                        ganhadores[0] = ["7 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_FAIXA_1, json.resultado.VR_RATEIO_FAIXA_1)];
                        ganhadores[1] = ["6 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_FAIXA_2, json.resultado.VR_RATEIO_FAIXA_2)];
                        ganhadores[2] = ["5 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_FAIXA_3, json.resultado.VR_RATEIO_FAIXA_3)];
                        ganhadores[3] = ["4 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_FAIXA_4, json.resultado.VR_RATEIO_FAIXA_4)];
                        ganhadores[4] = ["3 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_FAIXA_5, json.resultado.VR_RATEIO_FAIXA_5)];
                        dados[i].ganhadores = ganhadores;
                        //console.log(dados[i].ganhadores);

                        break;

                    case "DUPLA_SENA":
                        dados[i].concursoEspecial = getBoolean(json.resultado.IC_CONCURSO_ESPECIAL);
                        dados[i].titulo = (dados[i].concursoEspecial == true ? dados[i].descricaoEspecial : dados[i].descricao);
                        dados[i].concursoUltimo = json.resultado.concurso;
                        dados[i].concursoProximo = parseInt(dados[i].concursoUltimo, 10) + 1;
                        dados[i].acumulado = getBoolean(json.resultado.acumulado_sena1);
                        dados[i].valorAcumulado = json.resultado.valor_acumulado_sena1.formatMoney();
                        dados[i].valorEstimativa = json.resultado.VALOR_ESTIMATIVA.formatMoney();
                        dados[i].dataUltimo = new Date(json.resultado.data).formatDateDMY();
                        dados[i].resultado = numerosSorteados(json.resultado.resultado_sorteio1);
                        dados[i].resultado2 = numerosSorteados(json.resultado.resultado_sorteio2);
                        dados[i].descEstimativa = dados[i].valorEstimativa != "" ? "Prêmio estimado para o concurso <b>" + dados[i].concursoProximo + "</b>" : "Ainda sem estimativa de prêmio";
                        dados[i].dataHoraSorteio = mergeDataHora(json.resultado.DATA_PROXIMO_CONCURSO, dados[i].dataHoraSorteio);
                        dados[i].valorArrecadado = json.resultado.VR_ARRECADADO.formatMoney();
                        dados[i].localSorteio = json.resultado.de_local_sorteio + " em " + json.resultado.no_cidade + ", " + json.resultado.sg_uf;
                        // ganhadores Faixa 1
                        ganhadores = [];
                        ganhadores[0] = ["Sena - 6 números acertados", ganhadoresStr(json.resultado.ganhadores_sena1, json.resultado.valor_sena1)];
                        ganhadores[1] = ["Quina - 5 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_QUINA_FAIXA1, json.resultado.VR_QUINA_FAIXA1)];
                        ganhadores[2] = ["Quadra - 4 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_QUADRA_FAIXA1, json.resultado.VR_QUADRA_FAIXA1)];
                        ganhadores[3] = ["Terno - 3 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_TERNO_FAIXA1, json.resultado.VR_TERNO_FAIXA1)];
                        dados[i].ganhadores = ganhadores;
                        // ganhadores Faixa 2
                        ganhadores = [];
                        ganhadores[0] = ["Sena - 6 números acertados", ganhadoresStr(json.resultado.ganhadores_sena2, json.resultado.valor_sena2)];
                        ganhadores[1] = ["Quina - 5 números acertados", ganhadoresStr(json.resultado.ganhadores_quina2, json.resultado.valor_quina2)];
                        ganhadores[2] = ["Quadra - 4 números acertados", ganhadoresStr(json.resultado.ganhadores_quadra2, json.resultado.valor_quadra2)];
                        ganhadores[3] = ["Terno - 3 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_TERNO_FAIXA2, json.resultado.VR_TERNO_FAIXA2)];
                        dados[i].ganhadores2 = ganhadores;
                        //console.log(dados[i]);
                        break;

                    case "LOTECA":
                        dados[i].titulo = (dados[i].concursoEspecial == true ? dados[i].descricaoEspecial : dados[i].descricao);
                        dados[i].concursoUltimo = json.resultado.co_concurso;
                        dados[i].concursoProximo = parseInt(dados[i].concursoUltimo, 10) + 1;
                        dados[i].valorAcumulado = json.resultado.vr_concurso_acumulado.formatMoney();
                        dados[i].acumulado = (dados[i].valorAcumulado == "" ? false : true);
                        dados[i].valorEstimativa = json.resultado.VR_ESTIMATIVA.formatMoney();
                        dados[i].dataUltimo = new Date(json.resultado.dt_apuracao).formatDateDMY();
                        dados[i].resultado = [];
                        dados[i].descEstimativa = dados[i].valorEstimativa != "" ? "Prêmio estimado para o concurso <b>" + dados[i].concursoProximo + "</b>" : "Ainda sem estimativa de prêmio";
                        dados[i].dataHoraSorteio = mergeDataHora(json.resultado.DT_PROXIMO_CONCURSO, dados[i].dataHoraSorteio);
                        dados[i].valorArrecadado = json.resultado.VR_ARRECADADO.formatMoney();
                        dados[i].observacao = json.resultado.de_observacao;
                        // // // ganhadores
                        ganhadores = [];
                        ganhadores[0] = ["1º (14 acertos)", ganhadoresStr(json.resultado.qt_ganhador_faixa1, json.resultado.vr_rateio_faixa1)];
                        ganhadores[1] = ["2º (13 acertos)", ganhadoresStr(json.resultado.qt_ganhador_faixa2, json.resultado.vr_rateio_faixa2)];
                        dados[i].ganhadores = ganhadores;
                        //console.log(dados[i]);

                        break;

                    case "LOTOGOL":
                        dados[i].titulo = (dados[i].concursoEspecial == true ? dados[i].descricaoEspecial : dados[i].descricao);
                        dados[i].concursoUltimo = json.resultado.CO_CONCURSO;
                        dados[i].concursoProximo = parseInt(dados[i].concursoUltimo, 10) + 1;
                        dados[i].valorAcumulado = json2.resultado.vr_acumulado_faixa1.formatMoney();
                        dados[i].acumulado = (dados[i].valorAcumulado == "" ? false : true);
                        dados[i].valorEstimativa = json2.resultado.vr_estimativa.formatMoney();
                        dados[i].dataUltimo = new Date(json.resultado.dt_apuracao).formatDateDMY();
                        dados[i].resultado = [];
                        dados[i].descEstimativa = dados[i].valorEstimativa != "" ? "Prêmio estimado para o concurso <b>" + dados[i].concursoProximo + "</b>" : "Ainda sem estimativa de prêmio";
                        dados[i].dataHoraSorteio = mergeDataHora(dados[i].dataHoraSorteio, dados[i].dataHoraSorteio);
                        // ganhadores
                        ganhadores = [];
                        //ganhadores[0] = ["1º (5 acertos)", ganhadoresStr(json.resultado.QT_GANHADOR_FAIXA1, "")];
                        dados[i].ganhadores = ganhadores;
                        //console.log(dados[i]);

                        break;

                    case "DIA_DE_SORTE":
                        dados[i].concursoEspecial = getBoolean(json.resultado.IC_CONCURSO_ESPECIAL);
                        dados[i].titulo = (dados[i].concursoEspecial == true ? dados[i].descricaoEspecial : dados[i].descricao);
                        dados[i].concursoUltimo = json.resultado.NU_CONCURSO;
                        dados[i].concursoProximo = parseInt(dados[i].concursoUltimo, 10) + 1;
                        dados[i].valorAcumulado = json.resultado.VR_ACUMULADO_FAIXA_1.formatMoney();
                        dados[i].acumulado = (dados[i].valorAcumulado == "" ? false : true);
                        dados[i].valorEstimativa = json.resultado.VR_ESTIMATIVA_PREMIO_FAIXA_1.formatMoney();
                        dados[i].dataUltimo = new Date(json.resultado.DT_APURACAO_SORTEIO).formatDateDMY();
                        dados[i].resultado = numerosSorteados(json.resultado.DE_DEZENA_SORTEADA);
                        dados[i].descEstimativa = dados[i].valorEstimativa != "" ? "Prêmio estimado para o concurso <b>" + dados[i].concursoProximo + "</b>" : "Ainda sem estimativa de prêmio";
                        dados[i].dataHoraSorteio = mergeDataHora(json.resultado.DT_PROXIMO_CONCURSO, dados[i].dataHoraSorteio);
                        dados[i].valorArrecadado = json.resultado.VR_ARRECADADO.formatMoney();
                        dados[i].localSorteio = json.resultado.DE_LOCAL_SORTEIO + " em " + json.resultado.NO_CIDADE_LOCAL_SORTEIO + ", " + json.resultado.SG_UF_LOCAL_SORTEIO;
                        dados[i].mesDaSorte = (config.meses[json.resultado.NU_MES_SORTE] != "undefined" ? config.meses[json.resultado.NU_MES_SORTE] : "");
                        dados[i].observacao = json.resultado.DE_OBSERVACAO;
                        // ganhadores
                        ganhadores = [];
                        ganhadores[0] = ["7 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_FAIXA_1, json.resultado.VR_RATEIO_FAIXA_1)];
                        ganhadores[1] = ["6 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_FAIXA_2, json.resultado.VR_RATEIO_FAIXA_2)];
                        ganhadores[2] = ["5 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_FAIXA_3, json.resultado.VR_RATEIO_FAIXA_3)];
                        ganhadores[3] = ["4 números acertados", ganhadoresStr(json.resultado.QT_GANHADOR_FAIXA_4, json.resultado.VR_RATEIO_FAIXA_4)];
                        ganhadores[4] = ["Mês da sorte - " + dados[i].mesDaSorte, ganhadoresStr(json.resultado.QT_GANHADOR_MES_SORTE, json.resultado.VR_RATEIO_MES_SORTE)];
                        dados[i].ganhadores = ganhadores;
                        //console.log(dados[i]);
                        break;

                    default:
                        break;
                } // switch
            } catch (err) {
                if (err.message) {
                    logger.log('error', 'criaJsonDestaques abortado, erro na chamada da API de loterias (' + dados[i].modalidade + '): ' + err.message)
                } else {
                    errStr = JSON.stringify(err);
                    logger.log('error', 'criaJsonDestaques abortado, erro na chamada da API de loterias (' + dados[i].modalidade + '): ' + errStr);
                }
            }
        } // if
    } // for

    return dados;
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
            logger.log('error', 'criaJsonDestaques erro ao acessar API destaques')
        }
    } catch (err) {
        if (err.message) {
            logger.log('error', 'criaJsonDestaques abortado, erro na chamada da API de destaques: ' + err.message)
        } else {
            errStr = JSON.stringify(err);
            logger.log('error', 'criaJsonDestaques abortado, erro na chamada da API de destaques: ' + errStr);
        }
    }

    if (json != "") {
        for (i = 0; i < json.payload.length; i++) {
            var dados = {};
            dados.modalidade = json.payload[i].modalidade;
            dados.descricao = json.payload[i].modalidadeDetalhada.descricao;
            dados.descricaoEspecial = json.payload[i].modalidadeDetalhada.descricaoEspecial;
            dados.dataHoraSorteio = json.payload[i].dataHoraSorteio;
            dados.valorApostaMinima = json.payload[i].valorApostaMinima.formatMoney();
            dados.concursoEspecial = (json.payload[i].tipoConcurso == "NORMAL" ? false : true);
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
                //console.log(err);
                return reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    });
}

Object.prototype.formatMoney = function () {
    number = this.valueOf();

    if ((isNaN(number) == false) && (number != "")) {   // se for um número válido
        number = parseFloat(number);

        if (number != 0) {
            retStr = number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
            const p_colon = retStr.indexOf(",");
            const p_period = retStr.indexOf(".");

            if (p_period > p_colon) {
                retStr = retStr.replace(/\./g, "#");
                retStr = retStr.replace(/\,/g, '.')
                retStr = retStr.replace(/\#/g, ',')
            }
        } else {
            retStr = "";
        }
    } else {
        retStr = "";
    }

    return retStr;
};

Object.prototype.formatDateDMY = function () {
    date = new Date(this);
    var strArray = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + ' ' + m + ' ' + y;
}


function mergeDataHora(dt, hr) {
    hr = "01/01/2000 " + hr.slice(-8);
    var data = new Date();
    var d1 = new Date(dt);
    var d2 = new Date(hr);
    // cria uma data/hora pegando a data que veio da API de resultados
    // e a hora da API de destaques
    data.setDate(d1.getDate());
    data.setMonth(d1.getMonth());
    data.setFullYear(d1.getFullYear());
    data.setHours(d2.getHours());
    data.setMinutes(d2.getMinutes());
    data.setSeconds(d2.getSeconds());

    return data;
}

function ganhadoresStr(num, valor) {
    var retStr = "";

    if (num > 0) {
        if (valor != '') {
            retStr = num + (num > 1 ? " apostas ganhadoras, " : " aposta ganhadora, ") + valor.formatMoney();
        } else {
            retStr = num + (num > 1 ? " apostas ganhadoras" : " aposta ganhadora");
        }
    } else {
        retStr = "Não houve acertador";
    }

    return retStr;
}

function getBoolean(value) {
    switch (value) {
        case true:
        case "true":
        case "TRUE":
        case "True":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}

function numerosSorteados(numerosStr) {
    numerosStr = numerosStr.replace(/ /g, '');
    numArr = numerosStr.split("-").sort();
    return numArr;
}