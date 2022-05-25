const BlogService = require("../service/blog-service");

class BlogController {
    async create (req, res, next) {
        try {
            const blog = await BlogService.create(req);
            res.json(blog);
        } catch (e) {
            next(e);
        }
    }

    async getAll (req, res, next) {
        try {
            const blogs = await BlogService.getAll(req);
            return res.json(blogs);
        } catch (e) {
            next(e);
        }
    }

    async getOne (req, res, next) {
        try {
            const blog = await BlogService.getOne(req, req.params.id);
            return res.json(blog);
        } catch (e) {
            next(e);
        }
    }

    async delete (req, res, next) {
        try {
            const id = req.params.id;
            await BlogService.delete(req, req.params.id);
            return res.json(`Блог (id - ${id}) успешно обновлен`);
        } catch (e) {
            next(e);
        }
    }

    async update (req, res, next) {
        try {
            const id = req.params.id;
            await BlogService.update(req, id);
            return res.json(`Блог (id - ${id}) успешно обновлен`)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BlogController();