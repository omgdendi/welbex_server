module.exports = class UserDTO {
    id;
    username;

    constructor(model) {
        this.id = model.id;
        this.username = model.username;
    }
}