
const obtenerStatus = async () => {

    // Habilitado sistema debug
    pos.setDebug(true);

    // Intento de conexión al POS
    pos.autoconnect()
        .then((port) => {
            if (port === false) {
                return { "Message: ": "No se encontraron puertos" }
                console.log('No se encontró ningún POS conectado');
            }
            console.log('Connected to PORT: ', port.path)
            return { "Message: ": "Se ha conectado con éxtio" }
            pos.loadKeys() // Cargar llaves
        })
        .catch((err) => {
            console.log('Ocurrió un error inesperado', err);
            return {
                "Message: ": "Error inesperado",
                "Error": err
            }
        })
}

export const PagoModelo = {
    obtenerStatus
};
