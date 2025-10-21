const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 * schemas:
 * Author:
 * type: object
 * required:
 * - name
 * properties:
 * _id:
 * type: string
 * description: The auto-generated ID of the author (populated by Mongoose)
 * name:
 * type: string
 * description: The author's full name
 * example: J.R.R. Tolkien
 * biography:
 * type: string
 * description: A brief summary of the author's life
 * birthDate:
 * type: string
 * format: date
 * description: The author's date of birth
 * nationality:
 * type: string
 * description: The author's nationality
 * email:
 * type: string
 * format: email
 * description: The author's email address
 * website:
 * type: string
 * format: url
 * description: The author's official website
 * books:
 * type: array
 * description: Virtual field to list associated book IDs (not stored in DB)
 * items:
 * $ref: '#/components/schemas/Book'
 */
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  biography: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date
  },
  nationality: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  website: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

authorSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author'
});

authorSchema.set('toJSON', { virtuals: true });
authorSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Author', authorSchema);