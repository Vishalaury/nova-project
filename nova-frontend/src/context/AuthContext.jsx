import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/authService";

import {
  clearAuth,
  getToken,
  getUser,
  setAuth,
} from "../utils/storage";

export const AuthContext = createContext(null);

const extractToken = (response) => {
  return (
    response?.data?.token ||
    response?.data?.accessToken ||
    response?.data?.data?.token ||
    null
  );
};

const extractUser = (response) => {
  return (
    response?.data?.user ||
    response?.data?.data?.user ||
    response?.data?.data ||
    null
  );
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const response = await getCurrentUser();

        const currentUser = extractUser(response);

        if (currentUser) {
          setUser(currentUser);

          localStorage.setItem(
            "nova_user",
            JSON.stringify(currentUser)
          );
        }
      } catch (error) {
        clearAuth();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    const token = extractToken(response);
    const currentUser = extractUser(response);

    if (!token) {
      throw new Error(
        "Login successful but authentication token was not returned."
      );
    }

    setAuth(token, currentUser);

    setUser(currentUser);

    return response;
  };

  const register = async (userData) => {
    return registerUser(userData);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(getToken()),
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}