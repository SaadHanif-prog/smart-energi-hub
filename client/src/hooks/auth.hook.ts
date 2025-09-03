import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Types
import type { CreateSignup, CreateLogin, ErrorResponse, SignupApiResponse, LoginApiResponse} from "../types/auth.types";
import type { AxiosError } from "axios";

// Hooks
import { signup, login} from "../api/auth.api";

export const useSignup = () => {
  useMutation({
    mutationFn: (signupPayload: CreateSignup) => signup(signupPayload),
    onSuccess: (data: SignupApiResponse) => {
      toast.success(data.message || "Signup Successful.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

export const useLogin = () => {
  useMutation({
    mutationFn: (loginPayload: CreateLogin) => login(loginPayload),
    onSuccess: (data: LoginApiResponse) => {
      toast.success(data.message || "Login Successful.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};