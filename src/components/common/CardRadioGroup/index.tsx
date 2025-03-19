import { Icon } from "@iconify/react";
import { FC } from "react";

export type CardRadioGroupItemType = {
  title: string;
  subtitle?: string;
  iconImg?: string;
  checked: boolean;
};

interface CardRadioGroupProps {
  cardRadios: CardRadioGroupItemType[];
  onChecked: (idx: number) => void;
}

const CardRadioGroup: FC<CardRadioGroupProps> = ({ cardRadios, onChecked }) => {
  return (
    <div className="flex flex-col gap-3 items-start w-full">
      {cardRadios.map((card, index) => (
        <div
          key={index}
          className={`flex flex-row items-center gap-4 p-3 border hover:bg-[#071d12] hover:backdrop-blur-sm ${
            card.checked
              ? "bg-[#071d12] backdrop-blur-sm border-[#2ba369]"
              : "border-[#353537]"
          } rounded-xl w-full cursor-pointer transition-all duration-300`}
          onClick={() => onChecked(index)}
        >
          {/* Custom Radio Button - Always Visible */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                card.checked ? "border-[#2ba369]" : "border-gray-500"
              }`}
            >
              {/* Animated Check Icon */}
              <Icon
                icon="solar:check-circle-bold-duotone"
                className={`w-6 h-6 text-[#2ba369] transition-transform duration-200 ${
                  card.checked ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              />
            </div>
          </div>

          <label
            htmlFor={card.title}
            className="flex-1 flex items-center gap-1 cursor-pointer"
          >
            {card.iconImg && (
              <img
                src={card.iconImg}
                alt={card.iconImg}
                className="w-14 h-14"
              />
            )}
            <div className="flex flex-col">
              <h2
                className={`font-semibold text-sm ${
                  card.checked ? "text-white" : "text-white/50"
                }`}
              >
                {card.title}
              </h2>
              {card.subtitle && (
                <p className="text-white/50 text-xs">{card.subtitle}</p>
              )}
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CardRadioGroup;
