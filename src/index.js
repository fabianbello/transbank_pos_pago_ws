import "dotenv/config";
import express from 'express';
import PagoRuta from './rutas/pago.ruta.js';
import errorHandler from './middleware/errorHandler.js';
import HttpCodigos from './middleware/respuestaCodigos.js';
import expressWinston from 'express-winston'
import logger from './config/logger/logger.js'

const app = express();

app.use(express.json());

app.use("/tbk/pos", PagoRuta);

// log todas las solicitudes
app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true, // Log the meta data about the request (default: true)
    msg: "HTTP {{req.method}} {{req.url}}", // Define a template for the log message
    colorStatus: true // Color the status code (default: false)
}));

// log errores
app.use(expressWinston.errorLogger({
    winstonInstance: logger
}));

app.use(errorHandler);

const PORT = process.env.PORT || 3330;

app.listen(PORT, () => { console.log('\nTransbank POS pago - Web service iniciado \n\nServidor funcionando en el puerto: ' + PORT); });



