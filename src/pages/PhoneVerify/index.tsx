import { useEffect, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { Button, InputField } from "../../components";
import { phoneSendVerification, phoneVerify } from "../../lib/scripts";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { setPhoneVerified } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";

const PhoneVerify = () => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isResend, setIsResend] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(300); // 5 minutes
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isResend) return; // Stop if resend is allowed

    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(intervalId);
        setIsResend(true);
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isResend]);

  const handleVerify = async () => {
    if (!code || code.length !== 6 || !user) return;
    setLoading(true);

    try {
      const { id, phone } = user;
      const response = await phoneVerify({
        phone: phone?.split("+")[1] || "",
        id: id ?? 0,
        otp: code,
      });

      if (response.ok) {
        toast.success(response.message);
        dispatch(setPhoneVerified("yes"));
        navigate("/");
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("phone verify error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!user?.phone) return;
    setLoading(true);

    try {
      const formattedPhone = user.phone.split("+")[1];
      const response = await phoneSendVerification({ phone: formattedPhone });

      if (response.ok) {
        toast.success(response.message);
        setIsResend(false);
        setTimer(300); // Reset timer
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("resend error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <ScrollAnimation
        animateIn="fadeInUp"
        className="w-[50%] p-4 rounded-xl border border-[#1F1F21] flex flex-col gap-14"
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-6">
            <img src="./assets/logo.webp" alt="LOGO" className="w-14 h-14" />
            <h2 className="text-white font-semibold text-2xl">
              Phone verification
            </h2>
          </div>
          <Button
            type="icon"
            icon="heroicons:x-mark-solid"
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          />
        </div>

        <div className="w-[50%] mx-auto flex flex-col items-center justify-center gap-8 mb-8">
          <InputField
            type="text"
            icon="heroicons:device-phone-mobile"
            placeholder="Please input your verification code"
            value={code}
            onChange={setCode}
          />
          <Button
            type="secondary"
            label={isResend ? "Resend" : "Submit"}
            size="full"
            disabled={
              !isResend && (code === "" || loading || code.length !== 6)
            }
            loading={loading}
            onClick={isResend ? handleResend : handleVerify}
          />

          {!isResend && (
            <p className="text-white text-xs">
              Resend code in {Math.floor(timer / 60)}:
              {(timer % 60).toString().padStart(2, "0")}
            </p>
          )}
          {isResend && (
            <p className="text-white text-sm">You can resend the code now.</p>
          )}
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default PhoneVerify;
