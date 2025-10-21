const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller.js');

// Book routes
router.get('/', booksController.getAllBooks);
router.get('/author/:authorId', booksController.getBooksByAuthor);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;