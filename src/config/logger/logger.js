import { createLogger, transports, format } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({ filename: path.join(__dirname, '../../../logs/error.log'), level: 'error' }),
        new transports.File({ filename: path.join(__dirname, '../../../logs/combined.log') })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

logger.exceptions.handle(
    new transports.File({ filename: path.join(__dirname, '../../logs/exceptions.log') })
);

process.on('unhandledRejection', (ex) => {
    throw ex;
});

export default logger;