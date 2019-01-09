// cria variavel global com o caminho raiz da aplicacao
global.appDir = process.mainModule.paths[0].split('node_modules')[0].slice(0, -1);

// log
//var logger = require('./config/logger');

const log4js = require('log4js');
log4js.configure('./config/log4js.json');
const logger = log4js.getLogger('default');

logger.error('Express server listening on port');

// todo: gravar arquivo de log




process.exit(1);

// custom express
var app = require('./config/custom-express')();
var destaques = require('./controllers/destaques');

// config
var config = require('./config/config');

//console.log(config);
destaques.criaHTML(config);

