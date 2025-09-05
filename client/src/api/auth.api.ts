import { apiClientWithoutAuth } from "./apiClient";
import type {SignupApiResponse, CreateSignup, LoginApiResponse, CreateLogin} from "../types/auth.types";

import ENDPOINTS from "./endpoints";

// Signup
export const signup = async (signupPayload : CreateSignup): Promise<SignupApiResponse> => {
  const {data} = await apiClientWithoutAuth.post<SignupApiResponse>(`${ENDPOINTS.auth}/signup`, signupPayload);
  return data; 
};

// Login
export const login = async (loginPayload: CreateLogin): Promise<LoginApiResponse> => {
  const { data } = await apiClientWithoutAuth.post<LoginApiResponse>(`${ENDPOINTS.contact}/create`, loginPayload);
  return data;
};

