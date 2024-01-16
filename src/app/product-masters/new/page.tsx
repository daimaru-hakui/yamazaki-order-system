import { db } from "@/db";
import { redirect } from "next/navigation";

export default async function ProductMasterCreatePage() {
  const categories = await db.category.findMany();
  const sizes = await db.size.findMany();
  const colors = await db.color.findMany();

  const createProduct = async (formData: FormData) => {
    "use server";
    const number = formData.get("number") as string;
    const name = formData.get("name") as string;
    const categoryId = formData.get("categoryId") as string;

    const product = await db.product.create({
      data: {
        number,
        name,
        categoryId: parseInt(categoryId),
      },
    });
    console.log(product);
    redirect(`/product-masters/${product.id}`);
  };

  const dlStyle = "flex items-start py-3 border-b";
  const dtStyle = "w-[calc(200px)] font-bold";
  const ddStyle = "w-full";
  const selectStyle =
    "shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const inputStyle =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

  return (
    <div className="p-6 border rounded bg-white">
      <div>商品マスター登録</div>
      <form action={createProduct}>
        <div className="mt-6">
          <dl className={`${dlStyle}`}>
            <dt className={`${dtStyle}`}>品番</dt>
            <dd className={`${ddStyle}`}>
              <div>
                <input name="number" className={`${inputStyle} w-full`} />
              </div>
            </dd>
          </dl>
          <dl className={`${dlStyle}`}>
            <dt className={`${dtStyle}`}>品名</dt>
            <dd className={`${ddStyle}`}>
              <div>
                <input name="name" className={`${inputStyle} w-full`} />
              </div>
            </dd>
          </dl>
          <dl className={`${dlStyle}`}>
            <dt className={`${dtStyle}`}>カテゴリー</dt>
            <dd className={`${ddStyle}`}>
              <div>
                <select defaultValue={1} name="categoryId" className={`${selectStyle}`}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </dd>
          </dl>
          <dl className={`${dlStyle}`}>
            <dt className={`${dtStyle}`}>説明文</dt>
            <dd className={`${ddStyle}`}>
              <div>
                <textarea className={`${inputStyle} w-full`}></textarea>
              </div>
            </dd>
          </dl>
        </div>
        <div className="mt-6">
          <button type="submit" className="w-full px-3 py-1 text-white rounded bg-blue-500">登録</button>
        </div>
      </form>
      {/* <div className="mt-6 overflow-auto">
        <table className="table-auto border-collapse border min-w-[calc(600px)]">
          <thead>
            <tr className="text-left">
              <th className="p-1">JANコード</th>
              <th className="p-1">カラー</th>
              <th className="p-1">サイズ</th>
              <th className="p-1">価格</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-1">
                <input className={`${inputStyle}`} />
              </td>
              <td className="p-1">
                <select className={`${selectStyle} w-52`}>
                  {colors.map((color) => (
                    <option key={color.id}>{color.name}</option>
                  ))}
                </select>
              </td>
              <td className="p-1">
                <select className={`${selectStyle} w-20`}>
                  {sizes.map((size) => (
                    <option key={size.id}>{size.name}</option>
                  ))}
                </select>
              </td>
              <td className="p-1">
                <input type="number" className={`${inputStyle}`} />
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
