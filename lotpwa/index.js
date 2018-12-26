var app = require('./config/custom-express')();
var destaques = require('./controllers/destaques');


var config = require('./config/config');

//console.log(config);
destaques.criaHTML(config);

console.log("templates--->");
console.log(config.templates["MEGA_SENA"]);
