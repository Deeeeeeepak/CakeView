const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cakes = [
    {
      name: "Chocolate Cake",
      description: "Delicious chocolate cake topped with chocolate frosting.",
      price: 19.99,
      stock: 50,
      imageUrl: "https://example.com/images/chocolate-cake.jpg",
    },
    {
      name: "Vanilla Cake",
      description: "Classic vanilla cake with a creamy vanilla frosting.",
      price: 17.99,
      stock: 30,
      imageUrl: "https://example.com/images/vanilla-cake.jpg",
    },
    {
      name: "Red Velvet Cake",
      description: "Rich red velvet cake with cream cheese frosting.",
      price: 22.99,
      stock: 20,
      imageUrl: "https://example.com/images/red-velvet-cake.jpg",
    },
    {
      name: "Lemon Cake",
      description: "Zesty lemon cake with lemon glaze.",
      price: 18.99,
      stock: 25,
      imageUrl: "https://example.com/images/lemon-cake.jpg",
    },
    {
      name: "Carrot Cake",
      description: "Moist carrot cake with cream cheese frosting.",
      price: 20.99,
      stock: 15,
      imageUrl: "https://example.com/images/carrot-cake.jpg",
    },
  ];

  for (const cake of cakes) {
    await prisma.cake.create({ data: cake });
  }

  console.log("Seeding completed!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
