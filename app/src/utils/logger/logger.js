const winston = require('winston');
/*
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MMM-YYYY HH:mm:ss',
    }),
    winston.format.printf(
      info =>
        `{"datetime":${[info.timestamp]}, "level": ${info.level}, "message": ${
          info.message
        }}`,
    ),
  ),
  transports: [
    new winston.transports.File({ filename: './logs/combined.log' }), ],
});
*/


const { createLogger, format, transports } = require('winston');

// Função para aplicar formatação com base no nível
const logFormat = format.combine(
  format.timestamp({
    format: 'DD-MMM-YYYY HH:mm:ss',
  }),
  format.printf(({ timestamp, level, message }) => {
    switch (level) {
      case 'error':
        return  `{"datetime":${[timestamp]}, "level": ERROR, "message": ${
          message
        }}`
      case 'warn':
        return  `{"datetime":${[timestamp]}, "level": WARN, "message": ${
          message
        }}`
      case 'info':
        return  `{"datetime":${[timestamp]}, "level": INFO, "message": ${
          message
        }}`
      case 'http':
        return  `{"datetime":${[timestamp]}, "level": HTTP, "message": ${
          message
        }}`
      default:
        return  `{"datetime":${[timestamp]}, "message": ${
          message
        }}`
    }
  })
);

// Criação do logger
const logger = createLogger({
  level: 'info', // Define o nível padrão
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: './logs/combined.log' }),
  ],
});

// Exemplos de logs
logger.info('Aplicação iniciada com sucesso');
logger.warn('Este é um aviso');
logger.error('Ocorreu um erro crítico');
logger.http('Recebido um pedido HTTP');


module.exports = logger;