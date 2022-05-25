const tokenService = require("./token-service");
const BlogDTO = require("../dtos/blog-dto");
const BlogError = require("../exceptions/blog-error");
const {BlogModel} = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const fs = require("fs");

class BlogService {
    async create(req) {
        const token = req.headers.authorization.split(' ')[1];
        const body = req.body;
        const message = body.message;

        if (!body.message && !req.files) {
            throw BlogError.BadRequest("missing fields");
        }
        let imageFileName = null;
        let videoFileName = null;
        if (req.files) {
            const img = req.files.img;
            const video = req.files.video;
            [imageFileName, videoFileName] = this.readFile(img, video);
        }

        const userData = tokenService.validateAccessToken(token);
        const blog = await BlogModel.create({message, userId: userData.id, img: imageFileName, video: videoFileName});
        const blogDto = new BlogDTO(blog);
        return blogDto;
    }

    async getAll(req) {
        const blogs = await BlogModel.findAll();
        const blogsDto = blogs.map(blog => new BlogDTO(blog));
        return blogsDto;
    }

    async getOne(req, id) {
        const blog = await BlogModel.findOne({where: {id}});
        if (!blog) {
            throw BlogError.BlogNotFound();
        }
        return new BlogDTO(blog);
    }

    async delete(req, id) {
        if (!id) {
            throw new Error('Не указан ID');
        }
        const token = req.headers.authorization.split(' ')[1];
        const userData = tokenService.validateAccessToken(token);
        const userId = userData.id;
        const blog = await BlogModel.findOne({where: {id}});
        if (!blog) {
            throw BlogError.BlogNotFound();
        }
        if (userId !== blog.userId) {
            throw BlogError.ChangingNotOwnedBlog();
        }
        await BlogModel.destroy({where: {id}});
    }

    async update(req, id) {
        const token = req.headers.authorization.split(' ')[1];
        const body = req.body;
        const message = body.message;
        const userData = tokenService.validateAccessToken(token);
        const userId = userData.id;
        const blog = await BlogModel.findOne({where: {id}});
        if (!blog) {
            throw BlogError.BlogNotFound();
        }
        if (userId !== blog.userId) {
            throw BlogError.ChangingNotOwnedBlog();
        }
        let imageFileName = null;
        let videoFileName = null;
        if (req.files) {
            const img = req.files.img;
            const video = req.files.video;
            [imageFileName, videoFileName] = this.readFile(img, video);
            if (imageFileName && blog.img) {
                fs.unlinkSync("main/static/images/" + blog.img);
            }
            if (videoFileName && blog.video) {
                fs.unlinkSync("main/static/video/" + blog.video);
            }
        }
        if (imageFileName && videoFileName) {
            await BlogModel.update({message, img: imageFileName, video: videoFileName}, {where: {id}});
        } else if (imageFileName) {
            await BlogModel.update({message, img: imageFileName}, {where: {id}});
        } else if (videoFileName) {
            await BlogModel.update({message, video: videoFileName}, {where: {id}});
        } else {
            await BlogModel.update({message}, {where: {id}});
        }
        const blogDto = new BlogDTO(blog);
        return blogDto;
    }

    readFile(img, video) {
        let imageFileName = null;
        let videoFileName = null;
        if (img) {
            let type = img.name.split('.').pop();
            if (type === "jpeg" || type === "jpg" || type === "png") {
                imageFileName = uuid.v4() + "." + type;
            } else {
                throw BlogError.NotSupportedFormat();
            }
            img.mv(path.resolve(__dirname, '..', 'static/images', imageFileName));
        }
        if (video) {
            let type = video.name.split('.').pop();
            if (type === "mp4") {
                videoFileName = uuid.v4() + "." + type;
            } else {
                throw BlogError.NotSupportedFormat();
            }
            video.mv(path.resolve(__dirname, '..', 'static/video', videoFileName));
        }
        return [imageFileName, videoFileName]
    }
}

module.exports = new BlogService();