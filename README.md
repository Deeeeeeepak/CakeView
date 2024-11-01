<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cake Shop Store Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        h1, h2, h3 {
            color: #333;
        }
        h1 {
            font-size: 2em;
        }
        h2 {
            margin-top: 20px;
            font-size: 1.5em;
        }
        h3 {
            margin-top: 15px;
            font-size: 1.2em;
        }
        code {
            background-color: #eaeaea;
            padding: 2px 4px;
            border-radius: 4px;
        }
        pre {
            background-color: #eaeaea;
            padding: 10px;
            border-radius: 4px;
            overflow: auto;
        }
        a {
            color: #0066cc;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

    <h1>Cake Shop Store Dashboard</h1>

    <h2>Table of Contents</h2>
    <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#database-setup">Database Setup</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
        <li><a href="#running-the-application">Running the Application</a></li>
        <li><a href="#testing-the-api">Testing the API</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#screenshots">Screenshots</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
    </ul>

    <h2 id="introduction">Introduction</h2>
    <p>This repository contains the backend system for a Cake Shop Store Dashboard built with Next.js, TypeScript, and Prisma. The dashboard allows users to add, view, and manage cake products through a REST API.</p>

    <h2 id="prerequisites">Prerequisites</h2>
    <p>Before you begin, ensure you have met the following requirements:</p>
    <ul>
        <li><a href="https://nodejs.org/">Node.js</a> (v14 or higher)</li>
        <li><a href="https://www.npmjs.com/">npm</a> or <a href="https://yarnpkg.com/">yarn</a> package manager</li>
        <li>A Neon.tech account for database setup</li>
        <li>Basic knowledge of TypeScript and RESTful APIs</li>
    </ul>

    <h2 id="installation">Installation</h2>
    <ol>
        <li><strong>Clone the repository:</strong>
            <pre><code>git clone https://github.com/yourusername/cake-shop-dashboard.git</code></pre>
            Replace <code>yourusername</code> with your GitHub username.
        </li>
        <li><strong>Navigate to the project directory:</strong>
            <pre><code>cd cake-shop-dashboard</code></pre>
        </li>
        <li><strong>Install dependencies:</strong>
            <pre><code>npm install</code></pre>
            or if you prefer yarn:
            <pre><code>yarn install</code></pre>
        </li>
    </ol>

    <h2 id="database-setup">Database Setup</h2>
    <ol>
        <li><strong>Sign up for an account at <a href="https://neon.tech/">Neon.tech</a> and create a new database.</strong></li>
        <li><strong>Set up Prisma:</strong>
            <ol>
                <li>Run the following command to initialize Prisma:
                    <pre><code>npx prisma init</code></pre>
                </li>
                <li>Configure your <code>prisma/schema.prisma</code> file to use PostgreSQL with the connection string provided by Neon.tech.</li>
                <li>Example <code>schema.prisma</code>:
                    <pre><code>datasource db {
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
                    </code></pre>
                </li>
            </ol>
        </li>
        <li><strong>Run migrations to set up the database:</strong>
            <pre><code>npx prisma migrate dev --name init</code></pre>
        </li>
        <li><strong>Seed the database with sample data (optional):</strong>
            <ol>
                <li>Create a <code>prisma/seed.ts</code> file to add sample products.</li>
                <li>Run the seed command:
                    <pre><code>npx ts-node prisma/seed.ts</code></pre>
                </li>
            </ol>
        </li>
    </ol>

    <h2 id="environment-variables">Environment Variables</h2>
    <p>Create a <code>.env</code> file in the root of the project with the following content:</p>
    <pre><code>DATABASE_URL=your_neon_database_connection_string</code></pre>
    <p>Replace <code>your_neon_database_connection_string</code> with the actual connection string from Neon.tech.</p>

    <h2 id="running-the-application">Running the Application</h2>
    <ol>
        <li>Start the Next.js application:
            <pre><code>npm run dev</code></pre>
            or
            <pre><code>yarn dev</code></pre>
        </li>
        <li>Open your browser and navigate to <code>http://localhost:3000</code> to view the dashboard.</li>
    </ol>

    <h2 id="testing-the-api">Testing the API</h2>
    <p>You can test the API using tools like Postman or CURL. Here are the endpoints you can test:</p>
    <ul>
        <li><strong>Add Product:</strong> <code>POST /api/products</code></li>
        <li><strong>Get All Products:</strong> <code>GET /api/products</code></li>
        <li><strong>Update Product:</strong> <code>PUT /api/products/:id</code></li>
        <li><strong>Delete Product:</strong> <code>DELETE /api/products/:id</code></li>
    </ul>
    <p>Make sure to provide the necessary data in the request body for the respective endpoints.</p>

    <h2 id="features">Features</h2>
    <ul>
        <li><strong>Product Entry:</strong> Add new cake products with details such as name, description, price, stock quantity, and image URL.</li>
        <li><strong>Product Retrieval:</strong> Retrieve all products with pagination support.</li>
        <li><strong>Product Update:</strong> Update cake details as needed.</li>
        <li><strong>Product Deletion:</strong> Remove products from the inventory.</li>
        <li><strong>Filtering:</strong> Filter products by price or name (if implemented).</li>
    </ul>

    <h2 id="screenshots">Screenshots</h2>
    <p>(Add relevant screenshots of the application here)</p>

    <h2 id="contributing">Contributing</h2>
    <p>Contributions are welcome! Please fork the repository and submit a pull request for any changes or improvements.</p>

    <h2 id="license">License</h2>
    <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
