const express = require('express'); 
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// Swagger definition configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'A simple Express API documented with Swagger',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string'
            },
            lastName: {
              type: 'string'
            },
            email: {
              type: 'string',
              format: 'email'
            }
          },
          required: ['firstName', 'lastName', 'email']
        }
      }
    }
  },
  // Path to the API docs (files containing @swagger annotations)
  apis: ['./server.js', './routes/*.js'], 
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res, next)=>{
  res.write('<h1>Welcome to the User Management System</h1>');
  res.send();
})
//add routers
app.use(userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
