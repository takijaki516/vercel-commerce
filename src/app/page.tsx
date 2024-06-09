import { getProducts } from "./actions";
import { Carousel } from "@/components/carousel";
import { Footer } from "@/components/footer";
import { ThreeItemGrid } from "@/components/grid/three-items";

export default async function Home() {
  const homePageItems = await getProducts({});

  return (
    <>
      <ThreeItemGrid products={homePageItems.slice(0, 3)} />
      <Carousel product={homePageItems} />
      <Footer />
    </>
  );
}
