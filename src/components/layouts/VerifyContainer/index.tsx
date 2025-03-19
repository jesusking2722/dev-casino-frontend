import { Icon } from "@iconify/react";
import { Button } from "../../common";
import { useState } from "react";
import { phoneSendVerification, sendEmailVerify } from "../../../lib/scripts";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router";

const VerifyContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { token, user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      if ((user?.email || user?.phone) && token) {
        setLoading(true);
        if (user.email) {
          const response = await sendEmailVerify({ token, email: user.email });
          if (response.ok) {
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        }
        if (user.phone) {
          const formattedPhone = user.phone.split("+")[1];
          const response = await phoneSendVerification({
            phone: formattedPhone,
          });
          if (response.ok) {
            toast.success(response.message);
            navigate("/phone-verify");
          } else {
            toast.error(response.message);
          }
        }
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-2 fixed bottom-0 bg-red-500 z-50">
      <div className="w-[70%] mx-auto flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Icon
            icon="heroicons:envelope-open-solid"
            className="text-white w-5 h-5"
          />
          <p className="font-semibold text-white text-xs font-sans">
            Complete verification to receive level 1 bonuses
          </p>
        </div>
        <Button
          type="red"
          label="Verify"
          size="xs"
          disabled={loading}
          loading={loading}
          onClick={handleVerify}
        />
      </div>
    </div>
  );
};

export default VerifyContainer;
