const userService = require('../services/userService');
const ApiResponse = require('../utils/apiResponse');

const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, sort, order, role } = req.query;
    const result = await userService.getAllUsers(page, limit, sort, order, role);
    res.status(200).json(new ApiResponse(200, result, 'Users retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(new ApiResponse(200, user, 'User retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(new ApiResponse(201, user, 'User created successfully'));
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, user, 'User updated successfully'));
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    // 204 No Content typically doesn't have a body, but if we want to return a standard JSON, we can use 200.
    // Following standard REST: 204 for successful deletion.
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
