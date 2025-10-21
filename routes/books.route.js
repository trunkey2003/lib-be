const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller.js');

/**
 * @swagger
 * tags:
 * name: Books
 * description: Book management and retrieval
 */

/**
 * @swagger
 * /books:
 * get:
 * summary: Retrieve a paginated list of all books, with optional filters and search
 * tags: [Books]
 * parameters:
 * - in: query
 * name: page
 * schema:
 * type: integer
 * default: 1
 * description: The page number
 * - in: query
 * name: limit
 * schema:
 * type: integer
 * default: 10
 * description: The number of items to return per page
 * - in: query
 * name: genre
 * schema:
 * type: string
 * enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 'Romance', 'Biography', 'History', 'Science', 'Self-Help', 'Other']
 * description: Filter books by genre
 * - in: query
 * name: inStock
 * schema:
 * type: boolean
 * description: Filter books by stock status (true or false)
 * - in: query
 * name: search
 * schema:
 * type: string
 * description: Search in book title and description (uses Mongoose $text search)
 * responses:
 * 200:
 * description: A list of books.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * data:
 * type: array
 * items:
 * $ref: '#/components/schemas/Book'
 * totalPages:
 * type: integer
 * example: 5
 * currentPage:
 * type: integer
 * example: 1
 * total:
 * type: integer
 * example: 50
 * 500:
 * description: Server error
 *
 * post:
 * summary: Create a new book
 * tags: [Books]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * title:
 * type: string
 * example: The Hobbit
 * author:
 * type: string
 * description: ID of the existing author
 * example: 60d5ec49c63c784340d0e6a3
 * isbn:
 * type: string
 * example: 9780618260300
 * genre:
 * type: string
 * example: Fantasy
 * price:
 * type: number
 * example: 15.99
 * responses:
 * 201:
 * description: Book created successfully
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * data:
 * $ref: '#/components/schemas/Book'
 * 400:
 * description: Invalid input or ISBN already exists
 * 404:
 * description: Author not found
 * 500:
 * description: Server error
 *
 * /books/{id}:
 * get:
 * summary: Get a single book by ID
 * tags: [Books]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The book ID
 * responses:
 * 200:
 * description: Book found
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * data:
 * $ref: '#/components/schemas/Book'
 * 404:
 * description: Book not found
 * 500:
 * description: Server error
 *
 * put:
 * summary: Update an existing book
 * tags: [Books]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The book ID
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Book'
 * responses:
 * 200:
 * description: Book updated successfully
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * data:
 * $ref: '#/components/schemas/Book'
 * 400:
 * description: Invalid input
 * 404:
 * description: Book or Author not found
 * 500:
 * description: Server error
 *
 * delete:
 * summary: Delete a book
 * tags: [Books]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The book ID
 * responses:
 * 200:
 * description: Book deleted successfully
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * message:
 * type: string
 * example: Book deleted successfully
 * 404:
 * description: Book not found
 * 500:
 * description: Server error
 *
 * /books/author/{authorId}:
 * get:
 * summary: Retrieve books by a specific author
 * tags: [Books]
 * parameters:
 * - in: path
 * name: authorId
 * required: true
 * schema:
 * type: string
 * description: The author ID
 * responses:
 * 200:
 * description: A list of books by the author.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * data:
 * type: array
 * items:
 * $ref: '#/components/schemas/Book'
 * count:
 * type: integer
 * example: 3
 * 500:
 * description: Server error
 */
router.get('/', booksController.getAllBooks);
router.get('/author/:authorId', booksController.getBooksByAuthor);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;