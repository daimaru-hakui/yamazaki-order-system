const paths = {
  home() {
    return "/";
  },
  productAll() {
    return `/products`;
  },
  productShow(productId: number) {
    return `/products/${productId}`;
  },
  productCreate() {
    return `/products/new`;
  },
  productEdit(productId: number) {
    return `/products/${productId}/edit`;
  },
  customerAll() {
    return `/customers`;
  },
  customerShow(customerId: number) {
    return `/customers/${customerId}`;
  },
  customerCreate() {
    return `/customers/new`;
  },
  customerEdit(customerId: number) {
    return `/customers/${customerId}/edit`;
  },
  orderCreate() {
    return `/orders/new`;
  },
  orderProductCreate(customerId: number) {
    return `/orders/new/${customerId}`;
  },
  cartShow() {
    return `/orders/cart`
  }
};

export default paths;
