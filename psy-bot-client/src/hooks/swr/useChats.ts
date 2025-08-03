/* eslint-disable @typescript-eslint/no-explicit-any */
import { routes } from "@/routes";
import chatService from "@/services/chat.services";
import useSWRInfinite from "swr/infinite";

const useChats = (perPage = 10, userId = "") => {
  const getKey = (index: number, previousPageData: any) => {
    if (previousPageData && previousPageData.data?.length < perPage)
      return null; // no hay más
    return [routes.api.chats, { page: index + 1, perPage, userId }];
  };

  const { data, error, isLoading, mutate, size, setSize } = useSWRInfinite(
    getKey,
    async ([, params]) => {
      if (typeof params !== "object" || params === null) {
        throw new Error("Invalid params for chatService.getChats");
      }
      const { page, perPage, userId } = params as {
        page: number;
        perPage: number;
        userId: string;
      };
      const response = await chatService.getChats({ page, perPage, userId });
      return response;
    }
  );

  const flatData = data ? data.flatMap((page) => page.data) : [];

  const isLoadingInitial = isLoading && !data;
  const isLoadingMore =
    isLoadingInitial ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.length < perPage);

  return {
    data: flatData,
    error,
    isLoading: isLoadingMore,
    mutate,
    size,
    setSize,
    isReachingEnd,
  };
};

export default useChats;
