const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Text = require('../models/text');

// проверяем наличие bearer токена
// при отсутствии или неправильном токене - высылаем на фронт ошибку

router.use('/', async (req, res, next) => {

   if (!req.headers.authorization) {
      return res.json({
         error: 'No token'
      });
   } else {
      const [type, token] = req.headers.authorization.split(' ');

      jwt.verify(token, 'secretKey', (err, payload) => {
         if (err) {
            return res.json({
               error: 'Wrong token'
            });
         }

         req.user = payload;

         next();
      });
   }
});


// если первая страница запрашивается без параметра 

router.get('/', async (req, res) => {

// linesQnt - количество выводимых элементов на странице, нужно получать с фронта
   const linesQnt = 5;

   const start = 0;
   const texts = await Text.find().skip(start).limit(linesQnt);

   res.json(texts);
});

// в параметре запроса - номер страницы

router.get('/:page', async (req, res) => {

// linesQnt - количество выводимых элементов на странице, нужно получать с фронта
   const linesQnt = 5;

   const start = (req.params.page - 1) * linesQnt;

   const texts = await Text.find().skip(start).limit(linesQnt);

   res.json(texts);
});

module.exports = router;