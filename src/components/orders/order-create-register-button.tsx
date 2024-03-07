"use client";
import { useStore } from "@/store";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import FormButton from "../common/form-button";

export default function OrderCreateRegisterButtonArea() {
  const cart = useStore((state) => state.cart);
  const orderOptions = useStore((state) => state.orderOptions);

  const [formState, action] = useFormState(
    actions.createOrder.bind(null, { cart, orderOptions }),
    {
      errors: {},
    }
  );
console.log(formState.errors)
  return (
    <div className="fixed left-0 bottom-0 flex justify-center items-center p-3 w-full h-16 bg-white drop-shadow-2xl">
      <form
        action={action}
        className="grid place-items-center gap-3 w-full mx-auto px-3"
      >
        <FormButton className="w-full max-w-96">登録する</FormButton>
      </form>
    </div>
  );
}
