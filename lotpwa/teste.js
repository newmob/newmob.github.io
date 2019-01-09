const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [   new winston.transports.Console(),
        new winston.transports.File({ filename: `app.log` })],
});


/*
let logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [   new winston.transports.Console(),
                    new winston.transports.File({ filename: 'marcelo.log' })]
});
*/


logger.info('message content', { "context": "index.js", "metric": 1 })
logger.info('message content 2')
logger.log('error', '@@@@@@@@teste de log');



module.exports = logger;
