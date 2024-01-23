import paths from "@/paths";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default async function CustomerShowPage(){
    return (
        <div className="mx-auto max-w-[calc(600px)]">
        <div className="flex justify-center gap-6 relative">
          <Link
            href={paths.customerAll()}
            className="flex items-center gap-3 absolute left-0"
          >
            <AiOutlineArrowLeft className="text-xl" />
            戻る
          </Link>
          <div className="font-bold">詳細画面</div>
        </div>
      </div>
    )
}