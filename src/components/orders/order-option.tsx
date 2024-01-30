import { useStore } from "@/store";
import { Input, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface OrderOption {
  customerId: string;
}
export default function OrderOption({ customerId }: OrderOption) {
  const orderOption = useStore((state) => state.orderOption);
  const setOrderOption = useStore((state) => state.setOrderOption);
  const userId = useSession().data?.user.uid || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setOrderOption({ ...orderOption, [name]: value });
  };

  useEffect(() => {
    setOrderOption({ ...orderOption, customerId, userId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, setOrderOption, userId]);

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-xl drop-shadow-md">
      <Input
        name="orderNumber"
        label="発注ナンバー"
        labelPlacement="outside"
        placeholder=" "
        onChange={handleChange}
      />
      <Textarea
        name="comment"
        label="備考"
        labelPlacement="outside"
        onChange={handleChange}
      />
    </div>
  );
}
