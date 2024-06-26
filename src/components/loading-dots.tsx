import { cn } from "@/lib/utils";

const dots = "mx-[1px]";

export function LoadingDots({ className }: { className: string }) {
  return (
    <span>
      <span />
      <span />
      <span />
    </span>
  );
}
