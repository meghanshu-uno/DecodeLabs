const userModel = require('../models/userModel');
const ApiError = require('../utils/apiError');

const getAllUsers = async () => {
  return await userModel.findAll();
};

const getUserById = async (id) => {
  const user = await userModel.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found', 'RESOURCE_NOT_FOUND');
  }
  return user;
};

const createUser = async (userData) => {
  return await userModel.create(userData);
};

const updateUser = async (id, updateData) => {
  const user = await userModel.update(id, updateData);
  if (!user) {
    throw new ApiError(404, 'User not found', 'RESOURCE_NOT_FOUND');
  }
  return user;
};

const deleteUser = async (id) => {
  const success = await userModel.remove(id);
  if (!success) {
    throw new ApiError(404, 'User not found', 'RESOURCE_NOT_FOUND');
  }
  return true;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
