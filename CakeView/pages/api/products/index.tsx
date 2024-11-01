import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Extract query parameters
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const name = req.query.name as string;
      const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
      const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

      // Calculate skip value for pagination
      const skip = (page - 1) * limit;

      // Build the where clause for filtering
      const where: any = {};
      
      if (name) {
        where.name = {
          contains: name,
          mode: 'insensitive' // Case-insensitive search
        };
      }

      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = minPrice;
        if (maxPrice) where.price.lte = maxPrice;
      }

      // Get total count for pagination
      const total = await prisma.cake.count({ where });

      // Get paginated and filtered results
      const products = await prisma.cake.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          name: 'asc'
        }
      });

      // Calculate pagination metadata
      const totalPages = Math.ceil(total / limit);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return res.status(200).json({
        data: products,
        pagination: {
          total,
          totalPages,
          currentPage: page,
          limit,
          hasNextPage,
          hasPreviousPage
        }
      });
    } catch (error) {
      console.error('Error in GET /api/products:', error);
      return res.status(500).json({ message: 'Error fetching products', error });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}