import { Router } from 'express';

import { PagoControlador } from '../controladores/pago.controlador.js';

const router = Router();

router.get('/estado', PagoControlador.obtenerStatus);

export default router;
