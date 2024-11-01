Cake Shop Store Dashboard
Table of Contents
Introduction
Prerequisites
Installation
Database Setup
Environment Variables
Running the Application
Testing the API
Features
Screenshots
Contributing
License
Introduction
This repository contains the backend system for a Cake Shop Store Dashboard built with Next.js, TypeScript, and Prisma. The dashboard allows users to add, view, and manage cake products through a REST API.

Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js (v14 or higher)
npm or yarn package manager
A Neon.tech account for database setup
Basic knowledge of TypeScript and RESTful APIs
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/cake-shop-dashboard.git
Replace yourusername with your GitHub username.

Navigate to the project directory:

bash
Copy code
cd cake-shop-dashboard
Install dependencies:

bash
Copy code
npm install
or if you prefer yarn:

bash
Copy code
yarn install
Database Setup
Sign up for an account at Neon.tech and create a new database.

Set up Prisma:

Run the following command to initialize Prisma:
bash
Copy code
npx prisma init
Configure your prisma/schema.prisma file to use PostgreSQL with the connection string provided by Neon.tech.
Example schema.prisma:
prisma
Copy code
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id          Int     @id @default(autoincrement())
  name        String
  description String?
  price       Float
  stock       Int
  imageUrl    String?
}
Run migrations to set up the database:

bash
Copy code
npx prisma migrate dev --name init
Seed the database with sample data (optional):

Create a prisma/seed.ts file to add sample products.
Run the seed command:
bash
Copy code
npx ts-node prisma/seed.ts
Environment Variables
Create a .env file in the root of the project with the following content:

env
Copy code
DATABASE_URL=your_neon_database_connection_string
Replace your_neon_database_connection_string with the actual connection string from Neon.tech.

Running the Application
Start the Next.js application:

bash
Copy code
npm run dev
or

bash
Copy code
yarn dev
Open your browser and navigate to http://localhost:3000 to view the dashboard.

Testing the API
You can test the API using tools like Postman or CURL. Here are the endpoints you can test:

Add Product: POST /api/products
Get All Products: GET /api/products
Update Product: PUT /api/products/:id
Delete Product: DELETE /api/products/:id
Make sure to provide the necessary data in the request body for the respective endpoints.

Features
Product Entry: Add new cake products with details such as name, description, price, stock quantity, and image URL.
Product Retrieval: Retrieve all products with pagination support.
Product Update: Update cake details as needed.
Product Deletion: Remove products from the inventory.
Filtering: Filter products by price or name (if implemented).
Screenshots
(Add relevant screenshots of the application here)

Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any changes or improvements.
