const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const { apiLimiter } = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const ApiError = require('./utils/apiError');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit request body size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate Limiting
app.use('/api', apiLimiter);

// API Routes
app.use('/api/v1', routes);

// Swagger Documentation
try {
  const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.log('Swagger docs not found or invalid format.');
}

// 404 Handler for unknown routes
app.use((req, res, next) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`, 'ROUTE_NOT_FOUND'));
});

// Centralized Error Handling
app.use(errorHandler);

module.exports = app;
