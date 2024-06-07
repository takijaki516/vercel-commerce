"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form>
      <input />
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form>
      <input />
      <div>
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
