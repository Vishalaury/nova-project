import api from "./api";

export const registerUser = async (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = async (credentials) => {
  return api.post("/auth/login", credentials);
};

export const getCurrentUser = async () => {
  return api.get("/auth/me");
};