import * as React from "react";
import { Product, ProductVariant } from "@prisma/client";

import { Price } from "../price";
import { AddToCart } from "../cart/add-to-cart";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({
  product,
}: {
  product: Product & { size_variants: ProductVariant[] };
}) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b border-neutral-200 pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={product.price} />
        </div>
      </div>

      {/* TODO: add product variants */}
      <React.Suspense>
        <VariantSelector sizeVariants={product.size_variants} />
      </React.Suspense>

      {/* <React.Suspense fallback={null}>
        <AddToCart />
      </React.Suspense> */}
    </>
  );
}
