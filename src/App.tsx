import "./App.css";
import { Container, Header, Footer, VerifyContainer } from "./components";
import {
  CashRegister,
  Games,
  GooglePay,
  Home,
  Login,
  PhoneVerify,
  Register,
  Visa,
} from "./pages";
import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import "animate.css/animate.compat.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./redux/store";
import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchMe } from "./lib/scripts";
import { setAuthReducer, setCountryCode } from "./redux/slices/authSlice";
import { getCountryWithGeoPlugin } from "./helper";
import { useLocation } from "react-router";

const App: React.FC = () => {
  const [verified, setVerified] = useState<boolean>(false);

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const { isAuthenticated, user } = auth;
    if (
      isAuthenticated &&
      user?.email &&
      user?.email_verified === "no" &&
      !pathname.includes("phone-verify")
    ) {
      setVerified(true);
    } else if (
      isAuthenticated &&
      user?.phone &&
      user?.phone_verified === "no" &&
      !pathname.includes("phone-verify")
    ) {
      setVerified(true);
    } else {
      setVerified(false);
    }
  }, [auth, pathname]);

  const fetchMyInfo = useCallback(async () => {
    try {
      const token = localStorage.getItem("Authorization");
      const decoded = jwtDecode(token as any) as any;
      if (decoded?.id) {
        const response = await fetchMe(decoded.id as number);
        if (response.ok) {
          dispatch(setAuthReducer({ user: response.data, token }));
        }
      }
    } catch (error) {
      console.log("fetch my info error: ", error);
    }
  }, [dispatch]);

  const fetchLocation = useCallback(async () => {
    try {
      const countryCode = await getCountryWithGeoPlugin();
      dispatch(setCountryCode(countryCode));
    } catch (error) {
      console.log("fetch location error: ", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMyInfo();
  }, [fetchMyInfo]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return (
    <>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/phone-verify" Component={PhoneVerify} />
        <Route path="/cash-register" Component={CashRegister} />
        <Route path="/cash-register/visa" Component={Visa} />
        <Route path="/cash-register/googlepay" Component={GooglePay} />
      </Routes>
      <Container>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/games" Component={Games} />
        </Routes>
        <Footer />
      </Container>
      {verified && <VerifyContainer />}
      <ToastContainer
        theme="dark"
        toastStyle={{ fontFamily: "Montserrat", fontSize: 14 }}
      />
    </>
  );
};

export default App;
