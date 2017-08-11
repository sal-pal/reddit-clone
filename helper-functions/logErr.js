const winston = require('winston');




module.exports = function(msg) {
    winston.add(winston.transports.File, { filename: 'log.txt' });
    winston.level = 'error';
    winston.log('error', msg)
}