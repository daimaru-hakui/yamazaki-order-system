import { db } from "@/db";

export default async function ProductMastersPage() {
  const products = await db.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy:{
        name:'asc'
    }
  });

  return (
    <div className="mx-auto max-w-[calc(600px)]">
      <table>
        <thead>
          <tr>
            <th>品番</th>
            <th>品名</th>
            <th>カテゴリー</th>
            <th>備考</th>
            <th>編集</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.number}</td>
              <td>{product.name}</td>
              <td>{product.category.name}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
