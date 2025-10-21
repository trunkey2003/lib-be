const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors.controller.js');

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);
router.get('/:id/stats', authorsController.getAuthorStats);
router.post('/', authorsController.createAuthor);
router.put('/:id', authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;