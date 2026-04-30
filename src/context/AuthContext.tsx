"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { api, ApiResponse } from "@/lib/api-client";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
  current_plan: string | null;
  email_verified_at: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<ApiResponse>;
  register: (data: any) => Promise<ApiResponse>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function initAuth() {
      const token = api.getToken();
      if (token) {
        const response = await api.get("/api/user");
        if (response.status === "success") {
          setUser(response.data);
        } else {
          api.setToken(null);
        }
      }
      setLoading(false);
    }
    initAuth();
  }, []);

  const login = async (credentials: any) => {
    const response = await api.post("/api/auth/login", credentials);
    if (response.status === "success") {
      api.setToken(response.data.token);
      setUser(response.data.user);
    }
    return response;
  };

  const register = async (userData: any) => {
    const response = await api.post("/api/auth/register", userData);
    if (response.status === "success") {
      api.setToken(response.data.token);
      setUser(response.data.user);
    }
    return response;
  };

  const logout = async () => {
    await api.post("/api/auth/logout", {});
    api.setToken(null);
    setUser(null);
    router.push("/login");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const refreshUser = async () => {
    const token = api.getToken();
    if (token) {
      const response = await api.get("/api/user");
      if (response.status === "success") {
        setUser(response.data);
      } else {
        api.setToken(null);
        setUser(null);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        refreshUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
