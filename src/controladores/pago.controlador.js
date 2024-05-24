import { PagoModelo } from "../modelos/pago.modelo.js";

// Obtener Estatus 
const obtenerStatus = async (req, res) => {
    let estado = "No inicializado";
    console.log("ESTADO: ", estado);
    try {
        estado = "Inicializando";
        console.log("ESTADO: ", estado);
        const port = await PagoModelo.conectarPos();
        estado = "reconociendo puertos";
        console.log("ESTADO: ", estado);
        if (!port) {
            estado = "No se encontraron puertos";
            console.log("ESTADO: ", estado);
            return res.status(500).json({ message: 'No se encontraron puertos' });
        }
        else {
            estado = "Si se encontraron puertos";
            console.log("ESTADO: ", estado);
            estado = "Intentando desconectar";
            console.log("ESTADO: ", estado);
            const desconectado = await PagoModelo.desconectarPos();
            if (desconectado) {
                estado = "POS desconectado";
                console.log("ESTADO: ", estado);
                res.status(200).json({ message: 'Se ha conectado y desconectado el POS correctamente' });

            } else {
                res.status(200).json({ message: 'Solo se ha conseguido conectar al POS' });
            }
        }

    } catch (error) {
        console.log('ERROR:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener ultima venta 
const obtenerUltimaVenta = async (req, res) => {
    let estado = "No inicializado";
    console.log("ESTADO: ", estado);
    try {
        estado = "Inicializando e intentando obtener utlima venta";
        console.log("ESTADO: ", estado);
        let ultimaVenta = await PagoModelo.obtenerUltimaVenta();
        estado = "obteniendoo ultima venta";
        console.log("ESTADO: "+ estado );
        console.log("ULTIMA VENTA: "+ ultimaVenta );
        if (!port) {
            estado = "No se encontraron puertos";
            console.log("ESTADO: ", estado);
            return res.status(500).json({ message: 'No se encontraron puertos' });
        }
        else {
            estado = "Si se encontraron puertos";
            console.log("ESTADO: ", estado);
            estado = "Intentando desconectar";
            console.log("ESTADO: ", estado);
            const desconectado = await PagoModelo.desconectarPos();
            if (desconectado) {
                estado = "POS desconectado";
                console.log("ESTADO: ", estado);
                res.status(200).json({ message: 'Se ha conectado y desconectado el POS correctamente' });

            } else {
                res.status(200).json({ message: 'Solo se ha conseguido conectar al POS' });
            }
        }

    } catch (error) {
        console.log('ERROR:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};





export const PagoControlador = { obtenerStatus };