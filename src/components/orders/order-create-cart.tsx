import { useStore } from "@/store";
import { BsTrash3 } from "react-icons/bs";
import OrderCreateQuantityInput from "./order-create-quantiy-input";

export default function OrderCreateCart() {
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);
  const removeCart = useStore((state) => state.removeCart);

  const handleRemoveCart = (skuId: string) => {
    removeCart(skuId);
  };

  const updateQuantity = (skuId: string, quantity: number) => {
    const newCart = cart.map((item) => {
      if (item.skuId === skuId) {
        return {
          ...item,
          quantity,
        };
      } else {
        return item;
      }
    });
    console.log(newCart);
    setCart(newCart);
  };

  return (
    <div className="col-span-5 border-l">
     <div className="p-3 bg-gray-100">カート</div>
      <div className="overflow-auto h-[calc(100vh-220px)]">
        {cart.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div>データがありません。</div>
          </div>
        ) : (
          <div className="grid">
            {cart.map((item, idx) => (
              <div
                key={item.skuId}
                className={`flex justify-between items-center px-3 py-2 mb-1 border-b`}
              >
                <div>
                  <div className="text-xs flex justify-between">
                    <div>{`${item.productNumber} ${item.productName}`}</div>
                    <div> {`￥${item.price}`}</div>
                  </div>
                  <div className="mt-2 text-lg flex items-center gap-1">
                    <div className="w-8 text-center">{item.size}</div>
                    <div>×</div>
                    <OrderCreateQuantityInput
                      skuId={item.skuId}
                      quantity={item.quantity}
                      updateQuantity={updateQuantity}
                    />
                    <div>=</div>
                    <div>{(item.price * item.quantity).toLocaleString()}円</div>
                  </div>
                </div>
                <div>
                  <BsTrash3
                    className="cursor-pointer"
                    onClick={() => handleRemoveCart(item.skuId)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
