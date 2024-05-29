import { PagoModelo } from "../modelos/pago.modelo.js";
import { HTTP_CODIGOS, POS_CODIGOS } from '../middleware/respuestaCodigos.js';
import logger from '../config/logger/logger.js';
import fs from 'fs';
import { exec } from 'child_process';
import { jsPDF } from 'jspdf';
/* import { print } from "pdf-to-printer"; */
/* import pkg from "transbank-pos-sdk";
const { POSAutoservicio } = pkg;

const posPrueba = new POSAutoservicio()
posPrueba.setDebug(true); */
import pkg from 'pdf-to-printer';
const { print } = pkg;

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





// Conectar POS
const conectarPOS = async (req, res, next) => {
    try {
        const { monto, ticket } = req.body;
        PagoModelo.conectarPos()
            .then((response) => {
                res.status(200).json({ conexion: response });
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

// Revisar conexion
const revisarConexionPOS = async (req, res, next) => {
    try {
        const { monto, ticket } = req.body;

        PagoModelo.revisarConexionPOS()
            .then((response) => {
                res.status(200).json({ conexion: response });
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

// Desconectar POS
const desconectarPOS = async (req, res, next) => {
    try {
        const { monto, ticket } = req.body;

        PagoModelo.desconectarPos()
            .then((response) => {
                res.status(200).json({ desconexion: response });
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

// Inicializar
const inicializar = async (req, res, next) => {
    try {
        PagoModelo.transaccionInicializar()
            .then((response) => {
                res.status(200).json({ inicializacion: response });
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

// Respuesta inicializar
const respuestaInicializar = async (req, res, next) => {
    try {
        PagoModelo.respuestaTransaccionInicializar()
            .then((response) => {
                res.status(200).json({ inicializacion: response });
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

// Cargar LLaves
const cargarLlaves = async (req, res, next) => {
    try {
        PagoModelo.conectarPos()
            .then(() => {
                logger.info('Conectado y cargando llaves');
                return PagoModelo.cargarLlaves();
            })
            .then(cargaLlaves => {
                console.log('Carga de llaves: ', cargaLlaves);
                logger.info('llaves cargadas con éxito');
                res.status(HTTP_CODIGOS.OK).json(cargaLlaves);
            })
            .then(() => {
                logger.info('Desconectando');
                return PagoModelo.desconectarPos();
            })
            .catch(error => {
                console.error('ERROR:', error.message);
                PagoModelo.desconectarPos();
                next(error);
            });
    } catch (error) {
        console.log('ERROR:', error.message);
        next(error);
    }
};

// Pagar simple
const pagarSimple = async (req, res, next) => {
    try {
        const { monto, ticket } = req.body;
        PagoModelo.conectarPos()
            .then(() => {
                logger.info('Conectado y pagando');
                return PagoModelo.pagarSimple(587, "8464");
            })
            .then(pagoSimple => {
                logger.info('Transacción procesada');
                console.log('Transacción: ', pagoSimple);
                imprimirVoucher2(pagoSimple.voucher);
                res.status(HTTP_CODIGOS.OK).json(pagoSimple);
            })
            .then(() => {
                logger.info('Desconectando');
                return PagoModelo.desconectarPos();
            })
            .catch(error => {
                console.error('ERROR:', error.message);
                PagoModelo.desconectarPos();
                next(error);
            });
    } catch (error) {
        console.log('ERROR:', error.message);
        next(error);
    }
};

// Obtener ultima venta completa
const obtenerUltimaVenta = async (req, res, next) => {
    try {
        PagoModelo.conectarPos()
            .then(() => {
                logger.info('Conectado y obteniendo ultima venta');
                return PagoModelo.obtenerUltimaVenta();
            })
            .then(ultimaVenta => {
                logger.info('obtenido registro asociado a ultima venta');
                console.log('Retornando última venta:', ultimaVenta);
                imprimirVoucher2(ultimaVenta.voucher);
                res.status(200).json(ultimaVenta);
            })
            .then(() => {
                logger.info('Desconectando');
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

// Realizar cierre venta completo
const cerrarDiaVenta = async (req, res, next) => {
    try {
        PagoModelo.conectarPos()
            .then(() => {
                logger.info('Conectado y cerrando dia de venta');
                return PagoModelo.cerrarDiaVenta();
            })
            .then(cierreDia => {
                logger.info('Transacción de cierre de dia de venta');
                console.log('Retornando cierre de dia:', cierreDia);
                imprimirVoucher2(cierreDia.voucher);
                res.status(200).json(cierreDia);
            })
            .then(() => {
                return PagoModelo.desconectarPos();
            })
            .catch(error => {
                logger.info('Desconectando');
                console.error('ERROR:', error.message);
                next(error);
            });
    } catch (error) {
        console.log('ERROR:', error.message);
        next(error);
    }
};

// Cargar llaves 
const cargarLlavesOnly = async (req, res, next) => {
    try {
        PagoModelo.cargarLlaves()
            .then(cargaLlaves => {
                console.log('Retornando carga de llaves :', cargaLlaves);
                res.status(200).json(cargaLlaves);
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


// Pagar simple unitario
const pagarSimpleOnly = async (req, res, next) => {
    try {
        PagoModelo.pagarSimple(153, "513")
            .then(pagoSimple => {
                console.log('Transacción: ', pagoSimple);
                res.status(HTTP_CODIGOS.OK).json(pagoSimple);
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
const cerrarDiaVentaOnly = async (req, res, next) => {
    try {
        PagoModelo.cerrarDiaVenta()
            .then(cierreDia => {
                console.log('Retornando cierre de dia:', cierreDia);
                res.status(200).json(cierreDia);
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
const obtenerUltimaVentaOnly = async (req, res, next) => {
    try {
        PagoModelo.obtenerUltimaVenta()
            .then((ultimaVenta) => {
                res.status(200).json(ultimaVenta);
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

// Imprimir voucher
const imprimirVoucher = async (voucher) => {
    const voucherText = voucher.join('\n');
    logger.info('GUARDANDO EN ARCHIVO EL VOUCHER');
    const filePath = './recursos/temporales/voucher.txt';
    const content = 'Este es el contenido de mi archivo.';

    fs.writeFile(filePath, voucherText, 'utf8', (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
        } else {
            const printerName = 'REXOD RMP-8300';
            const command = `print /D:${printerName} ${filePath}`;
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`ERROOOOOOOR Error al imprimir el voucher: ${error.message}`);
                }
                if (stderr) {
                    console.error(' ERROOOOOOOOR: '`stderr: ${stderr}`);
                }
                console.log(`Voucher impreso con éxito: ${stdout}`);
            });
        }
    });


};

// Imprimir voucher
const imprimirVoucher2 = async (voucher) => {
    const voucherText = voucher.join('\n');
    logger.info('GUARDANDO EN ARCHIVO EL VOUCHER');
    const filePath = './recursos/temporales/voucher.txt';
    const content = 'Este es el contenido de mi archivo.';

    fs.writeFile(filePath, voucherText, 'utf8', async (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
        } else {

            const printerName = 'REXOD RMP-8300';
            const command = `print /D:${printerName} ${filePath}`;

            // Crear un nuevo objeto jsPDF
            const doc = new jsPDF();

            // Agregar texto a tu PDF
            await doc.text(20, 20, voucherText);

            // Guardar el PDF en el disco
            await doc.save('./recursos/temporales/voucher.pdf');

            // Para imprimir un documento PDF
            print('./recursos/temporales/voucher.pdf').then(console.log("Imprimiendo"));

            /* exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`ERROOOOOOOR Error al imprimir el voucher: ${error.message}`);
                }
                if (stderr) {
                    console.error(' ERROOOOOOOOR: '`stderr: ${stderr}`);
                }
                console.log(`Voucher impreso con éxito: ${stdout}`);
            }); */
        }
    });
};

function esperar(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export const PagoControlador = { obtenerStatus, obtenerUltimaVenta, cerrarDiaVenta, cargarLlaves, pagarSimple, conectarPOS, revisarConexionPOS, desconectarPOS, inicializar, respuestaInicializar, pagarSimpleOnly, cerrarDiaVentaOnly, obtenerUltimaVentaOnly, cargarLlavesOnly };
