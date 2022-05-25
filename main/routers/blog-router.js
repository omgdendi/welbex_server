const Router = require("express");
const BlogController = require("../controllers/blog-controller");
const authMiddleware = require("../middleware/auth-middleware");
const {check} = require("express-validator");

const blogRouter = new Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the blog
 *         message:
 *           type: string
 *           description: The blog message
 *         userId:
 *           type: int
 *           description: Ref to user
 *         createdAt:
 *           type: date
 *           description: Blog created date
 *         img:
 *           type: string
 *           description: File name of image
 *         video:
 *           type: string
 *           description: File name of video
 *       example:
 *         id: 1
 *         message: hello world!
 *         userId: 1
 *         createdAt: 2022-05-24T13:38:29.090Z
 *         img: a8d6759d-9031-404c-9f51-857c60daa21c.jpg
 *         video: bff4964f-3a2f-4ec6-bf9d-1e4f879fb824.mp4
 *     BlogDto:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The blog message
 *       example:
 *         message: hello world!
 *
 */

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: The blogs managing API
 */

/**
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlogDto'
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: img
 *         type: file
 *         description: The image file to upload
 *       - in: formData
 *         name: video
 *         type: file
 *         description: The video file to upload
 *     responses:
 *       200:
 *         description: The blog was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       422:
 *         description: Not supported format
 *       400:
 *         description: Missing fields
 *       401:
 *          description: User not authorized
 */

blogRouter.post('/blog', authMiddleware, BlogController.create);

/**
 * @swagger
 * /blogs:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns the list of all the blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       401:
 *          description: User not authorized
 */
blogRouter.get('/blogs', authMiddleware, BlogController.getAll);


/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *
 *     responses:
 *       200:
 *         description: The blog was deleted
 *       404:
 *         description: The blog was not found
 *       401:
 *          description: User not authorized
 */

blogRouter.delete('/blogs/:id', authMiddleware, BlogController.delete);


/**
 * @swagger
 * /blogs/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update the blog by id
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *      - in: formData
 *        name: img
 *        type: file
 *        description: The image file to upload
 *      - in: formData
 *        name: video
 *        type: file
 *        description: The video file to upload
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BlogDto'
 *    responses:
 *      200:
 *        description: The blog was updated
 *      404:
 *        description: The blog was not found
 *      401:
 *        description: User not authorized
 */

blogRouter.put('/blogs/:id', authMiddleware, BlogController.update);


/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns the blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: Blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       401:
 *          description: User not authorized
 */
blogRouter.get('/blogs/:id', authMiddleware, BlogController.getOne);

module.exports = blogRouter;