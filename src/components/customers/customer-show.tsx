"use client"
import paths from "@/paths";
import TitleReturn from "../common/title-return";
import { useRouter } from "next/navigation";

export default function CustomerShow() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.back();
        }}
      >戻る</button>
      <TitleReturn title="工場詳細" path={paths.customerAll()} />
    </div>
  );
}
