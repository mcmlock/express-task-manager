const errorHandler = (err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).json({ msg: err.message });
    }
    return res.status(500).json({ msg: 'Something went wrong' });
}

module.exports = errorHandler;