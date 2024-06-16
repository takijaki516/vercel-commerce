import { prismaDB } from "@/lib/prisma-db";

import { Carousel } from "@/components/carousel";
import { Footer } from "@/components/footer";
import { ThreeItemGrid } from "@/components/grid/three-items";

export default async function Home() {
  const homePageProducts = await prismaDB.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <ThreeItemGrid products={homePageProducts.slice(0, 3)} />
      <Carousel products={homePageProducts} />
      <Footer />
    </>
  );
}
