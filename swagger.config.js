const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Specification (OpenAPI 3.0.0)
    info: {
      title: 'Library Management API',
      version: '1.0.0',
      description: 'API documentation for the Library Management System backend.',
    }
  },
  apis: [
    './routes/*.js', 
    './models/*.js',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;