import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { appStorage } from "@/lib/storage";
import axios, { AxiosInstance } from "axios";
import { error } from "console";

type IUser = {
  token?: string;
  id: string;
  name: string;
  email: string;
  ra: string;
  isAdmin: boolean;
};

type IAuthParams = {
  email: string;
  ra: string;
  password: string;
};

type IResponseUser = {
  token: string;
  auth: {
    user: {
      id: string;
      name: string;
      isAdmin: boolean;
    };
    email: string;
    ra: string;
  };
};

interface IAuthContext {
  user: IUser | null;
  login: (userData: IAuthParams) => Promise<string>;
  logout: () => void;
  api: AxiosInstance;
}

const AuthContext = createContext({} as IAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const router = useRouter();

  const isLoginPage = router.pathname === "/login";

  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

  const setupAuthHeader = useCallback(() => {
    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.token}`;
        return config;
      },
      (error) => {
        router.push("/login");

        return Promise.reject(error);
      }
    );
  }, [api.interceptors.request, user?.token, router]);

  setupAuthHeader();

  useEffect(() => {
    if (!user?.token && !isLoginPage) {
      router.push("/login");

      return;
    }
  }, [isLoginPage, router, user?.token]);

  const login = async (userData: IAuthParams) => {
    try {
      const response = await api.post<IResponseUser>("/auth", userData);

      const { token } = response.data;

      appStorage.setItem("token", token);

      setUser({
        token,
        id: response.data.auth.user.id,
        email: response.data.auth.email,
        ra: response.data.auth.ra,
        name: response.data.auth.user.name,
        isAdmin: response.data.auth.user.isAdmin,
      });

      return token;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logout = () => {
    appStorage.removeItem("token");

    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};
