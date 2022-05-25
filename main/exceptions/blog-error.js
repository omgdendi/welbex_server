module.exports = class BlogError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static ChangingNotOwnedBlog() {
        return new BlogError(409, "Try to change not owned blog");
    }

    static BlogNotFound() {
        return new BlogError(404, "Blog not found");
    }

    static NotSupportedFormat() {
        return new BlogError(422, "Format of file is not supported")
    }

    static BadRequest(message, errors = []) {
        return new BlogError(400, message, errors);
    }
}