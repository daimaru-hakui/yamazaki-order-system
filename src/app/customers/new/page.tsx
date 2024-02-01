import CustomerCreateForm from "@/components/customers/customer-create-form";

export default async function CustomerCreatePage() {
  return (
    <>
      <div className="mx-auto max-w-[calc(600px)]">
        <CustomerCreateForm />
      </div>
    </>
  );
}
