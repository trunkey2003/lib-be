const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors.controller.js');

/**
 * @swagger
 * tags:
 * name: Authors
 * description: Author management and retrieval
 */

/**
 * @swagger
 * /authors:
 * get:
 * summary: Retrieve a paginated list of all authors
 * tags: [Authors]
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
 * name: search
 * schema:
 * type: string
 * description: Search authors by name
 * - in: query
 * name: nationality
 * schema:
 * type: string
 * description: Filter authors by nationality
 * responses:
 * 200:
 * description: A list of authors.
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
 * $ref: '#/components/schemas/Author'
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
 * summary: Create a new author
 * tags: [Authors]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * example: George R.R. Martin
 * nationality:
 * type: string
 * example: American
 * responses:
 * 201:
 * description: Author created successfully
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * data:
 * $ref: '#/components/schemas/Author'
 * 400:
 * description: Invalid input
 * 500:
 * description: Server error
 *
 * /authors/{id}:
 * get:
 * summary: Get a single author by ID, including their books
 * tags: [Authors]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The author ID
 * responses:
 * 200:
 * description: Author found
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * data:
 * allOf:
 * - $ref: '#/components/schemas/Author'
 * - type: object
 * properties:
 * books:
 * type: array
 * items:
 * $ref: '#/components/schemas/Book'
 * 404:
 * description: Author not found
 * 500:
 * description: Server error
 *
 * put:
 * summary: Update an existing author
 * tags: [Authors]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The author ID
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Author'
 * responses:
 * 200:
 * description: Author updated successfully
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * data:
 * $ref: '#/components/schemas/Author'
 * 400:
 * description: Invalid input
 * 404:
 * description: Author not found
 * 500:
 * description: Server error
 *
 * delete:
 * summary: Delete an author
 * tags: [Authors]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The author ID
 * responses:
 * 200:
 * description: Author deleted successfully
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
 * example: Author deleted successfully
 * 400:
 * description: Cannot delete author with associated books
 * 404:
 * description: Author not found
 * 500:
 * description: Server error
 *
 * /authors/{id}/stats:
 * get:
 * summary: Get statistics for a single author
 * tags: [Authors]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The author ID
 * responses:
 * 200:
 * description: Author statistics retrieved successfully
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * data:
 * type: object
 * properties:
 * author:
 * $ref: '#/components/schemas/Author'
 * statistics:
 * type: object
 * properties:
 * totalBooks:
 * type: integer
 * example: 5
 * averageRating:
 * type: string
 * example: "4.50"
 * totalPages:
 * type: integer
 * example: 3500
 * genres:
 * type: array
 * items:
 * type: string
 * example: ["Fantasy", "Science Fiction"]
 * inStockBooks:
 * type: integer
 * example: 3
 * 404:
 * description: Author not found
 * 500:
 * description: Server error
 */
router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);
router.get('/:id/stats', authorsController.getAuthorStats);
router.post('/', authorsController.createAuthor);
router.put('/:id', authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;