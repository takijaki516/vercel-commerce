import Link from "next/link";

import { Grid } from "./grid";
import { GridTileImage } from "./grid/tile";

// TODO: fix type any
export default function ProductGridItems({ products }: { products: any }) {
  return (
    <>
      {products.map((product: any) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link href={`/product/${product.handle}`}>
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.price,
                currencyCode: product.currencyCode,
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
