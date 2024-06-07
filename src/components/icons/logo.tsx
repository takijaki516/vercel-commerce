import clsx from "clsx";
import { HomeIcon } from "@radix-ui/react-icons";

export function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <HomeIcon
      className={clsx("h-4 w-4 fill-black dark:fill-white", props.className)}
    />
  );
}
