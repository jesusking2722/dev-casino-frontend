import { FC } from "react";
import { Icon } from "@iconify/react";

export type TabsItemType = {
  label: string;
  actived: boolean;
  icon?: string;
  children?: React.ReactNode;
};

interface TabsProps {
  tabs: TabsItemType[];
  onSelect: (idx: number) => void;
}

const Tabs: FC<TabsProps> = ({ tabs, onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-8">
      <div className="flex w-fit flex-row items-center justify-center gap-2 p-2 bg-[#161616] rounded-full">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`transition-all duration-300 ease-in-out px-5 py-1 font-semibold rounded-full flex flex-row items-center gap-2 text-xs
          ${
            tab.actived
              ? "text-white bg-[#353537]"
              : "text-[#353537] bg-transparent hover:text-white"
          }`}
            onClick={() => {
              onSelect(index);
            }}
          >
            {tab.label}
            {tab.icon && <Icon icon={tab.icon} className="w-6 h-6" />}
          </button>
        ))}
      </div>
      {tabs.map((tab) => tab.actived && tab.children)}
    </div>
  );
};

export default Tabs;
