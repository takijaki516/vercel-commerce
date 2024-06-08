import { Footer } from "@/components/footer";
import { Collections } from "@/components/search/collections";
import FilterList from "@/components/search/filter";
import { sorting } from "@/lib/constants";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl flex-col">
        <div>
          <Collections />
        </div>

        <div>{children}</div>

        <div>
          <FilterList list={sorting} title="sort by" />
        </div>
      </div>

      <Footer />
    </>
  );
}
