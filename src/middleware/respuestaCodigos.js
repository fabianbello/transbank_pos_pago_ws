export const POS_CODIGOS = {
    "00": "Aprobado",
    "01": "Rechazado",
    "02": "Autorizador no Responde",
    "03": "Conexión Fallo",
    "04": "Transacción ya Fue Anulada",
    "05": "No existe Transacción para Anular",
    "06": "Tarjeta no Soportada",
    "07": "Transacción Cancelada",
    "08": "No puede Anular Transacción Debito",
    "09": "Error Lectura Tarjeta",
    "10": "Monto menor al mínimo permitido",
    "11": "No existe venta",
    "12": "Transacción No Soportada",
    "13": "Debe ejecutar cierre",
    "14": "Error Encriptando PAN (BCYCLE)",
    "15": "Error Operando con Debito (BCYCLE)",
    "80": "Solicitando Conformar Monto",
    "81": "Solicitando Ingreso de Clave",
    "82": "Enviando transacción al Autorizador",
    "83": "Selección menú crédito/redcompra",
    "84": "Opere tarjeta",
    "85": "Selección de cuotas",
    "86": "Ingreso de cuotas",
    "87": "Confirmación de cuotas",
    "88": "Aceptar consulta cuotas",
    "89": "Opción mes de gracia",
    "90": "Inicialización Exitosa",
    "91": "Inicialización Fallida",
    "92": "Lector no Conectado",
    "93": "Consultando cuota al Autorizador"
};

export const HTTP_CODIGOS = {
    OK: 200,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
}

export default {HTTP_CODIGOS, POS_CODIGOS};