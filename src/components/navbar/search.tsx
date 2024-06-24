"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "../ui/input";
import { createUrl } from "@/lib/utils";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/search", newParams));
  }

  return (
    <form
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
      onSubmit={onSubmit}
    >
      {/* REVIEW: html input options */}
      <Input
        key={searchParams.get("q")}
        name="search"
        type="text"
        placeholder="search for products"
        autoComplete="off"
        defaultValue={searchParams.get("q") || ""}
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-black dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 w-4" />
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form>
      <input />
      <div>
        <MagnifyingGlassIcon className="h-4 w-4" />
      </div>
    </form>
  );
}
