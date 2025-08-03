/* eslint-disable @typescript-eslint/no-explicit-any */
import { routes } from "@/routes";
import { BaseService } from "./service";
import type {
  IChat,
  IChatDetails,
  IChatResponse,
} from "@/types/chat.interface";

class ChatService extends BaseService {
  async getChats({
    page = 1,
    perPage = 10,
    userId = "",
  }: {
    page?: number;
    perPage?: number;
    userId?: string;
  }): Promise<IChatResponse> {
    const response = await this.get<IChatResponse>(routes.api.chats, {
      params: { page, per_page: perPage, user_id: userId },
    });
    return {
      page: response?.data?.page || 1,
      perPage: response?.data?.perPage || 10,
      total: response?.data?.total || 0,
      data: response?.data?.data as IChat[],
    };
  }

  async getChatById(chatId: string): Promise<IChatDetails> {
    if (!chatId) {
      throw new Error("Chat ID is required");
    }
    const response = await this.get<any>(
      `${routes.api.chats}/${chatId}?include_messages=true`
    );
    return {
      id: response?.data?.id || "",
      name: response?.data?.name || "",
      createdAt: response?.data?.created_at || new Date(),
      messages: response?.data?.messages
        ? response.data.messages.map((message: any) => ({
            id: message?.id || "",
            content: message.content || "",
            sender: message.sender || "bot",
            createdAt: message.created_at || new Date(),
          }))
        : [],
    };
  }

  async deleteById(id: string) {
    if (!id) {
      throw new Error("Chat ID is required");
    }
    await this.delete(`${routes.api.chats}/${id}`);
  }
}

const baseURL = import.meta.env.VITE_API_BASE_URL || "";
const chatService = new ChatService(baseURL);
export default chatService;
