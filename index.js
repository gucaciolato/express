const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/books/insertbook', (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const release_year = req.body.release_year;
  const publisher = req.body.publisher;
  const pages = req.body.pages;

  const sql = `INSERT INTO books (title, author, release_year, publisher, pages) VALUES ('${title}', '${author}', '${release_year}', '${publisher}', '${pages}')`;

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
    console.log('Book inserted');
  });
});

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('Connected to database');
  app.listen(3000);
});