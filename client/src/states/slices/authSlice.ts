import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: {
    username: string;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
}

const initialAuthData: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "AUTH",
  initialState: initialAuthData,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: { username: string };
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
    },
    signup: (
      state,
      action: PayloadAction<{
        user: { username: string };
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    },
    refreshAccessToken: (
      state,
      action: PayloadAction<{ accessToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { signup, login, logout, refreshAccessToken } = authSlice.actions;
export default authSlice.reducer;
