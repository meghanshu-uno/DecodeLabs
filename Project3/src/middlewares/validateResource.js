const { ZodError } = require('zod');
const ApiError = require('../utils/apiError');

const validateResource = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const details = err.issues ? err.issues.map((error) => ({
        field: error.path.join('.'),
        message: error.message,
      })) : [];
      next(new ApiError(400, 'Validation Failed', 'VALIDATION_ERROR', details));
    } else {
      console.error('Validation Error:', err);
      next(err);
    }
  }
};

module.exports = validateResource;
