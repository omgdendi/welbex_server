const Router = require('express');
const blogRouter = require("../routers/blog-router");
const authRouter = require("../routers/auth-router");
const userRouter = require("./user-router");

const router = new Router();

router.use("/", blogRouter);
router.use('/auth', authRouter);
router.use("/users", userRouter);

module.exports = router;