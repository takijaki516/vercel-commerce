import { Product } from "@/lib/types";
import * as React from "react";
import { Price } from "../price";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div>
        <h1>{product.title}</h1>
        <div>
          <Price />
        </div>
      </div>
      {/* 
      <React.Suspense fallback={null}>
        <VariantSelector />
      </React.Suspense> */}

      <React.Suspense fallback={null}>
        <AddToCart />
      </React.Suspense>
    </>
  );
}
