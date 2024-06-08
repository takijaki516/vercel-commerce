import Link from "next/link";

import { GridTileImage } from "./tile";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: any;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div>
      <Link href={`/product/${item.title}`}>
        <GridTileImage
          src={item.featuredImage}
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
            currencyCode: item.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid({ products }: { products: any }) {
  const homePageItems = products;

  if (!homePageItems[0] || !homePageItems[1] || !homePageItems[2]) return null;

  const [firstItem, secondItem, thirdItem] = homePageItems;

  return (
    <section>
      <ThreeItemGridItem size="full" item={firstItem} priority={true} />
      <ThreeItemGridItem size="half" item={secondItem} priority={true} />
      <ThreeItemGridItem size="half" item={thirdItem} />
    </section>
  );
}
