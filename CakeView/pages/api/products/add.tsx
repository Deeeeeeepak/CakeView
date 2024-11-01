import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description, price, stock, imageUrl } = req.body;

    // Validate fields
    if (!name || !description || price === undefined || stock === undefined || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const newProduct = await prisma.cake.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          stock: parseInt(stock),
          imageUrl,
        },
      });
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating product', error });
    }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
