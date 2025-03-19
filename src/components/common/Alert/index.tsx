import { Icon } from "@iconify/react";

const Alert = ({
  type,
  label,
  icon,
  iconColor,
}: {
  type: "success" | "info" | "warn" | "error";
  label: string;
  icon?: string;
  iconColor?: "green" | "";
}) => {
  return (
    <div
      className={`flex flex-row items-center gap-4 py-2 px-5 rounded-xl ${
        type === "success"
          ? "bg-green-200"
          : type === "info"
          ? "bg-blue-200"
          : type === "warn"
          ? "bg-yellow-100"
          : "bg-red-200"
      }`}
    >
      {icon ? (
        <Icon
          icon={icon}
          className={`w-6 h-6 ${
            type === "success"
              ? "text-green-500"
              : type === "info"
              ? "text-blue-500"
              : type === "warn"
              ? "text-yellow-400"
              : "text-red-700"
          }`}
        />
      ) : (
        <Icon
          icon={
            type === "success"
              ? "mdi:check-circle"
              : type === "info"
              ? "mdi:information-variant-circle"
              : type === "warn"
              ? "mdi:warning"
              : "mdi:lightbulb-error"
          }
          className={`w-6 h-6 ${
            type === "success"
              ? "text-green-500"
              : type === "info"
              ? "text-blue-500"
              : type === "warn"
              ? "text-yellow-400"
              : "text-red-700"
          }`}
        />
      )}
      <span
        className={`text-xs font-semibold font-sans ${
          type === "success"
            ? "text-green-500"
            : type === "info"
            ? "text-blue-500"
            : type === "warn"
            ? "text-yellow-400"
            : "text-red-700"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default Alert;
