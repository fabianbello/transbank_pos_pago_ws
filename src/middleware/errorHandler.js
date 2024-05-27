const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    if (!res.headersSent) {
        res.status(500).json({ error: err.message });
    } else {
        next(err);
    }
};

export default errorHandler;