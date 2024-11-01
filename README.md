# Cake Shop Dashboard Backend

## Project Overview
This is a backend system for a Cake Shop Store Dashboard, featuring full CRUD operations for cake products using Next.js, Prisma, and a relational database.

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v18 or later)
- npm (v9 or later)
- Git
- GitHub account

## Technology Stack
- Next.js
- TypeScript
- Prisma ORM
- Neon.tech (PostgreSQL)

## Clone the Repository
```bash
git clone https://github.com/Deeeeeeepak/cake-shop-dashboard.git
cd cake-shop-dashboard
```

## Database Setup with Neon.tech

### 1. Create Neon.tech Account
1. Visit [Neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project

### 2. Database Connection
1. In Neon.tech dashboard, go to "Connection Details"
2. Copy your PostgreSQL connection string

### 3. Configure Environment Variables
Create a `.env` file in the project root with the following content:
```env
DATABASE_URL="postgresql://[USERNAME]:[PASSWORD]@[ENDPOINT]/[DATABASE]?sslmode=require"
```

**Note:** Replace the placeholders with your actual Neon.tech connection details.

## Installation

### Install Dependencies
```bash
npm install
```

### Prisma Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Optional: Seed database with sample data
npx prisma db seed
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Product Management
- `POST /api/products/add`: Add a new cake product
- `GET /api/products`: Retrieve all products (with pagination)
- `PUT /api/products/[id]`: Update a product
- `DELETE /api/products/[id]`: Delete a product

## Testing

### Run Tests
```bash
npm test
```

## Features
- Create, Read, Update, Delete (CRUD) operations for cake products
- Pagination for product listing
- TypeScript support
- Error handling
- Server-side rendering

## Bonus Features
- Filtering products by price or name

## Troubleshooting
- Ensure all environment variables are correctly set
- Check database connection
- Verify Prisma migrations are up to date

## Screenshots
![image](https://github.com/user-attachments/assets/b203056b-4555-4e1a-ba19-6a9ccb92bd97)


![image](https://github.com/user-attachments/assets/a2392c9f-5c0c-4ce0-b228-c334208e907b)


![image](https://github.com/user-attachments/assets/4b51f6c1-ae7b-4bb7-8c95-788f3c1e7c2f)


![image](https://github.com/user-attachments/assets/2d3a6ee1-d0e1-4697-9537-9784ec71f0b9)


![image](https://github.com/user-attachments/assets/bed8508f-d074-4f83-98c8-9082ad20365a)


![image](https://github.com/user-attachments/assets/a7e486b4-1c24-47c5-823f-d03bda68e30b)


![image](https://github.com/user-attachments/assets/5956b648-79d1-4dfc-9c74-5302153e413b)


![image](https://github.com/user-attachments/assets/39a0633f-f861-4213-bb9b-984886376aa2)


![image](https://github.com/user-attachments/assets/6cef01f4-0f3a-4b06-8118-96f99bf4922a)


![image](https://github.com/user-attachments/assets/c4655ebc-deb4-40b3-aa49-6bf7e1245321)


![image](https://github.com/user-attachments/assets/126a22d9-6a0e-4106-b143-0812ffbbcdea)


![image](https://github.com/user-attachments/assets/1ca0bd91-a323-4614-ae16-f78b10592705)


![image](https://github.com/user-attachments/assets/41e1d23a-15fb-451c-bc74-fd91a9c109a4)



## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
