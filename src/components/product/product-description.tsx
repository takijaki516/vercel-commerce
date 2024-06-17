import * as React from "react";
import { Product } from "@prisma/client";

import { Price } from "../price";
import { AddToCart } from "../cart/add-to-cart";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6">
        <h1 className="mb-2">{product.title}</h1>
        <div className="mr-auto w-auto">
          <Price amount={product.price} />
        </div>
      </div>

      {/* TODO: add product variants */}

      {/* <React.Suspense fallback={null}>
        <AddToCart />
      </React.Suspense> */}
    </>
  );
}
