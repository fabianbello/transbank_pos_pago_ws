import pkg from 'transbank-pos-sdk';
const { POSAutoservicio } = pkg;

const pos = new POSAutoservicio();
pos.setDebug(true);

// Autoconectar al POS desde el primer puerto encontrado
export const conectarPos = () => {
    return pos.autoconnect()
        .then(port => {
            if (!port) {
                throw new Error('No se encontraron puertos');
            }
            console.log('Conectado al puerto:', port.path);
            return port;
        });
};

// Obtener la ultima menta
export const obtenerUltimaVenta = () => {
    return pos.getLastSale(true)
        .then(response => {
            return response;
        });
};

// Desconectar del POS
export const desconectarPos = () => {
    return pos.disconnect()
        .then((res) => {
            console.log('POS desconectado correctamente');
            return res;
        });
};

// Obtener los Puertos disponibles
export const obtenerPuertos = () => {
    return pos.listPorts().then((ports) => {
        return ports;
    })
}

// Conectar con un puerto
export const conectarPosPuerto = () => {
    let portName = 'COM9'; // windows
    return pos.connect(portName).then((response) => {
        return response;
    }).catch((err) => {
        console.log('Ocurrió un error inesperado', { err });
        return false;
    })
}

// Cerrar día de ventas
export const cerrarDiaVenta = () => {
    return pos.closeDay(true).then((response) => {
        return response;
    }).catch((err) => {
        console.log('Ocurrió un error inesperado', err);
        return false;
    });
}

// Cargar llaves 
export const cargarLlaves = () => {
    return pos.loadKeys().then((response) => {
        return response;
    }).catch((err) => {
        console.log('Ocurrió un error inesperado', err);
        return false;
    });
}

// Pagar simple
export const pagarSimple = (monto, ticket) => {
    return pos.sale(monto, ticket, true, true).then((response) => {
        return response;
    }).catch((err) => {
        console.log('Ocurrió un error inesperado', err);
        return false;
    });
}

// Revisar conexión con POS
export const revisarConexionPOS = async () => {
    return pos.poll().then((res) => {
        return res;
    })
        .catch((err) => {
            console.log('Ocurrió un error inesperado', err);
            return err;
        });
}

// Transacción de inicialización
export const transaccionInicializar = () => {
    return pos.initialization().then((res) => {
        return res;
    }).catch((err) => {
        console.log("ocurrio un error inesperado", err);
        return err;
    })
}

// Respuesta transacción de inicialización
export const respuestaTransaccionInicializar = () => {
    return pos.initializationResponse().then((res) => {
        return res;
    })
        .catch((err) => {
            console.log('Ocurrió un error inesperado', err);
            return err;
        });
}

// Manejo de error de serie del POS
pos.on('error', (err) => {
    console.error('Error en el puerto serie:', err.message);
});

export const PagoModelo = { conectarPos, desconectarPos, obtenerUltimaVenta, obtenerPuertos, conectarPosPuerto, cerrarDiaVenta, cargarLlaves, pagarSimple, revisarConexionPOS, transaccionInicializar, respuestaTransaccionInicializar };