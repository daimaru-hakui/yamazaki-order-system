import CustomerCreateForm from "@/components/customers/customer-create-form";

export default async function CustomerCreatePage() {
  return (
    <>
      <div className="text-center text-xl font-bold">顧客登録</div>
      <div className="mt-3 p-6 border rounded bg-white">
        <CustomerCreateForm />
      </div>
    </>
  );
}