const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function main() {
  // await prisma.category.deleteMany();
  // await prisma.size.deleteMany();
  // await prisma.color.deleteMany();

  const customers = [
    {
      ediCode: "77000720",
      code: "35728",
      name: "山パン 安城工場 人事",
    },
    {
      ediCode: "77000721",
      code: "35727",
      name: "山パン 安城冷生地 事務課",
    },
    {
      ediCode: "05000720",
      code: "35727",
      name: "山パン 横浜第一工場 人事",
    },
    {
      ediCode: "12000720",
      code: "35121",
      name: "山パン 横浜第二工場 人事",
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
