import "dotenv/config";
import express from 'express';
import PagoRuta from './rutas/pago.ruta.js';
import errorHandler from './middleware/errorHandler.js';
import HttpCodigos from './middleware/respuestaCodigos.js';
const app = express();

app.use(express.json());

app.use("/tbk/pos", PagoRuta);

app.use(errorHandler);

const PORT = process.env.PORT || 3330;

app.listen(PORT, () => { console.log('\nTransbank POS pago - Web service iniciado \n\nServidor funcionando en el puerto: ' + PORT); });



