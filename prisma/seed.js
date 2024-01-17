import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.category.deleteMany();
  await prisma.size.deleteMany();
  await prisma.color.deleteMany();

  const categories = [
    {
      id: 1,
      name: "上着",
    },
    {
      id: 2,
      name: "パンツ",
    },
  ];

  const sizes = [
    {
      id: 1,
      name: "S",
    },
    {
      id: 2,
      name: "M",
    },
    {
      id: 3,
      name: "L",
    },
    {
      id: 4,
      name: "LL",
    },
    {
      id: 5,
      name: "3L",
    },
    {
      id: 6,
      name: "4L",
    },
    {
      id: 7,
      name: "5L",
    },
  ];

  const colors = [
    {
      id: 1,
      name: "ホワイト",
    },
    {
      id: 2,
      name: "ブルー",
    },
    {
      id: 3,
      name: "グリーン",
    },
  ];

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
