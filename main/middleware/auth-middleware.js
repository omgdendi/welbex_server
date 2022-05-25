const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "User not found"});
        }
        const userData = tokenService.validateAccessToken(token);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}