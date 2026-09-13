const connectDB = async () => {
  console.log('Mock Database Connected (Prisma bypassed for Localhost preview)');
};

const disconnectDB = async () => {};

module.exports = {
  prisma: {},
  connectDB,
  disconnectDB,
};
