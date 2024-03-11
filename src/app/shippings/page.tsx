import ShippingList from "@/components/shippings/shipping-list";
import { db } from "@/db";

export default async function ShippingsPage() {
  let shippingDedails;
  try {
    shippingDedails = await db.shippingDetail.findMany({
      orderBy: {
        shipping: {
          id: "desc",
        },
      },
      include: {
        shipping: {
          select: {
            id: true,
            shippingDate: true,
            order: {
              select: {
                id: true,
                createdAt: true,
                customer: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        sku: {
          include: {
            size: {
              select: {
                name: true,
              },
            },
            product: {
              select: {
                productNumber: true,
                productName: true,
                color: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  } finally {
    await db.$disconnect();
  }

  if (!shippingDedails) {
    return (
      <div className="mx-auto p-6 w-[calc(600px)] ]">
        ページがありません。
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 lg:w-[calc(100vw-300px)] xl:max-w-[calc(1600px)">
      <ShippingList shippingDetails={shippingDedails} />
    </div>
  );
}
