var configJSON = require('../config.json');
var env = configJSON.env;

console.log('\x1b[36m%s\x1b[0m', "Caixa - CEDESSP / Loterias");

// se não tiver a configuração de ambiente definido, assume como produção
if (!env) {
    env = "prod";
}

var config = {};
config.env = env;
config.apiDestaque = {};
config.apiConferirBilhete = {};
config.apiAccessToken = {};
config.templates = {};
config.errors = [];

if (env == "prod") {
    try {
        config.apiDestaque = configJSON.prod.apiDestaque;
        config.apiConferirBilhete = configJSON.prod.apiConferirBilhete;
        config.apiAccessToken = configJSON.prod.apiAccessToken;
    } catch (err) {
        config.errors.push("Erros na configuração das APIs de <prod>");
    }
} else {
    try {
        config.apiDestaque = configJSON.dev.apiDestaque;
        config.apiConferirBilhete = configJSON.dev.apiConferirBilhete;
        config.apiAccessToken = configJSON.dev.apiAccessToken;
    } catch (err) {
        config.errors.push("Erros na configuração das APIs de <dev>");
    }
}

// verifica as APIs 
if (!config.apiDestaque) config.errors.push("apiDestaque não configurada");
if (!config.apiConferirBilhete) config.errors.push("apiConferirBilhete não configurada");
if (!config.apiAccessToken) config.errors.push("apiAccessToken não configurada");

// se houver erros de configuração, aborta a execução
if (config.errors.length == 0) {

    // remove, se houver, a barra do final dos endPoints
    if (config.apiDestaque.endPoint.endsWith("/")) {
        config.apiDestaque.endPoint = config.apiDestaque.endPoint.slice(0, -1);
    }

    if (config.apiConferirBilhete.endPoint.endsWith("/")) {
        config.apiConferirBilhete.endPoint = config.apiConferirBilhete.endPoint.slice(0, -1);
    }

    if (config.apiAccessToken.endPoint.endsWith("/")) {
        config.apiAccessToken.endPoint = config.apiAccessToken.endPoint.slice(0, -1);
    }

    // acrescenta, se não houver, uma barra no início do resource
    if (!config.apiDestaque.resource.startsWith("/")) {
        config.apiDestaque.resource = "/" + config.apiDestaque.resource;
    }

    if (!config.apiConferirBilhete.resource.startsWith("/")) {
        config.apiConferirBilhete.resource = "/" + config.apiConferirBilhete.resource.slice(0, -1);
    }

    if (!config.apiAccessToken.resource.startsWith("/")) {
        config.apiAccessToken.resource = "/" + config.apiAccessToken.resource.slice(0, -1);
    }

    // define as propriedades uri
    config.apiDestaque.uri = config.apiDestaque.endPoint + config.apiDestaque.resource;
    config.apiConferirBilhete.uri = config.apiConferirBilhete.endPoint + config.apiConferirBilhete.resource;
    config.apiAccessToken.uri = config.apiAccessToken.endPoint + config.apiAccessToken.resource;
}

// templates
config.templates = configJSON.templates;
if (!config.templates) config.errors.push("templates HTML não configurados");

for (var key in config.templates) {
    let value = config.templates[key];
    if (!fileExists(value)) {
        config.errors.push("template " + key + ": arquivo não encontrado '" + value + "'");
    }
}

// erros
// se houver erros de configuração, aborta a execução
if (config.errors.length > 0) {
    console.log("\x1b[33m", "Erros: verifique o arquivo de configuração 'config.json'");
    for (var err of config.errors) {
        console.log("\x1b[31m", " - " + err)
    }
    console.log("\x1b[0m");
    process.exit(1);
}

function fileExists(fn) {
    const fs = require('fs')
    var ret = false;

    const path = fn;

    try {
        if (fs.existsSync(path)) {
            ret = true;
        }
    } catch (err) {
        ret = false;
    }

    return ret;
}

module.exports = config;

