const Author = require('../models/Author');
const Book = require('../models/Book');

// @desc    Get all authors
// @route   GET /api/authors
// @access  Public
exports.getAllAuthors = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, nationality } = req.query;
    
    const query = {};
    
    // Filter by nationality
    if (nationality) query.nationality = nationality;
    
    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    const authors = await Author.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ name: 1 });
    
    const count = await Author.countDocuments(query);
    
    res.json({
      success: true,
      data: authors,
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

// @desc    Get single author by ID
// @route   GET /api/authors/:id
// @access  Public
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }
    
    // Get author's books
    const books = await Book.find({ author: req.params.id });
    
    res.json({
      success: true,
      data: {
        ...author.toObject(),
        books: books
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new author
// @route   POST /api/authors
// @access  Private (add authentication middleware as needed)
exports.createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    
    res.status(201).json({
      success: true,
      data: author
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create author',
      error: error.message
    });
  }
};

// @desc    Update author
// @route   PUT /api/authors/:id
// @access  Private
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }
    
    res.json({
      success: true,
      data: author
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update author',
      error: error.message
    });
  }
};

// @desc    Delete author
// @route   DELETE /api/authors/:id
// @access  Private
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }
    
    // Check if author has books
    const booksCount = await Book.countDocuments({ author: req.params.id });
    
    if (booksCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete author with ${booksCount} associated books. Delete books first.`
      });
    }
    
    await Author.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Author deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get author statistics
// @route   GET /api/authors/:id/stats
// @access  Public
exports.getAuthorStats = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }
    
    const books = await Book.find({ author: req.params.id });
    
    const stats = {
      totalBooks: books.length,
      averageRating: books.length > 0 
        ? (books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(2)
        : 0,
      totalPages: books.reduce((sum, book) => sum + (book.pages || 0), 0),
      genres: [...new Set(books.map(book => book.genre))],
      inStockBooks: books.filter(book => book.inStock).length
    };
    
    res.json({
      success: true,
      data: {
        author: author,
        statistics: stats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};