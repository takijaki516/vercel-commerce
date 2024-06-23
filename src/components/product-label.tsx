import { Price } from "./price";
import { cn } from "@/lib/utils";

export function ProductLabel({
  title,
  amount,
  position = "bottom",
}: {
  title: string;
  amount: number;
  position?: "bottom" | "center";
}) {
  return (
    <div
      className={cn(
        "@container/label absolute bottom-0 left-0 flex w-full px-4 pb-4",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        },
      )}
    >
      <div className="flex items-center rounded-full border border-neutral-200 bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
          {title}
        </h3>
        <Price
          className="flex-none rounded-full bg-blue-600 p-2 text-white"
          amount={amount}
        />
      </div>
    </div>
  );
}
