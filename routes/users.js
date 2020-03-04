const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Text = require('../models/text');

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


router.get('/', async (req, res) => {
  const texts = await Text.find();

  res.json(texts);
});

module.exports = router;