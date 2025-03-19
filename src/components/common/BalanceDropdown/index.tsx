import { Icon } from "@iconify/react";
import { useState } from "react";
import Button from "../Button";
import ScrollAnimation from "react-animate-on-scroll";

const BalanceDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={`relative py-1 px-3 rounded-xl ${
        open ? "bg-[#1F1F21]" : "bg-black"
      }`}
    >
      <button
        className="w-full flex flex-row items-center justify-between group gap-2"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex flex-col gap-1 items-start">
          <span
            className={`font-semibold text-[10px] font-sans ${
              open ? "text-white" : "text-white/50"
            }`}
          >
            Balance:
          </span>
          <span className="font-semibold text-sm text-white font-sans">
            0 $
          </span>
        </div>
        <Icon
          icon="heroicons:chevron-down-20-solid"
          className={`text-[#2fbb77] w-6 h-6 transition-all duration-300 ease-in-out ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {open && (
        <ScrollAnimation
          animateIn="fadeIn"
          animateOut="fadeOut"
          className="absolute p-4 rounded-xl mt-4 -left-5 bg-black/80 backdrop-blur-sm z-50 flex flex-col gap-4 w-[400px]"
        >
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icon icon="mdi:wallet" className="text-white w-8 h-8" />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-[10px] text-white/50 font-sans">
                  Balance:
                </span>
                <span className="font-semibold text-sm text-white font-sans">
                  0 $
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-[10px] text-white/50 font-sans">
                To the conclusion:
              </span>
              <span className="font-semibold text-sm text-white font-sans">
                0 $
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Button type="icon" iconType="blue" icon="mdi:wallet-plus" />
              <Button type="icon" iconType="indigo" icon="mdi:wallet" />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <Icon
                icon="heroicons:gift-16-solid"
                className="text-white w-8 h-8"
              />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-[10px] text-white/50 font-sans">
                  Active bonus:
                </span>
                <span className="font-semibold text-sm text-white font-sans">
                  0 $
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-[10px] text-white/50 font-sans">
                Conclusion:
              </span>
              <span className="font-semibold text-sm text-white font-sans">
                0 $
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Button
                type="primary"
                icon="heroicons:information-circle-solid"
                iconPosition="left"
                label="detail"
                size="xs"
              />
            </div>
          </div>
        </ScrollAnimation>
      )}
    </div>
  );
};

export default BalanceDropdown;
