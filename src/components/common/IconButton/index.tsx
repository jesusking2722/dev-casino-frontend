import { FC } from "react";
import { Icon } from "@iconify/react";

interface IconButtonProps {
  type: "default" | "";
  icon: string;
  iconColor: "primary" | "";
  size: "xs" | "sm" | "lg" | "xl";
  ping?: boolean;
}

const IconButton: FC<IconButtonProps> = ({
  type,
  icon,
  size,
  iconColor,
  ping,
}) => {
  return (
    <button
      className={`transition-all duration-300 ease-in-out cursor-pointer group flex flex-col items-end ${
        type === "default" ? "bg-transparent hover:bg-[#1F1F21]" : ""
      }`}
    >
      {ping && (
        <span className="absolute flex size-2 z-10">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
        </span>
      )}
      <Icon
        icon={icon}
        className={`transition-all duration-300 ease-in-out ${
          iconColor === "primary"
            ? "text-[#2fbb77] group-hover:opacity-80"
            : "text-white"
        } ${
          size === "xs"
            ? "w-4 h-4"
            : size === "sm"
            ? "w-5 h-5"
            : size === "lg"
            ? "w-6 h-6"
            : ""
        }`}
      />
    </button>
  );
};

export default IconButton;
