var logger = require('./config/logger');
logger.log('info', 'Testando a aplicação');



var app = require('./config/custom-express')();
var destaques = require('./controllers/destaques');


var config = require('./config/config');

//console.log(config);
destaques.criaHTML(config);

