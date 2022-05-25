const UserDTO = require("./user-dto");


module.exports = class BlogDTO {
    id;
    message;
    createdAt;
    author;
    img;
    video;

    constructor(model) {
        this.id = model.id;
        this.message = model.message;
        this.createdAt = model.createdAt;
        this.img = model.img;
        this.video = model.video;
        this.author = model.userId;
    }
}