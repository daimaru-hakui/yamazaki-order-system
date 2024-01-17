import { db } from "@/db";

export default async function ProductMastersPage() {
  const products = await db.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      productName: "asc",
    },
  });

  if (!products) {
  }

  return (
    <div className="mx-auto max-w-[calc(600px)]">
      <table>
        <thead>
          <tr>
            <th>品番</th>
            <th>品名</th>
            <th>カテゴリー</th>
            <th>編集</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.productNumber}</td>
              <td>{product.productName}</td>
              <td>{product.category?.name}</td>
              <td>
                <button className="px-3 py-1 text-white text-sm rounded bg-blue-500">
                  詳細
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
