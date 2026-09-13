const ApiError = require('../utils/apiError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    const errorCode = error.errorCode || 'INTERNAL_ERROR';
    error = new ApiError(statusCode, message, errorCode, error.details || []);
  }

  const response = {
    success: false,
    error: {
      code: error.errorCode,
      message: error.message,
      ...(error.details.length > 0 && { details: error.details }),
    },
  };

  if (process.env.NODE_ENV === 'development') {
    response.error.stack = error.stack;
  }

  res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
