const express = require('express');
const router = express.Router();

const db = require('../models');


router.get('/', (req, res) => {
  db.Article.find({}).then((articles) => {
    const hbsObj = {
      articles: articles
    }
    res.render('savedArticles', hbsObj);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id.split('-')[1];
  db.Article.findOne({ _id: id })
    .populate("notes")
    .then((articles) => {
      res.send(articles.notes);
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id.split('-')[1];
  db.Article.remove({ _id: id }).then(result => {
    res.send('deleted');
  });
});

router.post('/notes', (req, res) => {

  const id = req.body.id.split('-')[1];
  const title = req.body.note;
  db.Notes.create({title}).then(dbNote => {
    return db.Article.findOneAndUpdate({ _id: id }, { $push: { notes: dbNote._id } }, { new: true });
  }).then((dbArticle) => {
    res.json(dbArticle);
  }).catch((err) => {
    res.json(err);
  });
});


router.delete('/notes/:id', (req, res) => {

  const id = req.params.id;

  db.Notes.remove({ _id: id }).then(result => {
    res.send('deleted');
  });
});


module.exports = router;