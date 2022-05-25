const {check, body} = require("express-validator");
const AuthController = require("../controllers/auth-controller");
const Router = require("express");
const authMiddleware = require("../middleware/auth-middleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users API
 */

const userRouter = new Router();

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *          description: User not found
 */

userRouter.get('/:id', AuthController.getUserById);

module.exports = userRouter;