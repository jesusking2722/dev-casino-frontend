import { useState } from "react";
import {
  Button,
  PhoneMailSwitch,
  InputField,
  CustomPhoneInput,
} from "../../components";
import { Link, useNavigate } from "react-router";
import { User } from "../../types";
import { emailLogin, googleLogin, phoneLogin } from "../../lib/scripts";
import { toast } from "react-toastify";
import { setAuthToken } from "../../lib/axiosInstance";
import { RootState, useAppDispatch } from "../../redux/store";
import { setAuthReducer } from "../../redux/slices/authSlice";
import ScrollAnimation from "react-animate-on-scroll";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [switchMode, setSwitchMode] = useState<"phone" | "email">("phone");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { countryCode } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    if (switchMode === "email") {
      if (email === "") return false;
      if (!validateEmail(email)) return false;
    }
    if (switchMode === "phone") {
      if (!isValidPhoneNumber(phone, countryCode as CountryCode)) return false;
    }
    if (password === "") return false;
    return true;
  };

  const handleLogin = async () => {
    try {
      if (!validate()) return;
      setLoading(true);
      if (switchMode === "email") {
        const reqUser: User = {
          email: email as any,
          password: password as any,
        };
        const response = await emailLogin(reqUser);
        if (response.ok) {
          const { data } = response;
          const { token, user } = data;
          setAuthToken(token);
          dispatch(setAuthReducer({ user, token }));
          toast.success("Welcome back !!!");
          navigate("/");
          window.location.reload();
        } else {
          toast.error(response.message);
        }
      }
      if (switchMode === "phone") {
        const reqUser: User = {
          phone: phone as any,
          password: password as any,
        };
        const response = await phoneLogin(reqUser);
        if (response.ok) {
          const { data } = response;
          const { token, user } = data;
          setAuthToken(token);
          dispatch(setAuthReducer({ user, token }));
          toast.success("Welcome back !!!");
          navigate("/");
          window.location.reload();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.log("handle login error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        setGoogleLoading(true);
        const { code } = codeResponse;
        const response = await googleLogin({ code });
        if (response.ok) {
          const { token, user } = response.data;
          setAuthToken(token);
          dispatch(setAuthReducer({ user, token }));
          toast.success("Welcome back !!!");
          navigate("/");
          window.location.reload();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      setGoogleLoading(false);
    },
  });

  return (
    <div className="bg-black">
      <ScrollAnimation
        animateIn="fadeInUp"
        className="w-full min-h-screen flex flex-col items-center justify-center"
      >
        <div className="w-[50%] rounded-lg border border-[#1F1F21] p-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="overflow-hidden">
              <img
                src="./assets/registration banner.svg"
                alt="REGISTRATION BANNER"
                className="w-[500px] h-auto mx-auto"
              />
              <div className="mt-2 flex flex-col items-center justify-center">
                <h1 className="font-semibold text-white text-4xl font-sans">
                  NEW PLAYERS
                </h1>
                <h2 className="font-semibold text-[#2fbb77] text-6xl font-sans">
                  200,000₴
                </h2>
                <h3 className="font-semibold text-white text-4xl">+500 Fs</h3>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-6">
                  <img
                    src="./assets/logo.webp"
                    alt="LOGO"
                    className="w-14 h-14"
                  />
                  <h2 className="text-white font-semibold text-2xl">
                    Authorization
                  </h2>
                </div>
                <Button
                  type="icon"
                  icon="heroicons:x-mark-solid"
                  onClick={() => {
                    navigate("/");
                  }}
                />
              </div>
              <div className="flex items-center justify-center">
                <PhoneMailSwitch
                  active={switchMode}
                  setActive={setSwitchMode}
                />
              </div>
              <div className="flex flex-col gap-4">
                {switchMode === "phone" ? (
                  <CustomPhoneInput
                    value={phone}
                    invalidTxt="Please input your correct phone number"
                    defaultCountry={countryCode || "GB"}
                    onChange={setPhone}
                  />
                ) : (
                  <InputField
                    type="email"
                    value={email}
                    placeholder="Email"
                    icon="ic:round-mail"
                    invalid={email === "" || !validateEmail(email)}
                    invalidTxt="Please input your correct email"
                    onChange={setEmail}
                  />
                )}

                <InputField
                  type="password"
                  value={password}
                  placeholder="Password"
                  icon="heroicons:lock-closed-solid"
                  invalid={password === ""}
                  invalidTxt="Please input your password"
                  onChange={setPassword}
                />
                <div className="w-full text-right">
                  <Link to="/" className="text-[#2fbb77] font-semibold text-xs">
                    Password recovery
                  </Link>
                </div>
                <Button
                  type="secondary"
                  label="Log in"
                  onClick={handleLogin}
                  disabled={!validate() || loading}
                  loading={loading}
                />
              </div>
              <div className="flex items-center justify-center mt-4">
                <span className="font-semibold text-white/30 text-xs">
                  or through:
                </span>
              </div>
              <div className="flex flex-row items-center justify-center gap-4">
                <Button
                  type="icon"
                  iconImg="google"
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  loading={googleLoading}
                />
                <Button type="icon" icon="ls:apple" />
              </div>
              <div className="flex flex-col items-center justify-center gap-4 mt-14 mb-8">
                <span className="font-semibold text-white/40 text-sm">
                  Don't have an account ?
                </span>
                <Button
                  type="primary"
                  label="Register"
                  onClick={() => {
                    navigate("/register");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default Login;
