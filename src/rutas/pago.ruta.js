import { Router } from 'express';

import { PagoControlador } from '../controladores/pago.controlador.js';
import {TestPagoControlador} from   '../controladores/test.pago.controlador.js';

const router = Router();

router.get('/estado', PagoControlador.obtenerStatus);
router.get('/venta/ultima', PagoControlador.obtenerUltimaVenta);
router.get('/venta/cerrar', PagoControlador.cerrarDiaVenta);
router.get('/cargar/llaves', PagoControlador.cargarLlaves);


router.post('/pago/simple', PagoControlador.pagarSimple);

router.get('/prueba', TestPagoControlador.prueba) ;
router.get('/pruebaTransaccion', TestPagoControlador.pruebaTransaccion);

export default router;
