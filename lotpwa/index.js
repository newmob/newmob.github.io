// 11/01/2019 - Ideia de mudança
// A ideia da implementação atual é carregar os dados das APIs
// e gerar blocos estáticos de HTML com os resultados.
// prós:
//     1 - minimiza as chamadas para as APIs
//     2 - segurança, pois não tem chamada de APIs no app
// contras:
//     1 - Essa implementação dificulta a opção de exibir 
//         resultados de concursos passados.
//
// ALTERNATIVA 1
// Repensar a solução, trocando a geração de html estático
// por gerar arquivos JSON estáticos com os resultados dos
// concursos, e assim a página faria o parsing desses JSONs
// para renderizar no client a página.
// prós:
//     1 - resolve o problema dos concursos anteriores
//     2 - continua minimizando o acesso às APIs
// contras:
//     1 - deixa acesso aos arquivos JSON, que podem ser
//         utilizados para ferramentas externas
//
// ALTERNATIVA 2
// Utilizar uma solução de cache no NodeJS, como o REDIS
// ou o Memcached.
// Redis - performance
// MongoDB - flexibilidade


// cria variaveis globais com os caminhos utilizados pela aplicacao
global.dir_root = process.mainModule.paths[0].split('node_modules')[0].slice(0, -1);
global.dir_config = global.dir_root + "/config";
global.dir_html = global.dir_root + "/html";
global.dir_log = global.dir_root + "/log";
global.dir_views = global.dir_root + "/views";
global.dir_ssl = global.dir_root + "/ssl";

// log
var logger = require('./config/logger');

// todo: gravar arquivo de log


// custom express
var app = require('./config/custom-express')();
var destaques = require('./controllers/destaques');

// se não há erros na configuração, processa os arquivos
if (!process.exitCode) {
    destaques.criaHTML();
}
