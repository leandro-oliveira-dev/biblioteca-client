import { api } from "@/lib/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { appStorage } from "@/lib/storage";

type IUser = {
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
}

const AuthContext = createContext({} as IAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const router = useRouter();

  const isLoginPage = router.pathname === "/login";

  useEffect(() => {
    const token = appStorage.getItem("token");

    if (isLoginPage) return;

    if (!token) return;

    api.get("/users").then((response) => {
      setUser({
        id: response.data.id,
        ra: response.data.auth.ra,
        email: response.data.auth.email,
        name: response.data.name,
        isAdmin: response.data.isAdmin,
      });
    });
  }, [isLoginPage]);

  useEffect(() => {
    const token = appStorage.getItem("token");

    console.log({ isLoginPage });

    if (!token && !isLoginPage) {
      router.push("/login");
    }
  }, [isLoginPage, router]);

  const login = async (userData: IAuthParams) => {
    try {
      const response = await api.post<IResponseUser>("/auth", userData);

      const { token } = response.data;

      setUser({
        id: response.data.auth.user.id,
        email: response.data.auth.email,
        ra: response.data.auth.ra,
        name: response.data.auth.user.name,
        isAdmin: response.data.auth.user.isAdmin,
      });

      appStorage.setItem("token", token);

      return token;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    appStorage.removeItem("token");

    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
