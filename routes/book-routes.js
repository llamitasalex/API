const express = require('express');
const bookCtrl = require('../controllers/book-controller');
// const auth = require('../middleware/auth');

const bookRoutes = express.Router();

bookRoutes.get('/', bookCtrl.getBooks);
bookRoutes.get('/:bookId', bookCtrl.getBook);
bookRoutes.post('/', bookCtrl.createBook);
bookRoutes.put('/:bookId', bookCtrl.replaceBook);
bookRoutes.patch('/:bookId', bookCtrl.updateBook);
bookRoutes.delete('/:bookId', bookCtrl.deleteBook);
bookRoutes.get('/title/:title', bookCtrl.getBookTitle);
bookRoutes.get('/ISBN/:ISBN', bookCtrl.getBookISBN);
bookRoutes.get('/author/:author', bookCtrl.getBookAuthor);
bookRoutes.get('/price/:price', bookCtrl.getBookPrice);
bookRoutes.get('/date/:date', bookCtrl.getBookDate);

module.exports = bookRoutes;
