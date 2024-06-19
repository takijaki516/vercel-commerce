import Link from "next/link";
import { Product } from "@prisma/client";

import { Grid } from "./grid";
import { GridTileImage } from "./grid/tile";

// TODO: fix type any
export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.id}`}
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.price,
              }}
              src={product.mainImage}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
