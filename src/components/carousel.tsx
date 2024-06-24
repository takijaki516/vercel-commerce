import Link from "next/link";
import { Product } from "@prisma/client";

import { GridTileImage } from "./grid/tile";
import MarQuee from "./magicui/marquee";

export async function Carousel({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return null;
  }
  // NOTE: product는 최신순으로 들어온다. 최대 10개

  return (
    <div className="mb-6 mt-1">
      <ul>
        <MarQuee pauseOnHover>
          {products.map((product: Product, index: number) => (
            <li
              key={index}
              className="relative aspect-video h-[30vh] max-h-[275px] w-2/3 max-w-[475px] md:w-1/3"
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
                  }}
                  src={product.mainImage}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
            </li>
          ))}
        </MarQuee>
      </ul>
    </div>
  );
}
