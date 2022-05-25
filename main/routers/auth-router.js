const {check, body} = require("express-validator");
const AuthController = require("../controllers/auth-controller");
const Router = require("express");
const authMiddleware = require("../middleware/auth-middleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: Username for user
 *         password:
 *           type: string
 *           description: Password for user
 *       example:
 *         username: user
 *         password: pass
 *     Token:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the token
 *         refreshToken:
 *           type: string
 *           description: refresh token for user
 *       example:
 *         refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUzMzMyNDM0LCJleHAiOjE2NTU5MjQ0MzR9.iyWG4kKUk5Ty-Dw3sLZvcW3eDl4mq4UUCS3GhbqOaHk
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication API
 */

const authRouter = new Router();


/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: New user registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing fields
 *       409:
 *         description: User already exist
 *       400:
 *         description: Missing fields
 */

authRouter.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 3 символов").isLength({min: 3})
], AuthController.registration);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User authorization
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing fields
 *       404:
 *         description: User not found
 *       418:
 *         description: Wrong password
 */

authRouter.post('/login', AuthController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: User logout
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: The user was successfully logged out
 */

authRouter.post('/logout', AuthController.logout);

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Refresh user's token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: New tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       401:
 *          description: User not authorized
 */

authRouter.get('/refresh', AuthController.refresh);

module.exports = authRouter;