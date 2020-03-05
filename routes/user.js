const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Text = require('../models/text');


router.get('/:id', async (req, res) => {
  let result;
  try {
    const user = await User.findById(req.params.id);
    const text = await Text.find({user_id: req.params.id});

    const textArr = text.map(obj => obj.text);

    result = {
       name: user.name,
       text: textArr
    };
  } catch(e) {
    result = {error: 'something wrong'};
  }

  res.json(result);
});


module.exports = router;