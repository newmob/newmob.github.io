var configJSON = require('../config.json');
var env = configJSON.env;

// se não tiver a configuração de ambiente definido, assume como produção
if (!env) {
    env = "prod";
}

var config = {};
config.env = env;
config.apiDestaque = {};
config.apiConferirBilhete = {};
config.templates = {};
config.errors = [];

if (env == "prod") {
    try {
        config.apiDestaque = configJSON.prod.apiDestaque;
        config.apiConferirBilhete = configJSON.prod.apiConferirBilhete;
    } catch(err) {
        config.errors.push("Erros na configuração das APIs de <prod>");
    }
} else {
    try {
        config.apiDestaque = configJSON.dev.apiDestaque;
        config.apiConferirBilhete = configJSON.dev.apiConferirBilhete;
    } catch(err) {
        config.errors.push("Erros na configuração das APIs de <dev>");
    }
}

// remove, se houver, a barra do final dos endPoints
if (config.apiDestaque.endPoint.endsWith("/")) {
    config.apiDestaque.endPoint = config.apiDestaque.endPoint.slice(0,-1);
} 

if (config.apiConferirBilhete.endPoint.endsWith("/")) {
    config.apiConferirBilhete.endPoint = config.apiConferirBilhete.endPoint.slice(0,-1);
} 

// acrescenta, se não houver, uma barra no início do resource
if (!config.apiDestaque.resource.startsWith("/")) {
    config.apiDestaque.resource = "/" + config.apiDestaque.resource;
} 

if (!config.apiConferirBilhete.resource.startsWith("/")) {
    config.apiConferirBilhete.resource = "/" + config.apiConferirBilhete.resource.slice(0,-1);
} 

// define as propriedades uri
config.apiDestaque.uri = config.apiDestaque.endPoint + config.apiDestaque.resource;
config.apiConferirBilhete.uri = config.apiConferirBilhete.endPoint + config.apiConferirBilhete.resource;

// templates
config.templates = configJSON.templates;

// erros


module.exports = config;

