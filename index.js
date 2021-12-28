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
      return;
    }
    res.redirect('/books');
    console.log('Book inserted');
  });
});

app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const books = data;
    res.render('books', { books });
    console.log(books);
  });
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const book = data[0];
    res.render('book', { book });
    console.log(book);
  });
});

app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const book = data[0];
    res.render('editbook', { book });
    console.log(book);
  });
});

app.post('/books/updatebook', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const author = req.body.author;
  const release_year = req.body.release_year;
  const publisher = req.body.publisher;
  const pages = req.body.pages;

  const sql = `UPDATE books SET title = '${title}', author = '${author}', release_year = '${release_year}', publisher = '${publisher}', pages = '${pages}' WHERE id = ${id}`;

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/books');
    console.log('Book updated');
  });
});

app.get('/', (req, res) => {
  res.render('home');
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