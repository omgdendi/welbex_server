const AuthService = require("../service/auth-service");
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

class authController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при регистрации", errors.array()));
            }
            const userData = await AuthService.registration(req.body);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({userData});
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const userData = await AuthService.login(req.body);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json({userData});
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await AuthService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const tokens = await AuthService.refresh(refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json({tokens})
        } catch (e) {
            next(e);
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await AuthService.getUserById(req.params.id);
            res.json(user)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new authController();