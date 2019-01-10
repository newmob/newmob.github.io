// cria variavel global com o caminho raiz da aplicacao
global.appDir = process.mainModule.paths[0].split('node_modules')[0].slice(0, -1);

// log
var logger = require('./config/logger');

// todo: gravar arquivo de log


// custom express
var app = require('./config/custom-express')();
var destaques = require('./controllers/destaques');

// config
var config = require('./config/config');

// se não há erros na configuração, processa os arquivos
if (!process.exitCode) {
    destaques.criaHTML(config);
}
