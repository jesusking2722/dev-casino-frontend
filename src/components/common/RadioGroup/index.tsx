import { FC } from "react";

export type RadioGroupItemType = {
  label: string;
  checked: boolean;
};

interface RadioGroupProps {
  radios: RadioGroupItemType[];
  onChecked: (idx: number) => void;
}

const RadioGroup: FC<RadioGroupProps> = ({ radios, onChecked }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      {radios.map((radio, index) => (
        <button
          key={index}
          className={`rounded-xl transition-all duration-300 ease-in-out hover:bg-[#2ba369] font-semibold p-2 ${
            radio.checked
              ? "bg-[#2ba369] text-white"
              : "bg-[#1F1F21] text-white/50"
          }`}
          onClick={() => {
            onChecked(index);
          }}
        >
          {radio.label}
        </button>
      ))}
    </div>
  );
};

export default RadioGroup;
