import messageService from "@/services/message.services";
import { useState } from "react";
import useGetChat from "./swr/useGetChat";
import useGetMe from "./swr/useGetme";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes";

const useChat = (chatId = "") => {
  const { data: user } = useGetMe();
  const { data: chat, isLoading, mutate } = useGetChat(chatId);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSendMessage = async (message = "") => {
    setLoading(true);
    if (!user?.id) {
      toast.error("Usuario no autenticado");
      setLoading(false);
      return;
    }
    try {
      const response = await messageService.send(user.id, chatId, message);
      mutate();
      if (!chatId && response.chatId) {
        navigate(routes.chat + "/" + response.chatId);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error al enviar el mensaje");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { chat, isLoading, loading, onSendMessage };
};

export default useChat;
