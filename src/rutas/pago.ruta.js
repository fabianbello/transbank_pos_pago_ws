import { Router } from 'express';

import { PagoControlador } from '../controladores/pago.controlador.js';
import { TestPagoControlador } from '../controladores/test.pago.controlador.js';

const router = Router();

// Operaciones de estado del POS e inicialización
router.get('/conectar', PagoControlador.conectarPOS);
router.get('/conexion', PagoControlador.revisarConexionPOS);
router.get('/inicializar', PagoControlador.inicializar);
router.get('/inicializar/respuesta', PagoControlador.respuestaInicializar);
router.get('/cargar/llaves', PagoControlador.cargarLlaves);
router.get('/cargar/llaves/only', PagoControlador.cargarLlavesOnly);
router.get('/desconectar', PagoControlador.desconectarPOS);

// operaciones administrativas
router.get('/venta/ultima', PagoControlador.obtenerUltimaVenta);
router.get('/venta/ultima/only', PagoControlador.obtenerUltimaVentaOnly);
router.get('/venta/cerrar', PagoControlador.cerrarDiaVenta);
router.get('/venta/cerrar/only', PagoControlador.cerrarDiaVentaOnly);
router.get('/estado', PagoControlador.obtenerStatus);

// Pagos
router.get('/pago/simple', PagoControlador.pagarSimple);
router.get('/pago/simple/only', PagoControlador.pagarSimpleOnly);

// Pruebas
router.get('/prueba', TestPagoControlador.prueba);
router.get('/t2', TestPagoControlador.pruebaTransaccion);

export default router;
