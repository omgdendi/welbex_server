module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, "User not authorized");
    }

    static UserAlreadyExist() {
        return new ApiError(409, "User already exist");
    }

    static WrongPassword() {
        return new ApiError(418, "Wrong password");
    }

    static UserNotFound() {
        return new ApiError(404, "User not found");
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}