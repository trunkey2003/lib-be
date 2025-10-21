const Book = require('../models/Book.js');
const Author = require('../models/Author.js');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, inStock, search } = req.query;
    
    const query = {};
    
    // Filter by genre
    if (genre) query.genre = genre;
    
    // Filter by stock status
    if (inStock !== undefined) query.inStock = inStock === 'true';
    
    // Search in title and description
    if (search) {
      query.$text = { $search: search };
    }
    
    const books = await Book.find({query})
      .populate('author', 'name nationality')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await Book.countDocuments(query);
    
    res.json({
      success: true,
      data: books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author');
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private (add authentication middleware as needed)
exports.createBook = async (req, res) => {
  try {
    // Verify author exists
    const authorExists = await Author.findById(req.body.author);
    if (!authorExists) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }
    
    const book = await Book.create(req.body);
    
    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Book with this ISBN already exists'
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Failed to create book',
      error: error.message
    });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
exports.updateBook = async (req, res) => {
  try {
    // If updating author, verify the author exists
    if (req.body.author) {
      const authorExists = await Author.findById(req.body.author);
      if (!authorExists) {
        return res.status(404).json({
          success: false,
          message: 'Author not found'
        });
      }
    }
    
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update book',
      error: error.message
    });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get books by author
// @route   GET /api/books/author/:authorId
// @access  Public
exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.authorId })
      .populate('author', 'name nationality');
    
    res.json({
      success: true,
      data: books,
      count: books.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};