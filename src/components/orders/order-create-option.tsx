import { useStore } from "@/store";
import { Input, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function OrderCreateOption() {
  const orderOption = useStore((state) => state.orderOptions);
  const setOrderOption = useStore((state) => state.setOrderOptions);
  const userId = useSession().data?.user.uid || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setOrderOption({ ...orderOption, [name]: value });
  };

  useEffect(()=>{
    setOrderOption({ ...orderOption, userId });
  },[])

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
