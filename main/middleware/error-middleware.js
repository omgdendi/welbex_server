const ApiError = require('../exceptions/api-error');
const BlogError = require("../exceptions/blog-error");

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError || err instanceof BlogError) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    return res.status(500).json({message: 'Something strange on server'});
};