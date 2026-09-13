const ApiError = require('../utils/apiError');

const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@decodelabs.com', role: 'ADMIN' },
  { id: '2', name: 'John Doe', email: 'john@example.com', role: 'USER' }
];

const getAllUsers = async (page = 1, limit = 10) => {
  return { users: mockUsers, pagination: { total: 2, page, limit, totalPages: 1 } };
};

const getUserById = async (id) => {
  const user = mockUsers.find(u => u.id === id);
  if (!user) throw new ApiError(404, 'User not found', 'RESOURCE_NOT_FOUND');
  return user;
};

const createUser = async (userData) => {
  const newUser = { id: String(Date.now()), ...userData };
  mockUsers.push(newUser);
  return newUser;
};

const updateUser = async (id, updateData) => {
  return { id, ...updateData };
};

const deleteUser = async (id) => {
  return true;
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
