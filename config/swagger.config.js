const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Specification (OpenAPI 3.0.0)
    info: {
      title: 'Library Management API',
      version: '1.0.0',
      description: 'API documentation for the Library Management System backend.',
    },
    servers: [
      {
        url: '/api', // Use a relative path since all main routes are under /api
        description: 'Primary API server',
      },
    ],
    components: {
        securitySchemes: {
            // Example of a basic security scheme if you add authentication later
            // BearerAuth: {
            //     type: 'http',
            //     scheme: 'bearer',
            //     bearerFormat: 'JWT',
            // }
        }
    }
  },
  apis: [
    '../routes/*.js', 
    '../models/*.js'        
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;