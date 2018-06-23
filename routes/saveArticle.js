const express = require('express');
const router = express.Router();

const db = require('../models');


router.post('/', (req, res) => {
  const data = req.body;

  db.Article.create(data).then(function (dbArticle) {
    res.send(dbArticle);
  }).catch(function (err) {  
    return res.json(err);
  });
});

module.exports = router;