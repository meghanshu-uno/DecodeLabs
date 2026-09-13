const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  // Clean existing data
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@decodelabs.com',
      role: 'ADMIN',
      profile: {
        create: {
          bio: 'Lead System Administrator',
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
      profile: {
        create: {
          bio: 'Full Stack Intern at DecodeLabs',
        },
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'USER',
    },
  });

  console.log('Seeding finished.');
  console.log('Created Users:', { user1, user2, user3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
