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
import { publicPages } from "@/config/publicPages";

export type IUser = {
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

type IResponseAuth = {
  token: string;
  auth: {
    user: {
      id: string;
      name: string;
      isAdmin: boolean;
    };
    email: string;
    ra: string;
    first_access: boolean;
  };
};

type IResponseUser = {
  id: string;
  name: string;
  isAdmin: boolean;
  token?: string;
  auth: {
    email: string;
    ra: string;
  };
};

interface IAuthContext {
  user: IUser | null;
  login: (userData: IAuthParams) => Promise<void>;
  logout: () => void;
  api: AxiosInstance;
}

const AuthContext = createContext({} as IAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const router = useRouter();

  const isPublicPage = publicPages.includes(router.pathname);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  });

  const setupAuthHeader = useCallback(() => {
    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${
          user?.token || appStorage.getItem("token")
        }`;

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [api.interceptors.request, user]);

  setupAuthHeader();

  useEffect(() => {
    if (!(user?.token || appStorage.getItem("token")) && !isPublicPage) {
      router.push("/login");

      return;
    }
  }, [isPublicPage, router, user]);

  useEffect(() => {
    const token = appStorage.getItem("token");

    if (isPublicPage) return;

    if (!token) return;

    api
      .get<IResponseUser>("/users")
      .then((response) => response.data)
      .then((userResponse) => {
        setUser({
          token,
          id: userResponse.id,
          email: userResponse.auth.email,
          ra: userResponse.auth.ra,
          name: userResponse.name,
          isAdmin: userResponse.isAdmin,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublicPage]);

  const login = async (userData: IAuthParams) => {
    const response = await api.post<IResponseAuth>("/auth", userData);

    const { token } = response.data;

    if (!token) {
      logout();

      return;
    }

    appStorage.setItem("token", token);

    setUser({
      token,
      id: response.data.auth.user.id,
      email: response.data.auth.email,
      ra: response.data.auth.ra,
      name: response.data.auth.user.name,
      isAdmin: response.data.auth.user.isAdmin,
    });

    if (response.data.auth.first_access) {
      router.push("/firstAccess");

      return;
    }

    router.push("/inicio");
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
