import { PagoModelo } from "../modelos/pago.modelo.js";
import { HTTP_CODIGOS, POS_CODIGOS } from '../middleware/respuestaCodigos.js';

import pkg from "transbank-pos-sdk";
const { POSAutoservicio } = pkg;

const posPrueba = new POSAutoservicio()
posPrueba.setDebug(true);

// Obtener estado del POS 
const obtenerStatus = async (req, res) => {
    try {
        PagoModelo.obtenerPuertos()
            .then((puertos) => {
                if (!puertos) {
                    console.log('No hay puertos:', puertos);
                    res.status(200).json({ message: "no hay puertos" });
                } else {
                    console.log('Si hay puertos:', puertos);
                    return PagoModelo.conectarPosPuerto();
                }
            })
            .then(conexion => {
                console.log('conexion', conexion);
                res.status(200).json({ conexion: conexion });
            })
            .then(() => {
                return PagoModelo.desconectarPos();
            })
            .catch(error => {
                console.error('ERROR:', error.message);
                next(error);
            });
    } catch (error) {
        console.log('ERROR:', error.message);
        next(error);
    }

};

// Obtener ultima venta 
const obtenerUltimaVenta = async (req, res, next) => {
    try {
        PagoModelo.conectarPos()
            .then(() => {
                return PagoModelo.obtenerUltimaVenta();
            })
            .then(ultimaVenta => {
                console.log('Retornando última venta:', ultimaVenta);
                res.status(200).json(ultimaVenta);
            })
            .then(() => {
                return PagoModelo.desconectarPos();
            })
            .catch(error => {
                console.error('ERROR:', error.message);
                next(error);
            });
    } catch (error) {
        console.log('ERROR:', error.message);
        next(error);
    }
};

// Realizar cierre venta
const cerrarDiaVenta = async (req, res, next) => {
    try {
        PagoModelo.conectarPos()
            .then(() => {
                return PagoModelo.cerrarDiaVenta();
            })
            .then(cierreDia => {
                console.log('Retornando cierre de dia:', cierreDia);
                res.status(200).json(cierreDia);
            })
            .then(() => {
                return PagoModelo.desconectarPos();
            })
            .catch(error => {
                console.error('ERROR:', error.message);
                next(error);
            });
    } catch (error) {
        console.log('ERROR:', error.message);
        next(error);
    }
};

// Cargar llaves 
const cargarLlaves = async (req, res, next) => {
    try {
        PagoModelo.conectarPos()
            .then(() => {
                return PagoModelo.cargarLlaves();
            })
            .then(cargaLlaves => {
                console.log('Retornando carga de llaves :', cargaLlaves);
                res.status(200).json(cargaLlaves);
            })
            .then(() => {
                return PagoModelo.desconectarPos();
            })
            .catch(error => {
                console.error('ERROR:', error.message);
                next(error);
            });
    } catch (error) {
        console.log('ERROR:', error.message);
        next(error);
    }
};

// Pago simple 
const pagarSimple = async (req, res, next) => {
    try {
        const { monto, ticket } = req.body;

        PagoModelo.conectarPos()
            .then(() => {
                return PagoModelo.pagarSimple(monto, ticket);
            })
            .then(pagoSimple => {
                console.log('Transacción: ', pagoSimple);
                res.status(HTTP_CODIGOS.OK).json({ pagado: pagoSimple.successful, descripcion: pagoSimple.responseMessage });
            })
            .then(() => {
                return PagoModelo.desconectarPos();
            })
            .catch(error => {
                console.error('ERROR:', error.message);
                next(error);
            });
    } catch (error) {
        console.log('ERROR:', error.message);
        next(error);
    }
};


function esperar(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export const PagoControlador = { obtenerStatus, obtenerUltimaVenta, cerrarDiaVenta, cargarLlaves, pagarSimple };
