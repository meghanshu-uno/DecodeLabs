# Project 3: Database Integration

This project upgrades the temporary in-memory data store from Project 2 into a robust, permanent database using **PostgreSQL** and **Prisma ORM**.

## Features Implemented
- **Relational Schema**: A `User` model and a `Profile` model (1:1 relationship) defined in `prisma/schema.prisma`.
- **Database Connection Manager**: Handled via `PrismaClient` in `src/config/db.js` with graceful shutdowns.
- **Advanced CRUD**: The `getAllUsers` endpoint now supports `page`, `limit`, `sort`, `order`, and `role` query parameters.
- **Data Integrity & Security**: Prisma automatically protects against SQL injection through parameterized queries and handles constraints (e.g., unique emails).

## Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL Server running locally or remotely.

### 2. Install Dependencies
Run the following command to install the required packages, including Prisma and the Prisma Client:
```bash
npm install
npm install prisma --save-dev
npm install @prisma/client
```

### 3. Environment Configuration
Update the `.env` file with your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/decodelabs_db?schema=public"
PORT=3000
NODE_ENV=development
```

### 4. Database Migration & Seeding
Prisma provides tools to create the database schema and populate it with mock data.

**Run the Migration:**
This command reads `prisma/schema.prisma` and creates the necessary tables in your database:
```bash
npx prisma migrate dev --name init
```

**Seed the Database:**
This command executes `prisma/seed.js` to insert mock users and profiles into the database:
```bash
npx prisma db seed
```
*(Alternatively, you can just run `npm run db:seed` if you configure it, but the above command works natively with the `"prisma": { "seed": "..." }` config in `package.json`).*

### 5. Start the Server
```bash
npm run dev
```

The API will now run on `http://localhost:3000`, connected directly to your PostgreSQL instance.
