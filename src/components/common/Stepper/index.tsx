import { Icon } from "@iconify/react";

const Stepper = ({ steps, current }: { steps: string[]; current: number }) => {
  return (
    <div className="flex flex-col items-center w-full justify-center gap-2">
      <div className="flex flex-row items-center justify-between">
        {steps.map((step, index) => (
          <>
            <button
              key={index}
              className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full border border-[#353537] ${
                current - 2 === index
                  ? "bg-[#103523] backdrop-blur-sm"
                  : current - 1 === index
                  ? "bg-[#1F1F21]"
                  : "bg-transparent"
              }`}
            >
              {current - 2 === index ? (
                <Icon icon="mdi:check-circle" />
              ) : (
                <span
                  className={`font-semibold text-base font-sans ${
                    current - 1 === index ? "text-white" : "text-white/50"
                  }`}
                >
                  {index}
                </span>
              )}

              <span
                className={`absolute font-semibold top-16 w-40 text-xs font-sans ${
                  current - 2 === index
                    ? "text-green-500"
                    : current - 1 === index
                    ? "text-white"
                    : "text-white/50"
                }`}
              >
                {step}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div className={`w-40 h-1 bg-[#353537]`}></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
