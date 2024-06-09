import Link from "next/link";

import { GridTileImage } from "./grid/tile";
import { Product } from "@prisma/client";

// TODO: make it infinite scroll
export async function Carousel({ product }: { product: Product[] }) {
  if (product.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="animate-carousel flex gap-4">
        {products.map((product: any, index: number) => (
          <li
            key={index}
            className="relative aspect-video h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.title}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.price,
                  currencyCode: product.currencyCode,
                }}
                src={product.featuredImage}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
