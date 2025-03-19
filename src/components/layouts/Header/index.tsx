import { useState } from "react";
import { BalanceDropdown, Button, IconButton } from "../../common";
import { googleLogin } from "../../../lib/scripts";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router";
import { setAuthToken } from "../../../lib/axiosInstance";
import { setAuthReducer } from "../../../redux/slices/authSlice";

const Header = () => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    <header className="w-full p-2">
      <nav className="flex flex-row items-center justify-between">
        <Button
          type="default"
          label="200 000₴ + 500FS"
          icon="heroicons:gift-20-solid"
          iconPosition="left"
        />
        <img src="./assets/logo.webp" alt="LOGO" className="w-[100px] h-auto" />
        <div className="flex flex-row items-center gap-4">
          {!isAuthenticated || !user ? (
            <>
              <Button type="icon" icon="ls:apple" />
              <Button
                type="icon"
                iconImg="google"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                loading={googleLoading}
              />
              <span className="text-white font-semibold text-sm">Or</span>
              <Button
                type="primary"
                label="Login"
                onClick={() => {
                  navigate("/login");
                }}
              />
              <Button
                type="secondary"
                label="Registration"
                onClick={() => {
                  navigate("/register");
                }}
              />
            </>
          ) : (
            <>
              <IconButton
                type="default"
                icon="mdi:email"
                iconColor="primary"
                size="lg"
                ping={true}
              />
              <BalanceDropdown />
              <Button
                type="secondary"
                icon="mdi:wallet-plus"
                iconPosition="left"
                label="Cash Register"
                onClick={() => {
                  navigate("/cash-register");
                }}
              />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
