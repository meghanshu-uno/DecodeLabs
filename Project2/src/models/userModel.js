// In-memory data store for simulation
let users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
];

const findAll = async () => {
  return users;
};

const findById = async (id) => {
  return users.find((user) => user.id === id);
};

const create = async (userData) => {
  const newUser = {
    id: String(Date.now()),
    ...userData,
  };
  users.push(newUser);
  return newUser;
};

const update = async (id, updateData) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updateData };
  return users[index];
};

const remove = async (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return false;
  
  users.splice(index, 1);
  return true;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
