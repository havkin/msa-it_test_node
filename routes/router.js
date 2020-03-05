const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userRouter = require('./user');
const usersRouter = require('./users');

// проверяем наличие bearer токена
// при отсутствии или неправильном токене - высылаем на фронт ошибку
router.use('/', async (req, res, next) => {

   if (!req.headers.authorization) {
     return res.json({ error: 'No token' });
   } else {
     const [type, token] = req.headers.authorization.split(' ');
 
     jwt.verify(token, 'secretKey', (err, payload) => {
       if (err) {
         return res.json({ error: 'Wrong token' });
       }
 
       req.user = payload;
 
       next();
     });
   }
 });

router.use('/user', userRouter);
router.use('/users', usersRouter);


module.exports = router;