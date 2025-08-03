import { routes } from "@/routes";
import authService from "@/services/auth.services";
import { useState } from "react";
import { toast } from "sonner";
import useGetMe from "./swr/useGetme";
import type { IUser } from "@/types/auth.interface";

interface UseUserReturn {
  user: IUser | undefined;
  loading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    lastname: string
  ) => Promise<void>;
  logout: () => void;
}

export function useUser(): UseUserReturn {
  const { data: user, error, isLoading, mutate } = useGetMe();
  const [loading, setLoading] = useState(false);

  const register = async (
    email: string,
    password: string,
    name: string,
    lastname: string
  ) => {
    setLoading(true);

    try {
      await authService.register(name, lastname, email, password);
      toast.success("Registro exitoso");
      window.location.href = routes.auth.login;
    } catch {
      toast.error("Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response?.token) {
        localStorage.setItem("token", response.token);
      }
      mutate();
      toast.success("Inicio de sesión exitoso");
      window.location.href = routes.home;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error en el inicio de sesión";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    mutate();
  };

  return {
    user,
    loading: isLoading || loading,
    error,
    register,
    login,
    logout,
  };
}
