const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const usersRouter = require('./users');


router.use('/user', userRouter);
router.use('/users', usersRouter);


module.exports = router;