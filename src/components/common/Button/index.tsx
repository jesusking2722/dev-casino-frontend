import { FC } from "react";
import { Icon } from "@iconify/react";

interface ButtonProps {
  type: "default" | "icon" | "primary" | "secondary" | "link" | "red";
  size?: "xs" | "sm" | "lg" | "full";
  label?: string;
  icon?: string;
  iconType?: "primary" | "secondary" | "indigo" | "blue";
  iconImg?: string;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  type,
  size,
  label,
  iconType,
  icon,
  iconImg,
  iconPosition,
  disabled,
  loading,
  onClick,
}) => {
  const isDisabled = disabled || loading;

  if (type === "icon") {
    if (iconType === "secondary" && icon) {
      return (
        <Icon
          icon={icon}
          className={`w-6 h-6 transition-all duration-300 ease-in-out ${
            isDisabled
              ? "text-gray-400 pointer-events-none"
              : "text-[#1F1F21] hover:text-[#2ba369]"
          }`}
          onClick={!isDisabled ? onClick : undefined}
        />
      );
    }
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <button
          className={`group flex flex-col p-3 rounded-full items-center justify-center transition-all duration-300 ease-in-out shadow-md shadow-[#1F1F21] ${
            isDisabled
              ? "bg-[#353537] opacity-50 cursor-not-allowed pointer-events-none"
              : iconType === "primary"
              ? "bg-[#2ba369] hover:bg-[#2fbb77]"
              : iconType === "indigo"
              ? "bg-[#7D3DAF] hover:bg-[#B56AF1]"
              : iconType === "blue"
              ? "bg-[#2AABEE] hover:bg-[#57C6FF]"
              : "bg-[#1F1F21] hover:bg-[#353537] focus:bg-[#103523] focus:backdrop-blur-sm"
          }`}
          onClick={!isDisabled ? onClick : undefined}
          disabled={isDisabled}
        >
          {loading ? (
            <Icon icon="svg-spinners:pulse-3" className="w-6 h-6 text-white" />
          ) : icon ? (
            <Icon
              icon={icon}
              className={`w-6 h-6 ${
                iconType === "primary" ? "text-black" : "text-white"
              }`}
            />
          ) : null}
          {iconImg && !loading && (
            <img
              src={`./assets/icons/${iconImg}.svg`}
              alt="Icon"
              className="w-6 h-6"
            />
          )}
        </button>
        {label && (
          <span
            className={`text-xs font-semibold ${
              iconType === "primary" ? "text-white" : "text-white/30"
            }`}
          >
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      className={`flex flex-row items-center justify-center gap-2 transition-all duration-300 ease-in-out rounded-lg text-white font-semibold ${
        type === "primary"
          ? "bg-[#1F1F21]"
          : type === "default"
          ? "bg-black hover:bg-[#353537]"
          : type === "secondary"
          ? "bg-[#2ba369]"
          : type === "red"
          ? "bg-red-400"
          : ""
      } ${
        isDisabled
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "hover:bg-opacity-80"
      } ${
        size === "xs"
          ? "px-3 py-2 text-xs"
          : size === "full"
          ? "w-full text-sm p-4"
          : "py-3 px-7 text-sm"
      }`}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
    >
      {loading ? (
        <Icon icon="svg-spinners:pulse-3" className="w-6 h-6 text-white" />
      ) : (
        <>
          {iconImg && (
            <img
              src={`./assets/icons/${iconImg}.svg`}
              alt="Icon"
              className="w-6 h-6"
            />
          )}
          {iconPosition === "left" && icon && (
            <Icon
              icon={icon}
              className="w-6 h-6"
              color={type === "secondary" ? "white" : "#2fbb77"}
            />
          )}
          {label}
          {iconPosition === "right" && icon && (
            <Icon
              icon={icon}
              className="w-6 h-6"
              color={type === "secondary" ? "white" : "#2fbb77"}
            />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
