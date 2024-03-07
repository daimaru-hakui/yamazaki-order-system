import ShippingList from "@/components/shippings/shipping-list";
import { db } from "@/db";

export default async function ShippingsPage() {
  const shippingDedails = await db.shippingDetail.findMany({
    orderBy: {
      shipping: {
        shippingDate: "desc"
      }
    },
    include: {
      shipping: {
        select: {
          id: true,
          shippingDate: true,
          order: {
            select: {
              id:true,
              createdAt: true,
              customer: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      },
      sku: {
        include: {
          size: {
            select: {
              name: true
            }
          },
          product: {
            select: {
              productNumber: true,
              productName: true,
              color: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  });
  console.log(shippingDedails);
  return (
    <div className="mt-6 mx-auto w-full max-w-[calc(1000px)]">
      <ShippingList shippingDetails={shippingDedails} />
    </div>
  );
}