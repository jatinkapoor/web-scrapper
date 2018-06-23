const express = require('express');
const router = express.Router();

const db = require('../models');


router.post('/', (req, res) => {
  const data = req.body;

  db.Article.find({link: data.link}).then(result => {
    
    if (result.length === 0) {
      db.Article.create(data).then(function (dbArticle) {
        res.send(dbArticle);
      }).catch(function (err) {
        return res.json(err);
      });
    } else {
      return res.status(409).json("This article already saved.");
    }
  });


  
});

module.exports = router;