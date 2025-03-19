import ScrollAnimation from "react-animate-on-scroll";
import { Button, Tabs, TabsItemType } from "../../components";
import Replenishment from "./Replenishment";
import Payment from "./Payment";
import History from "./History";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router";

const initialTabs: TabsItemType[] = [
  { label: "Replenishment", actived: true, children: <Replenishment /> },
  { label: "Payment", actived: false, children: <Payment /> },
  { label: "History", actived: false, children: <History /> },
];

const CashRegister = () => {
  const [tabs, setTabs] = useState<TabsItemType[]>(initialTabs);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const verify =
      ((user?.email && user?.email_verified === "yes") ||
        (user?.phone && user?.phone_verified === "yes")) &&
      user?.document_verified === "yes";
    setIsVerified(!!verify);
  }, [user]);

  const handleTabSelect = (idx: number) => {
    setTabs(tabs.map((tab, index) => ({ ...tab, actived: index === idx })));
  };

  return (
    <div className="bg-black">
      <ScrollAnimation
        animateIn="fadeInUp"
        className="w-full min-h-screen flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
      >
        <div className="w-[50%] flex flex-col gap-8 rounded-xl border border-[#1F1F21]">
          <div className="flex flex-row items-center justify-between border-b-[#1F1F21] p-4">
            <img src="./assets/logo.webp" alt="LOGO" className="w-20 h-auto" />
            <div className="flex flex-row items-center gap-2">
              <Button type="icon" icon="solar:headphones-round-broken" />
              <Button
                type="icon"
                icon="heroicons:x-mark-solid"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-14">
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="text-white/50 font-semibold text-sm font-sans">
                Balance:
              </span>
              <span className="text-white font-semibold text-base font-sans">
                0 $
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="text-white/50 font-semibold text-sm font-sans">
                Before payment:
              </span>
              <span className="text-white font-semibold text-base font-sans">
                0 $
              </span>
            </div>
          </div>
          <Tabs tabs={tabs} onSelect={handleTabSelect} />
          <div className="flex flex-row items-center justify-center gap-4 p-6">
            <img
              src="../assets/logos/visa.svg"
              alt="VISA"
              className="w-10 h-auto"
            />
            <img
              src="../assets/logos/master-card.svg"
              alt="VISA"
              className="w-6 h-auto"
            />
            <img
              src="../assets/logos/master-card-secure.svg"
              alt="VISA"
              className="w-10 h-auto"
            />
            <img
              src="../assets/logos/verify-by-visa.svg"
              alt="VISA"
              className="w-10 h-auto"
            />
            <img
              src="../assets/logos/pci.svg"
              alt="VISA"
              className="w-10 h-auto"
            />
          </div>
          {tabs[1].actived && !isVerified && (
            <div className="flex flex-row items-center justify-center mb-8">
              <Button
                type="secondary"
                icon="mdi:check-decagram"
                iconPosition="left"
                label="Verify"
              />
            </div>
          )}
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default CashRegister;
