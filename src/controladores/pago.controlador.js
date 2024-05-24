import { PagoModelo } from "../modelos/pago.modelo.js";

const obtenerStatus = async (req, res) => {
    try {
        const result = await PagoModelo.obtenerStatus();
        res.json(result);

    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const PagoControlador = { obtenerStatus, };
