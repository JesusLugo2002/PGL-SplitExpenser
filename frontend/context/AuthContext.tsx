import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { ApiHandler } from "@/utils/ApiHandler";

const TOKEN_KEY = Constants.expoConfig?.extra?.tokenKey ?? "";

type AuthContextType = {
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<any>;
  register: (username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  loading: true,
  login: async () => ({}),
  register: async () => ({}),
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadToken = async () => {
        const saved = await SecureStore.getItemAsync(TOKEN_KEY);
        if (saved) setToken(saved);
        setLoading(false);
      };
      loadToken();
    }, []);

    async function register(username: string, password: string) {
      return await ApiHandler.postRequest("/auth/register", { username, password });
    }

    async function login(username: string, password: string) {
      const data = await ApiHandler.postRequest("/auth/login", { username, password })
      if (data.access_token) {
        await SecureStore.setItemAsync(TOKEN_KEY, data.access_token);
        setToken(data.access_token);
      }
      return data;
    }

    async function logout() {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setToken(null);
    }

    const value = useMemo(
      () => ({ token, loading, login, register, logout }),
      [token, loading],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
