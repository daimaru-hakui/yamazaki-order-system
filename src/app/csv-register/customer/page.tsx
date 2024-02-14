import CsvRegisterCustomer from "@/components/csv-register/customer/csv-register-customer";
import { db } from "@/db";

export default async function CsvRegisterCustomerPage(){
     const customers = await db.customer.findMany();

  return (
    <div className="mx-auto max-w-[calc(800px)]">
      <CsvRegisterCustomer customers={customers} />
    </div>
  );
}