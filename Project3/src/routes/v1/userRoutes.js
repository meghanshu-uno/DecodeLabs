const express = require('express');
const { z } = require('zod');
const userController = require('../../controllers/userController');
const validateResource = require('../../middlewares/validateResource');

const router = express.Router();

// Validation Schemas
const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }).min(2, 'Name must be at least 2 characters long'),
    email: z.string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    role: z.enum(['admin', 'user']).optional().default('user'),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
    email: z.string().email('Not a valid email').optional(),
    role: z.enum(['admin', 'user']).optional(),
  }),
  params: z.object({
    id: z.string({
      required_error: 'User ID is required',
    }),
  }),
});

const getUserSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'User ID is required',
    }),
  }),
});

// Routes
router
  .route('/')
  .get(userController.getAllUsers)
  .post(validateResource(createUserSchema), userController.createUser);

router
  .route('/:id')
  .get(validateResource(getUserSchema), userController.getUserById)
  .put(validateResource(updateUserSchema), userController.updateUser)
  .delete(validateResource(getUserSchema), userController.deleteUser);

module.exports = router;
