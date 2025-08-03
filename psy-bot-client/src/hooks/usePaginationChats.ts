import { useState } from "react";
import useChats from "./swr/useChats";
import { toast } from "sonner";
import chatService from "@/services/chat.services";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "@/routes";

const usePaginationChats = ({ userId = "" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const perPage = 2;

  const { data, isLoading, error, mutate, size, setSize, isReachingEnd } =
    useChats(perPage, userId);

  const [selectedChat, setSelectedChat] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = (id: string) => {
    setSelectedChat(id);
    setShowConfirmation(true);
  };

  const toggleConfirmation = () => {
    setShowConfirmation((prev) => !prev);
  };

  const onDelete = async () => {
    try {
      await chatService.deleteById(selectedChat);
      if (selectedChat == id) {
        navigate(routes.home);
      }
      await mutate();
      toast.success("Chat eliminado correctamente");
      setShowConfirmation(false);
      setSelectedChat("");
    } catch (error) {
      console.error("Error deleting chat:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error("Error al eliminar el chat: " + errorMessage);
    }
  };

  const handleLoadMore = () => {
    if (!isReachingEnd) {
      setSize(size + 1);
    } else {
      toast.info("No hay más chats para cargar");
    }
  };

  return {
    showConfirmation,
    data: data || [],
    isLoading,
    error,
    toggleConfirmation,
    handleDelete,
    onDelete,
    handleLoadMore,
    isReachingEnd,
  };
};

export default usePaginationChats;
