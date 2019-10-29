const express = require('express');
const bookCtrl = require('../controllers/book-controller');

const bookRoutes = express.Router();

bookRoutes.get('/book', bookCtrl.getBooks);
bookRoutes.get('/book/:bookId', bookCtrl.getBook);
bookRoutes.post('/book', bookCtrl.createBook);
bookRoutes.put('/book/:bookId', bookCtrl.replaceBook);
bookRoutes.patch('/book/:bookId', bookCtrl.updateBook);
bookRoutes.delete('/book/:bookId', bookCtrl.deleteBook);
bookRoutes.get('/book/title/:title', bookCtrl.getBookTitle);
bookRoutes.get('/book/ISBN/:ISBN', bookCtrl.getBookISBN);
bookRoutes.get('/book/author/:author', bookCtrl.getBookAuthor);
bookRoutes.get('/book/price/:price', bookCtrl.getBookPrice);
bookRoutes.get('/book/date/:date', bookCtrl.getBookDate);

module.exports = bookRoutes;
