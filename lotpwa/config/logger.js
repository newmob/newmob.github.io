const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.printf(info => {
            return `${info.timestamp}\t${info.level}:\t${info.message}`;
        })
    ),
    transports: [   new winston.transports.File({ filename: global.dir_log + '/lotpwa.log', options: {flags: 'a+', encoding: 'utf8', mode: 0644} }),
                    new winston.transports.Console()
    ]
});

module.exports = logger;
