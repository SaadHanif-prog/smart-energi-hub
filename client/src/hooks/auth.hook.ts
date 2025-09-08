import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import { useDispatch } from 'react-redux'

// Types
import type { CreateSignup, CreateLogin, ErrorResponse, SignupApiResponse, LoginApiResponse} from "../types/auth.types";
import type { AxiosError } from "axios";
// import type {RootState} from "../states/store"

// Hooks
import { signup, login} from "../api/auth.api";

// Actions from redux store
// import { signup as signupAction, login as loginAction } from "../states/slices/authSlice";

export const useSignup = () => {
  // const dispatch = useDispatch<RootState>();
  return useMutation({
    mutationFn: (signupPayload: CreateSignup) => signup(signupPayload),
    onSuccess: (data: SignupApiResponse) => {
      console.log("data in signup response ", data);
      // dispatch(
      //   signupAction({
      //     user: {
      //       username: data.data.username,
      //       email: data.data.email,
      //     },
      //   })
      // );
      toast.success(data.message || "Signup Successful.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

export const useLogin = () => {
 return useMutation({
    mutationFn: (loginPayload: CreateLogin) => login(loginPayload),
    onSuccess: (data: LoginApiResponse) => {
      toast.success(data.message || "Login Successful.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};