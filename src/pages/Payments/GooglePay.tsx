import ScrollAnimation from "react-animate-on-scroll";
import {
  Alert,
  Button,
  CardRadioGroup,
  CardRadioGroupItemType,
  InputField,
  RadioGroup,
  RadioGroupItemType,
} from "../../components";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router";

const initialRadios: RadioGroupItemType[] = [
  { label: "300 $", checked: false },
  { label: "500 $", checked: true },
  { label: "1000 $", checked: false },
  { label: "5000 $", checked: false },
];

const initialCardRadios: CardRadioGroupItemType[] = [
  { title: "No bonus", checked: false },
  {
    title: "Bonus for 1 deposit",
    subtitle: "Deposit from 100$",
    iconImg: "../assets/icons/gift.png",
    checked: true,
  },
  {
    title: "VIP up to 225% + 100 FS",
    subtitle: "Deposit from 2500$",
    iconImg: "../assets/icons/vip.png",
    checked: false,
  },
];

const GooglePay = () => {
  const [radios, setRadios] = useState<RadioGroupItemType[]>(initialRadios);
  const [cardRadios, setCardRadios] =
    useState<CardRadioGroupItemType[]>(initialCardRadios);
  const [amount, setAmount] = useState<string>("500");

  const navigate = useNavigate();

  const handleCheckboxChecked = (idx: number) => {
    setAmount(radios[idx].label.split(" ")[0]);
    setRadios(
      radios.map((radio, index) => ({
        ...radio,
        checked: index === idx,
      }))
    );
  };

  const handleCardRadioChecked = (idx: number) => {
    setCardRadios(
      cardRadios.map((cardRadio, index) => ({
        ...cardRadio,
        checked: index === idx,
      }))
    );
  };

  return (
    <div className="bg-black">
      <ScrollAnimation
        animateIn="fadeInUp"
        className="w-full min-h-screen flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
      >
        <div className="w-[50%] flex flex-col gap-8 rounded-xl border border-[#1F1F21]">
          <div className="flex flex-row items-center justify-between border-b-[1px] border-b-[#1F1F21] p-4">
            <Button
              type="icon"
              icon="heroicons:chevron-left"
              onClick={() => {
                navigate("/cash-register");
              }}
            />
            <img
              src="../assets/logos/googlepay.svg"
              alt="VISA"
              className="w-20 h-auto"
            />
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
          <div className="w-[80%] mx-auto flex flex-col gap-4 h-[60vh] overflow-y-scroll px-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                <span className="text-white text-sm">Enter amount:</span>
                <Icon
                  icon="heroicons:information-circle-20-solid"
                  className="text-white/30 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                />
              </div>
              <div className="p-4 rounded-xl border flex flex-col gap-2 border-white/10">
                <div className="mb-2">
                  <InputField type="text" readonly={true} value={amount} />
                </div>
                <RadioGroup radios={radios} onChecked={handleCheckboxChecked} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                <span className="text-white text-sm">Choose a bonus (0):</span>
                <Button
                  type="default"
                  size="xs"
                  icon="mdi:gift"
                  iconPosition="left"
                  label="Promo code"
                />
              </div>
              <CardRadioGroup
                cardRadios={cardRadios}
                onChecked={handleCardRadioChecked}
              />
            </div>
            <div>
              <Alert
                type="success"
                icon="solar:hearts-bold-duotone"
                label="We donate a portion of each deposit to charity"
              />
            </div>
            <div>
              <p className="text-xs text-white/50">
                By clicking "Replenish", you agree to the terms (accept) of the
                public offer for the provision of payment services:
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center border-t-[1px] border-t-[#1F1F21] p-4">
            <Button
              type="secondary"
              label={`Top up with ${amount}$`}
              icon="solar:money-bag-bold-duotone"
              iconPosition="left"
            />
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default GooglePay;
