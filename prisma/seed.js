const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function main() {
  // await prisma.category.deleteMany();
  // await prisma.size.deleteMany();
  // await prisma.color.deleteMany();

  const customers = [
    {
      code: 1,
      name: "大阪工場",
    },
    {
      code: 2,
      name: "京都工場",
    },
  ];

  const categories = [
    {
      code: 1,
      name: "上着",
    },
    {
      code: 2,
      name: "パンツ",
    },
  ];

  const sizes = [
    {
      code: 1,
      name: "S",
    },
    {
      code: 2,
      name: "M",
    },
    {
      code: 3,
      name: "L",
    },
    {
      code: 4,
      name: "LL",
    },
    {
      code: 5,
      name: "3L",
    },
    {
      code: 6,
      name: "4L",
    },
    {
      code: 7,
      name: "5L",
    },
  ];

  const colors = [
    {
      code: 1,
      name: "ホワイト",
    },
    {
      code: 2,
      name: "ブルー",
    },
    {
      code: 3,
      name: "グリーン",
    },
  ];

  await prisma.customer.createMany({
    data: customers,
  });

  await prisma.category.createMany({
    data: categories,
  });
  await prisma.size.createMany({
    data: sizes,
  });
  await prisma.color.createMany({
    data: colors,
  });
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
