/* eslint-disable consistent-return */


const Book = require('../models/book');

function getBooks(req, res) {
  Book.find({}, (err, books) => {
    if (err) return res.status(500).send({ message: 'error al realizar la peticion' });
    if (books.length === 0) return res.status(404).send({ message: 'No exiten libros' });

    res.status(200).send({ books });
  });
}

function getBook(req, res) {
  const { bookId } = req.params;

  Book.findById(bookId, (err, book) => {
    if (err) return res.status(500).send({ message: 'error al realizar la peticion' });
    if (!book) return res.status(404).send({ message: 'el libto no existe' });

    res.status(200).send({ book });
  });
}

function createBook(req, res) {
  const book = new Book(req.body);

  book.save((err, newBook) => {
    if (err) return res.status(400).send({ message: 'error guardando el libro', err });

    return res.status(200).send({ message: 'libro guardado', newBook });
  });
}

function replaceBook(req, res) {
  const { bookId } = req.params;
  const { title } = req.body;
  const { ISBN } = req.body;
  const { author } = req.body;
  const { price } = req.body;
  const { publisher } = req.body;
  const { date } = req.body;
  const { description } = req.body;

  if (!title || !ISBN || !author || !price || !publisher || !date || !description) {
    return res.status(400).send({ message: 'faltan datos' });
  }

  const bookReplacement = req.body;

  Book.findById(bookId, (err, book) => {
    if (err) return res.status(404).send({ message: 'no se ha encontrado libro para remplazar', err });

    // Replaces the book
    book.replaceOne(bookReplacement, (error) => {
      if (error) return res.status(500).send({ error });

      return res.status(200).send({ message: 'libro remplazado' });
    });
  });
}


function updateBook(req, res) {
  const { bookId } = req.params;
  const update = req.body;

  Book.findByIdAndUpdate(bookId, update, (err, bookUpdated) => {
    if (err) res.status(500).send({ message: `Error al actualizar el libro: ${err}` });


    res.status(200).send({ message: 'libro actualizado', book: bookUpdated });
  });
}

function deleteBook(req, res) {
  const { bookId } = req.params;

  Book.findByIdAndDelete(bookId, (err, book) => {
    if (err) res.status(500).send({ message: `Error al borrar el libro: ${err}` });
    if (!book) return res.status(404).send({ message: 'libro no encontardo' });

    return res.status(200).send({ message: 'libro borrado', book });
  });
}

function SearchBook(req, res) {
  const par = { $regex: req.params.par };
  Book.find({
    $or: [
      { title: par },
      { ISBN: par },
      { author: par },
      { price: par },
      { date: par },
    ],
  }, (err, book) => {
    if (err) return res.status(500).send({ message: 'error', err });
    if (book.length === 0) return res.status(404).send({ message: 'No se ha encontrado el libro' });

    return res.status(200).send({ message: 'libro encontrado', book });
  });
}


function getBookTitle(req, res) {
  const title = { title: { $regex: req.params.title } };

  Book.find(title, (err, book) => {
    if (err) return res.status(500).send({ message: 'error', err });
    if (book.length === 0) return res.status(404).send({ message: 'No se ha encontrado el libro' });

    return res.status(200).send({ message: 'libro encontrado', book });
  });
}

function getBookISBN(req, res) {
  const ISBN = { ISBN: { $regex: req.params.ISBN } };

  Book.find(ISBN, (err, book) => {
    if (err) return res.status(500).send({ message: 'error', err });
    if (book.length === 0) return res.status(404).send({ message: 'No se ha encontrado el libro' });

    return res.status(200).send({ message: 'libro encontrado', book });
  });
}

function getBookAuthor(req, res) {
  const author = { author: { $regex: req.params.author } };

  Book.find(author, (err, book) => {
    if (err) return res.status(500).send({ message: 'error', err });
    if (book.length === 0) return res.status(404).send({ message: 'No se ha encontrado el libro' });

    return res.status(200).send({ message: 'libro encontrado', book });
  });
}

function getBookPrice(req, res) {
  const price = { price: { $regex: req.params.price } };

  Book.find(price, (err, book) => {
    if (err) return res.status(500).send({ message: 'error', err });
    if (book.length === 0) return res.status(404).send({ message: 'No se ha encontrado el libro' });

    return res.status(200).send({ message: 'libro encontrado', book });
  });
}

function getBookDate(req, res) {
  const date = { date: { $regex: req.params.date } };

  Book.find(date, (err, book) => {
    if (err) return res.status(500).send({ message: 'error', err });
    if (book.length === 0) return res.status(404).send({ message: 'No se ha encontrado el libro' });

    return res.status(200).send({ message: 'libro encontrado', book });
  });
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  replaceBook,
  updateBook,
  deleteBook,
  SearchBook,
  getBookTitle,
  getBookISBN,
  getBookAuthor,
  getBookPrice,
  getBookDate,
};
