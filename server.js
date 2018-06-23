const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const expressHandleBars = require('express-handlebars');

const scrapeRouter = require('./routes/scrape');
const homeRouter = require('./routes/home');
const saveArticleRouter = require('./routes/saveArticle'); 
const savedArticlesRouter = require('./routes/savedArticles');



const app = express();
const PORT = process.env.port || 3000;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.engine('handlebars', expressHandleBars({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


const db = require('./models');

mongoose.connect("mongodb://127.0.0.1:27017/webScrapper");

app.use('/', homeRouter);
app.use('/scrape', scrapeRouter);
app.use('/save', saveArticleRouter);
app.use('/savedArticles', savedArticlesRouter)

app.listen(PORT, () => console.log(`App listening on PORT - ${PORT}`));