// Captura errores asíncronos y síncronos y los pasa al manejador global
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
};