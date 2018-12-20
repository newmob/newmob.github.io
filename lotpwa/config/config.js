var configJSON = require('../config.json');
var env = configJSON.env;

// se não tiver a configuração de ambiente definido, assume como produção
if (!env) {
    env = "prod";
}

console.log(env);
console.log(configJSON.dev.apiDestaque.endPoint);
console.log(configJSON.templates.MEGA_SENA);

var config = {};
config.apiDestaque = {};
config.apiConferirBilhete = {};
config.templates = {};
config.errors = {};

module.exports = config;

