const bcrypt = require("bcryptjs");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const UserDTO = require("../dtos/user-dto");
const {UserModel, RoleModel} = require("../models/models");

class AuthService {
    async registration(user) {
        const {username, password} = user;
        if (!username || !password) {
            throw ApiError.BadRequest("Missing required fields");
        }
        const condidate = await UserModel.findOne({where: {username}})
        if (condidate) {
            throw ApiError.UserAlreadyExist();
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await RoleModel.findOne({where: {value: "USER"}});
        const checkedUser = await UserModel.create({username, password: hashPassword, roles: "USER"});
        const userDto = new UserDTO(checkedUser);
        const tokens = tokenService.generateTokens({id: userDto.id});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        };
    }

    async login(user) {
        const {username, password} = user;
        if (!username || !password) {
            throw ApiError.BadRequest("Missing required fields");
        }
        const condidate = await UserModel.findOne({where: {username: username}})
        if (!condidate) {
            throw ApiError.UserNotFound();
        }
        const validatePassword = bcrypt.compareSync(password, condidate.password);
        if (!validatePassword) {
            throw ApiError.BadRequest("Wrong password");
        }
        const userDto = new UserDTO(condidate);
        const tokens = tokenService.generateTokens({id: userDto.id});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findOne({where: {id: userData.id}});
        const userDto = new UserDTO(user);
        const tokens = tokenService.generateTokens({id: user.id});
        await tokenService.saveToken(user.id, tokens.refreshToken);
        return {
            user: userDto,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        };
    };

    async getUserById(id) {
        const user = await UserModel.findOne({where: {id}});
        if (!user) {
            throw new ApiError.UserNotFound();
        }
        return new UserDTO(user);
    }
};

module.exports = new AuthService();