const paths = {
  home() {
    return "/";
  },
  productAll() {
    return `/products`;
  },
  productShow(productId: string) {
    return `/products/${productId}`;
  },
  productCreate() {
    return `/products/new`;
  },
  productEdit(productId: string) {
    return `/products/${productId}/edit`;
  },
  customerAll() {
    return `/customers`;
  },
  customerShow(customerId: string) {
    return `/customers/${customerId}`;
  },
  customerCreate() {
    return `/customers/new`;
  },
  customerEdit(customerId: string) {
    return `/customers/${customerId}/edit`;
  },
  orderAll() {
    return `/orders`;
  },
  orderCreate() {
    return `/orders/new`;
  },
  orderProductCreate(customerId: string) {
    return `/orders/new/${customerId}`;
  },
  orderCompleate(orderId: string) {
    return `/orders/${orderId}/compleate`;
  },
  orderConfirm() {
    return `/orders/new/confirm`;
  },
  orderAction(orderId: string) {
    return `/orders/${orderId}/action`;
  },
  csvCreate() {
    return `/csv-upload`;
  },
};

export default paths;
