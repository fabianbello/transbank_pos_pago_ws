import { PagoModelo } from "../modelos/pago.modelo.js";
import { HTTP_CODIGOS, POS_CODIGOS } from '../middleware/respuestaCodigos.js';

import pkg from "transbank-pos-sdk";
const { POSAutoservicio } = pkg;

const posPrueba = new POSAutoservicio()
posPrueba.setDebug(true);

// Pago simple
const pagarAprobado = async (req, res, next) => {
    try {
        const { monto, ticket } = req.body;
        res.status(200).json({ pagado: true, descripcion: "Aprobado" });
    } catch (error) {
        console.log('ERROR:', error.message);
        next(error);
    }
};

// Pago simple
const pagarRechazado = async (req, res, next) => {
    try {
        const { monto, ticket } = req.body;
        res.status(200).json({ pagado: false, descripcion: "Rechazado" });
    } catch (error) {
        console.log('ERROR:', error.message);
        next(error);
    }
};

// Metodo pruebas
const prueba = async (req, res, next) => {
    try {
        posPrueba.listPorts().then((ports) => {
            console.log(ports);
            posPrueba.connect(ports[0].path).then((response) => {
                console.log('Conectado correctamente');
                posPrueba.loadKeys().then((response) => {
                    console.log('loadKeys ejecutado. Respuesta: ', response);
                    posPrueba.poll().then((res) => {
                        let connectedToPort = posPrueba.getConnectedPort();
                        console.log("PUERTO A CUAL ESTA CONECTADO: ", connectedToPort);
                        console.log('Resultado pos conectado?:', res);
                        posPrueba.closeDay().then((response) => {
                            console.log('closeDay ejecutado. Respuesta: ', response);
                            posPrueba.initialization().then(async (res) => {
                                await esperar(3000);
                                console.log(' inicializacion:', res);
                                posPrueba.initializationResponse().then((res) => {
                                    console.log('Resultado respuesta incializacion:', res);
                                    posPrueba.disconnect().then((response) => {
                                        console.log('Puerto desconectado correctamente');
                                    }).catch((err) => {
                                        console.log('Ocurrió un error inesperado', err);
                                    });
                                })
                                    .catch((err) => {
                                        console.log('Ocurrió un error inesperado', err);
                                    });
                            })
                                .catch((err) => {
                                    console.log('Ocurrió un error inesperado', err);
                                });
                        }).catch((err) => {
                            console.log('Ocurrió un error inesperado', err);
                        });


                    })
                        .catch((err) => {
                            console.log('Ocurrió un error inesperado', err);
                        });

                }).catch((err) => {
                    console.log('Ocurrió un error inesperado', err);
                });
            }).catch((err) => {
                console.log('Ocurrió un error inesperado', { err });
            });
        }).catch((err) => {
            console.log('Ocurrió un error inesperado', err);
        });
    } catch (error) {
        s
    }
}

// Metodo pruebas
const pruebaTransaccion = async (req, res, next) => {
    try {
        posPrueba.listPorts().then((ports) => {
            console.log(ports);
            posPrueba.connect(ports[0].path).then((response) => {
                console.log('Conectado correctamente');
                posPrueba.loadKeys().then((response) => {
                    console.log('loadKeys ejecutado. Respuesta: ', response);
                    posPrueba.poll().then((res) => {
                        let connectedToPort = posPrueba.getConnectedPort();
                        console.log("PUERTO A CUAL ESTA CONECTADO: ", connectedToPort);
                        console.log('Resultado pos conectado?:', res);

                        // Venta simple sin estados intermedios
                        posPrueba.sale(1500, '12423').then((response) => {
                            console.log('sale finalizado. Respuesta: ', response);
                        }).catch((err) => {
                            console.log('Ocurrió un error inesperado', err);
                        });
                    })
                        .catch((err) => {
                            console.log('Ocurrió un error inesperado', err);
                        });

                }).catch((err) => {
                    console.log('Ocurrió un error inesperado', err);
                });
            }).catch((err) => {
                console.log('Ocurrió un error inesperado', { err });
            });
        }).catch((err) => {
            console.log('Ocurrió un error inesperado', err);
        });
    } catch (error) {
        s
    }
}

export const TestPagoControlador = { pagarAprobado, pagarRechazado, pruebaTransaccion, prueba };
