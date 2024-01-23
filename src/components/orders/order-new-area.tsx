"use client";
import { useStore } from "@/store";
import OrderCustomerList from "./order-customer-list";
import OrderProductList from "./order-product-list";
import { Product, type Customer, CustomerProduct, Color } from "@prisma/client";
import { useEffect, useState } from "react";

interface ProductWithColor extends Product {
  color: Color;
}

interface CustomerProductWithProduct extends CustomerProduct {
  product: ProductWithColor;
}

interface CustomerWithProduct extends Customer {
  customerProduct: CustomerProductWithProduct[];
}

interface OrderNewAreaProps {
  customers: CustomerWithProduct[];
}

export default function OrderNewArea({ customers }: OrderNewAreaProps) {
  const cart = useStore((state) => state.cart);
  const [products, setProducts] = useState<(ProductWithColor)[]>([]);
  console.log(cart);

  useEffect(() => {
    const customer = customers
      .find((customer) => customer.id === cart.customer.id);
    if (!customer) return;
    const products = customer.customerProduct.map((cp) => ({
      ...cp.product
    }));
    if (!products) return;
    setProducts(products);
  }, [cart, customers]);

  const activePage = useStore((state) => state.activePage);
  return (
    <div>
      {activePage === 1 && <OrderCustomerList customers={customers} />}
      {activePage === 2 && <OrderProductList products={products} />}
    </div>
  );
}
