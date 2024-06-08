"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
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
      <div></div>
    </form>
  );
}
