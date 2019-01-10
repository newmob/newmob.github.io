// cria variaveis globais com os caminhos utilizados pela aplicacao
global.dir_root = process.mainModule.paths[0].split('node_modules')[0].slice(0, -1);
global.dir_config = global.dir_root + "/config";
global.dir_html = global.dir_root + "/html";
global.dir_log = global.dir_root + "/log";
global.dir_views = global.dir_root + "/views";

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
