import Link from "next/link";
import { Product } from "@prisma/client";

import { GridTileImage } from "./tile";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.id}`}
      >
        <GridTileImage
          src={item.mainImage}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.title,
            amount: item.price,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid({ products }: { products: Product[] }) {
  const homePageItems = products;

  if (!homePageItems[0] || !homePageItems[1] || !homePageItems[2]) return null;

  const [firstItem, secondItem, thirdItem] = homePageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstItem} priority={true} />
      <ThreeItemGridItem size="half" item={secondItem} priority={true} />
      <ThreeItemGridItem size="half" item={thirdItem} />
    </section>
  );
}
