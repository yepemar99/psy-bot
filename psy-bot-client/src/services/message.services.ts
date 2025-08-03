import { routes } from "@/routes";
import { BaseService } from "./service";

class MessageService extends BaseService {
  async send(
    userId = "",
    chatId = "",
    message = ""
  ): Promise<{
    botResponse: string;
    userMessage: string;
    chatId: string;
  }> {
    const response = await this.post<{
      bot_response: string;
      user_message: string;
      chat_id: string;
    }>(routes.api.message, {
      user_id: userId,
      chat_id: chatId,
      content: message,
    });
    return {
      botResponse: response?.data?.bot_response || "",
      userMessage: response?.data?.user_message || "",
      chatId: response?.data?.chat_id || "",
    };
  }
}

const baseURL = import.meta.env.VITE_API_BASE_URL || "";
const messageService = new MessageService(baseURL);
export default messageService;
