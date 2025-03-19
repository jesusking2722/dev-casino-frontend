import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  countryCode: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  countryCode: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthReducer(
      state: AuthState,
      action: PayloadAction<{ user: User | null; token: string | null }>
    ) {
      const { user, token } = action.payload;
      state.isAuthenticated = token ? true : false;
      state.user = user;
      state.token = token;
    },
    setCountryCode(
      state: AuthState,
      action: PayloadAction<{ countryCode: string }>
    ) {
      state.countryCode = action.payload.countryCode;
    },
    setPhoneVerified(state: AuthState, action: PayloadAction<"yes" | "no">) {
      if (!state.user) return;
      state.user.phone_verified = action.payload;
    },
    setMyInfo(state: AuthState, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const { setAuthReducer, setCountryCode, setPhoneVerified, setMyInfo } =
  authSlice.actions;

export default authSlice.reducer;
