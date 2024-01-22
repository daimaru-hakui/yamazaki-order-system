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
  customerShow(customerId: number) {
    return `/customers/${customerId}`;
  },
  customerCreate() {
    return `/customers/new`;
  },
};

export default paths;
