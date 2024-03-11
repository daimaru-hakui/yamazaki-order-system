export const getTotalAmount = (
  array: { quantity: number; price: number }[]
):string => {
  let sum = 0;
  array.forEach((item) => {
    sum += (item.quantity * item.price);
  });
  return sum.toLocaleString();
};
