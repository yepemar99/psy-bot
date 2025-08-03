import { routes } from "@/routes";
import authService from "@/services/auth.services";
import type { IUser } from "@/types/auth.interface";
import useSWR from "swr";

const useGetMe = () => {
  const { data, error, isLoading, mutate } = useSWR<IUser>(
    routes.api.me,
    async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await authService.getme(token);
      return response;
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useGetMe;
