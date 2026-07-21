// Middleware global de manejo de errores
const manejadorErroresGlobal = (err, req, res, next) => {
    // Si el error no tiene un código de estado, por defecto será 500 (Error del Servidor)
    const statusCode = err.statusCode || 500;
    const mensaje = err.message || 'Ha ocurrido un error interno en el servidor';

    console.error(`[Error] ❌ ${mensaje}`);

    res.status(statusCode).json({
        ok: false,
        status: statusCode,
        error: mensaje,
        // Muestra la pila del error solo si estás desarrollando localmente
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = manejadorErroresGlobal;