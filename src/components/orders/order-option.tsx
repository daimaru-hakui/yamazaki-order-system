import { useStore } from "@/store";
import { Input, Textarea } from "@nextui-org/react";

export default function OrderOption(){
    return (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-xl drop-shadow-md">
            <Input label="発注ナンバー" labelPlacement="outside" placeholder=" " />
            <Textarea label="備考" labelPlacement="outside"/>
        </div>
    )
}