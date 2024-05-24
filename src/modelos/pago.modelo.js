import pkg from 'transbank-pos-sdk';

// Incializando sdk POS de TBK
const { POSAutoservicio } = pkg;
const pos = new POSAutoservicio();

// Depuración activada
pos.setDebug(true);

// Conectar POS
const conectarPos = async () => {
    try {
        const port = await pos.autoconnect();
        if (!port) {
            console.log('No se encontró ningún POS conectado');
            return null;
        }
        /* console.log('Connected to PORT:', port.path); */
        return port;
    } catch (error) {
        console.log('Ocurrió un error inesperado:', error);
        throw error;
    }
};

// Desconectar POS
const desconectarPos = async () => {
    try {
        await pos.disconnect();
        return true;
    } catch (error) {
        console.log('Ocurrió un error inesperado:', error);
        throw error;
        return false;
    }
};

// Ultima venta
const obtenerUltimaVenta = async () => {
    try {
        pos.getLastSale().then((response) => {
            console.log('getLastSale ejecutado. Respuesta: ', response);
            return response;
        }).catch((err) => {
            console.log('Ocurrió un error inesperado', err);
        });
    } catch (error) {
        console.log('Ocurrió un error inesperado:', error);
        throw error;
        return false;
    }
};

export const PagoModelo = { conectarPos, desconectarPos };