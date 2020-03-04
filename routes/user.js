const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
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


router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  const text = await Text.find({user_id: req.params.id})

  const textArr = text.map(obj => obj.text)

  const result = {
     name: user.name,
     text: textArr
  }

  res.json(result);
});


router.post('/', (req, res) => {

   const { username } = req.body;
    
   res.json({
     token: jwt.sign(username, 'secretKey'),
   });
 });

module.exports = router;