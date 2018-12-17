// var app = require('./config/custom-express')();

// app.listen(3000, function(){
//   console.log("Servidor rodando!");
// });

var Request = require("request");
var RestService = require("./controllers/restservice");
let restDestaque = new RestService( "get",
                                    "http://df7390sr029.corp.caixa.gov.br:8280/silce-servico-rest/rest",
                                   "/v1/parametros-simulacao/destaque/","");

let header = {
                headers: {
                    'Disable-Crypto': 'true',
                    'Content-Type': 'application/json'
                },
                uri: restDestaque.url(),
                method: restDestaque.getMethod()
            };


console.log("Acessando endPoint: " + restDestaque.url());

Request.get(header, 
    (error, response, body) => {
    if(error) {
        return console.dir(error);
    }

    const info = JSON.parse(body);

    console.log(info.versao);
    for (i=0; i < info.payload.length; i++) {
        console.log(info.payload[i].modalidade);
    }

    console.log(info.payload[0]);

    //console.log(JSON.parse(body));
    //console.dir(JSON.parse(body));
});

