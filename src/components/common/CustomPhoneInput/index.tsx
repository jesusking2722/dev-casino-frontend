import { FC, useState } from "react";
import { Icon } from "@iconify/react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./style.css";

interface CustomPhoneInputProps {
  label?: string;
  value: string;
  defaultCountry?: string;
  invalidTxt?: string;
  onChange: (phone: string) => void;
}

const CustomPhoneInput: FC<CustomPhoneInputProps> = ({
  label,
  value,
  defaultCountry,
  invalidTxt,
  onChange,
}) => {
  const [touched, setTouched] = useState<boolean>(false);
  const isInvalid = touched && (!value || !isValidPhoneNumber(value));

  return (
    <div className="w-full flex flex-col gap-1 custom-phone-container">
      {label && (
        <label className="text-sm font-semibold text-[#353537]">{label}</label>
      )}

      <div
        className={`group w-full flex items-center gap-2 rounded-lg px-3 py-2
          bg-black border transition-all duration-300
          ${
            isInvalid
              ? "border-red-500"
              : "border-[#353537] hover:border-[#2fbb77] focus-within:border-[#2fbb77]"
          }`}
      >
        <Icon
          icon="heroicons:device-phone-mobile"
          className={`w-6 h-6 transition-all duration-300 ${
            isInvalid
              ? "text-red-500"
              : "text-[#353537] group-hover:text-[#2fbb77] group-focus-within:text-[#2fbb77]"
          }`}
        />
        <PhoneInput
          international
          defaultCountry={defaultCountry as any}
          value={value}
          className="bg-black border-none outline-none text-white font-semibold text-sm w-full placeholder-[#353537]"
          onChange={(e) => {
            onChange(e ?? "");
          }}
          onBlur={() => setTouched(true)}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? "phone-error" : undefined}
          style={{ backgroundColor: "black" }}
        />
      </div>
      {isInvalid && invalidTxt && (
        <p id="phone-error" className="text-red-500 text-xs font-semibold p-1">
          {invalidTxt}
        </p>
      )}
    </div>
  );
};

export default CustomPhoneInput;
