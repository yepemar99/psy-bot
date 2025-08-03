import { routes } from "@/routes";
import chatService from "@/services/chat.services";
import useSWR from "swr";

const useGetChat = (chatId: string = "") => {
  const { data, error, isLoading, mutate } = useSWR(
    routes.api.chats + chatId,
    async () => {
      if (!chatId) {
        throw new Error("Id del chat es requerido");
      }
      const response = await chatService.getChatById(chatId);
      return response;
    }
  );
  return { data, error, isLoading, mutate };
};

export default useGetChat;
