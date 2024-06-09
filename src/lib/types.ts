export type Edge<T> = {
  node: T;
};

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type SEO = {
  title: string;
  description: string;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createAt: string;
  updateAt: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

// NOTE: product
export type Product = {
  id: string;

  title: string;
  description: string;
  availableForSale: boolean;

  options: ProductOption[];
  price: number;
  currencyCode: string;
  featuredImage: Image;
  images: Image[];
  tags: string[];
  updatedAt: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type PlatformCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type Collection = {
  title: string;
  description: string;

  updatedAt: string;
  createdAt: string;
};

// NOTE: cart
export type Cart = Omit<PlatformCart, "lines"> & {
  lines: CartItem[];
};

export type PlatformCartOperation = {
  data: {
    cart: PlatformCart;
  };
  variables: {
    cartId: string;
  };
};

export type PlatformCreateCartOperation = {
  data: {
    cartCreate: { cart: PlatformCart };
  };
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};
