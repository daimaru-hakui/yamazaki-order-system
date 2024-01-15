import { useStore } from "@/store";

export default function ProductList() {
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);
  const setActivePage = useStore((state) => state.setActivePage);

  const prevPage = () => {
    setCart({ ...cart, customer: { id: undefined, name: "" } });
    setActivePage(1);
  };

  const data = [
    {
      id: 1,
      productNumber: "SP110",
      productName: "コックコート",
      colors: [
        {
          id: 1,
          skus: [
            {
              id: 1,
              code: 13110201,
              price: 1100,
              size: "M",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded"
        onClick={prevPage}
      >
        工場選択へ戻る
      </button>
      <div className="mt-6">{cart.customer.name}</div>
    </div>
  );
}
