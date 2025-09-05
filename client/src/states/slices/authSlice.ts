import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: {
    username: string;
    email: string;
  } | null;
  isLoggedIn: boolean;
}

const initialAuthData: AuthState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "AUTH",
  initialState: initialAuthData,
  reducers: {
    login: (state, action: PayloadAction<{ user: { username: string; email: string } }>) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    signup: (state, action: PayloadAction<{ user: { username: string; email: string } }>) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
