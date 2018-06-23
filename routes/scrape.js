const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');


router.get('/', (req, res) => {
  let myResults = [];
  axios.get('https://techcrunch.com/')
    .then(response => {
      
      const $ = cheerio.load(response.data);
      $(".post-block").each(function (i, element) {
        let results = {};
        results.title = $(this).find('.post-block__title > a').text().trim();
        results.link = $(this).find('.post-block__title > a').attr("href").trim();
        results.summary = $(this).find('.post-block__content').text().trim();
        myResults.push(results);
      });
      
      res.status(200).json(myResults);
    });
});

module.exports = router;