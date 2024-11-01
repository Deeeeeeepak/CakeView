import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, description, price, stock, imageUrl } = req.body;

    try {
      const updatedProduct = await prisma.cake.update({
        where: { id: parseInt(id as string) },
        data: { name, description, price: parseFloat(price), stock: parseInt(stock), imageUrl },
      });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating product', error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.cake.delete({ where: { id: parseInt(id as string) } });
      return res.status(204).json({ message: 'Product deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting product', error });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
