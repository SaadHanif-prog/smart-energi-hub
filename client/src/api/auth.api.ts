import apiClient from "../api/apiClient";
import type {SignupApiResponse, CreateSignup, Login, LoginApiResponse, CreateLogin} from "../types/auth.types";

import ENDPOINTS from "./endpoints";

// Signup
export const signup = async (signupPayload : CreateSignup): Promise<SignupApiResponse> => {
  const {data} = await apiClient.post<SignupApiResponse>(`${ENDPOINTS.auth}/signup`, signupPayload);
  return data; 
};

// Login
export const login = async (loginPayload: CreateLogin): Promise<LoginApiResponse> => {
  const { data } = await apiClient.post<LoginApiResponse>(`${ENDPOINTS.contact}/create`, loginPayload);
  return data;
};

