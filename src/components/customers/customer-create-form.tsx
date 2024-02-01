"use client";
import { Input, Textarea } from "@nextui-org/react";
import FormButton from "../common/form-button";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import TitleReturn from "../common/title-return";
import paths from "@/paths";

export default function CustomerCreateForm() {
  const [formState, action] = useFormState(actions.createCustomer, {
    errors: {},
  });

  return (
    <>
      <TitleReturn title="工場登録" path={paths.customerAll()} />
      <div className="mt-3 p-6 rounded-xl shadow-md bg-white">
        <form className="" action={action}>
          <div className="flex flex-col gap-6">
            <Input
              isRequired
              name="code"
              type="text"
              label="顧客コード"
              labelPlacement={"outside"}
              placeholder="顧客コード"
              isInvalid={!!formState?.errors.code}
              errorMessage={formState?.errors.code?.join(", ")}
            />
            <Input
              isRequired
              name="name"
              type="text"
              label="顧客名"
              labelPlacement={"outside"}
              placeholder="顧客名"
              isInvalid={!!formState?.errors.name}
              errorMessage={formState?.errors.name?.join(", ")}
            />
            <Input
              name="address"
              type="text"
              label="住所"
              labelPlacement={"outside"}
              placeholder="住所"
            />
            <Input
              name="tel"
              type="text"
              label="Tel"
              labelPlacement={"outside"}
              placeholder="Tel"
            />
            <Textarea
              label="備考"
              labelPlacement="outside"
              placeholder=""
              className="w-full"
            ></Textarea>
            <div className="text-center">
              <FormButton>登録</FormButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
