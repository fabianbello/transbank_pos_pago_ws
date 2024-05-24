import "dotenv/config";
import express from 'express';
import PagoRuta from './rutas/pago.ruta.js';

const app = express();

app.use(express.json());

app.use("/tbk/pos", PagoRuta);

const PORT = process.env.PORT || 3330;

app.listen(PORT, () => { console.log('\nTransbank POS pago - Web service iniciado \n\nServidor funcionando en el puerto: ' + PORT); });



