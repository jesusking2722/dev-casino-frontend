import { Icon } from "@iconify/react";
import { FC, useState } from "react";

interface InputFieldProps {
  type: "text" | "password" | "number" | "email";
  label?: string;
  placeholder?: string;
  value?: any;
  icon?: string;
  invalid?: boolean;
  invalidTxt?: string;
  readonly?: boolean;
  onChange?: (val: string) => void;
}

const InputField: FC<InputFieldProps> = ({
  type,
  label,
  placeholder,
  value,
  icon,
  invalid,
  invalidTxt,
  readonly,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false); // Track if input has been touched

  // Function to determine password strength
  const getPasswordStrength = (password: string) => {
    if (!password) return null;
    if (password.length === 0) return null; // No indicator when empty
    if (password.length < 6) return "weak"; // Weak: Less than 6 characters
    if (password.match(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/)) return "normal"; // Normal: 6+ characters, letters & numbers
    if (password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/))
      return "strong"; // Strong: 8+ characters, letters, numbers & symbols
    return "weak";
  };

  const passwordStrength =
    type === "password" ? getPasswordStrength(value) : null;

  // Validation logic: apply invalid state only if the field is touched
  const isInvalid = touched && invalid;

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label className="text-white/30 text-sm font-semibold mb-1">
          {label}
        </label>
      )}

      <div
        className={`group w-full flex items-center gap-2 rounded-lg px-3 py-2
          bg-black border border-[#353537] transition-all duration-300
          hover:border-[#2fbb77] focus-within:border-[#2fbb77] ${
            isInvalid ? "border-red-500" : ""
          }`}
      >
        {icon && (
          <Icon
            icon={icon}
            className={`text-[#353537] group-hover:text-[#2fbb77] group-focus-within:text-[#2fbb77] transition-all duration-300 w-6 h-6 ${
              isInvalid && "text-red-500"
            }`}
          />
        )}
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          className="bg-transparent border-none outline-none focus:border-none text-white 
            font-semibold text-sm w-full placeholder-[#353537]"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={() => setTouched(true)} // Mark as touched when user blurs the input
          readOnly={readonly}
        />
        {type === "password" && (
          <button
            type="button"
            className="p-2 border-l border-[#353537] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon
              icon={
                showPassword
                  ? "heroicons:eye-slash-16-solid"
                  : "heroicons:eye-16-solid"
              }
              className="text-[#353537] group-hover:text-[#2fbb77] group-focus-within:text-[#2fbb77] transition-all duration-300 w-6 h-6"
            />
          </button>
        )}
      </div>

      {/* Password Strength Indicator */}
      {passwordStrength && (
        <div className="w-full flex flex-col gap-1">
          <div className="flex gap-1 mt-1">
            <div
              className={`h-1 flex-1 rounded-lg ${
                passwordStrength === "weak" ? "bg-red-500" : "bg-[#353537]"
              }`}
            ></div>
            <div
              className={`h-1 flex-1 rounded-lg ${
                passwordStrength === "normal"
                  ? "bg-yellow-500"
                  : passwordStrength === "strong"
                  ? "bg-green-500"
                  : "bg-[#353537]"
              }`}
            ></div>
            <div
              className={`h-1 flex-1 rounded-lg ${
                passwordStrength === "strong" ? "bg-green-500" : "bg-[#353537]"
              }`}
            ></div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-[#353537] font-semibold text-[10px]">
              {passwordStrength.toUpperCase()}
            </span>
            <Icon
              icon="heroicons:information-circle-solid"
              className="text-[#353537] w-4 h-4"
            />
          </div>
        </div>
      )}

      {isInvalid && invalidTxt && (
        <p className="w-full text-red-500 text-xs font-semibold p-1">
          {invalidTxt}
        </p>
      )}
    </div>
  );
};

export default InputField;
