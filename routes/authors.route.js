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