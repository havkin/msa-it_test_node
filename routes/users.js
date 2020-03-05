const express = require('express');
const router = express.Router();

const Text = require('../models/text');


// если первая страница запрашивается без параметра 

router.get('/', async (req, res) => {

// linesQnt - количество выводимых элементов на странице, нужно получать с фронта
   const linesQnt = 5;
   const start = 0;

   let result;
   try {
      result = await Text.find().skip(start).limit(linesQnt);
    } catch(e) {
      result = {error: 'something wrong'};
    }
   res.json(result);
});

// в параметре запроса - номер страницы

router.get('/:page', async (req, res) => {

// linesQnt - количество выводимых элементов на странице, нужно получать с фронта
   const linesQnt = 5;

   const start = (req.params.page - 1) * linesQnt;

   let result;
   try {
      result = await Text.find().skip(start).limit(linesQnt);
    } catch(e) {
      result = {error: 'something wrong'};
    }
   res.json(result);
});

module.exports = router;