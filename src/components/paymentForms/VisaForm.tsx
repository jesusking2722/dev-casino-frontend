import { InputField } from "../common";

const VisaForm = () => {
  return (
    <form className="p-4 w-full rounded-xl flex flex-col items-center justify-center gap-4">
      <div className="w-full">
        <InputField
          type="text"
          label="Card number"
          icon="solar:wallet-bold-duotone"
          placeholder="xxxx-xxxx-xxxx..."
        />
      </div>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="basis-2/5">
          <InputField type="text" label="Expiration date" placeholder="MM/PP" />
        </div>
        <div className="basis-2/5">
          <InputField type="text" label="CVV" placeholder="CVV2" />
        </div>
      </div>
    </form>
  );
};

export default VisaForm;
