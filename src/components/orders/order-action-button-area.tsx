"use client";
import FormButtonClient from "../common/form-button-client";

interface OrderActionButtonArea {
  isPending?: boolean;
}

export default function OrderActionButtonArea({ isPending }: OrderActionButtonArea) {

  return (
    <div className="fixed left-0 bottom-0 flex justify-center items-center p-3 w-full h-16 bg-white drop-shadow-2xl">
      <FormButtonClient className="w-full max-w-96" isPending={isPending}>登録する</FormButtonClient>
    </div>
  );
}
