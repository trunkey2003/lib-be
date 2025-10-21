const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors.controller.js');

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Author management
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *           example: "6715e7f7c9a2b1a5a7b9f123"
 *         name:
 *           type: string
 *           example: "Haruki Murakami"
 *         biography:
 *           type: string
 *           example: "Japanese writer known for blending pop culture with magical realism."
 *         birthDate:
 *           type: string
 *           format: date-time
 *           example: "1949-01-12T00:00:00.000Z"
 *         nationality:
 *           type: string
 *           example: "Japanese"
 *         email:
 *           type: string
 *           format: email
 *           example: "haruki@example.com"
 *         website:
 *           type: string
 *           example: "https://www.harukimurakami.com"
 *         books:
 *           type: array
 *           description: Virtual population of books authored by this author
 *           items:
 *             type: object
 *           example: []
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     AuthorCreate:
 *       type: object
 *       required: [name]
 *       properties:
 *         name:
 *           type: string
 *         biography:
 *           type: string
 *         birthDate:
 *           type: string
 *           format: date-time
 *         nationality:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         website:
 *           type: string
 *     AuthorUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         biography:
 *           type: string
 *         birthDate:
 *           type: string
 *           format: date-time
 *         nationality:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         website:
 *           type: string
 *     AuthorStats:
 *       type: object
 *       description: Example stats payload for an author
 *       properties:
 *         authorId:
 *           type: string
 *           example: "6715e7f7c9a2b1a5a7b9f123"
 *         booksCount:
 *           type: integer
 *           example: 12
 *         firstPublicationYear:
 *           type: integer
 *           example: 1982
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Not found"
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorCreate'
 *           example:
 *             name: "Nguyễn Nhật Ánh"
 *             biography: "Vietnamese author of children's literature."
 *             birthDate: "1955-05-07T00:00:00.000Z"
 *             nationality: "Vietnamese"
 *             email: "nna@example.com"
 *             website: "https://example.com"
 *     responses:
 *       201:
 *         description: Author created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Author ID
 *         required: true
 *         schema:
 *           type: string
 *           example: "6715e7f7c9a2b1a5a7b9f123"
 *     responses:
 *       200:
 *         description: Author found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Author ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorUpdate'
 *           example:
 *             biography: "Updated bio"
 *             website: "https://new-site.example"
 *     responses:
 *       200:
 *         description: Author updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Author ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted (no content)
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /authors/{id}/stats:
 *   get:
 *     summary: Get aggregated stats for an author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Author ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorStats'
 *             example:
 *               authorId: "6715e7f7c9a2b1a5a7b9f123"
 *               booksCount: 8
 *               firstPublicationYear: 2004
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.get('/', authorsController.getAllAuthors);

router.get('/:id', authorsController.getAuthorById);
router.get('/:id/stats', authorsController.getAuthorStats);
router.post('/', authorsController.createAuthor);
router.put('/:id', authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;