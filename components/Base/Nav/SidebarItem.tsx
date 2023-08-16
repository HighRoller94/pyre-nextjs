// Packages/hooks etc

import Link from "next/link";
import { twMerge } from "tailwind-merge";

// Icons etc
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
  openSidebar: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
  openSidebar,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center justify-center w-full gap-x-4 text-md font-medium cursor-pointer
    hover:text-white transition text-neutral-400 py-1`,
        active && "text-orange-400"
      )}
    >
      <Icon className={`${openSidebar ? "min-h-[28px] min-w-[28px]" : "min-h-[30px] min-w-[30px]"}`}/>
      <p
        className={`truncate w-full text-base ${
          openSidebar ? "flex" : "hidden"
        }`}
      >
        {label}
      </p>
    </Link>
  );
};

export default SidebarItem;
