import ChatInput from "@/components/chatBox";
import Chatlist from "./components/Chatlist";
import useChat from "@/hooks/useChat";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();
  const { chat, isLoading, loading, onSendMessage } = useChat(id);

  return (
    <div
      className="flex flex-col w-full"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <div className="flex-1 p-4 overflow-y-auto w-full">
        <div className="mx-auto max-w-4xl h-full">
          <Chatlist
            messages={id ? chat?.messages || [] : []}
            loading={loading}
          />
        </div>
      </div>
      <div className="p-4 border-t w-full mx-auto max-w-4xl">
        <ChatInput onSend={onSendMessage} loading={loading || isLoading} />
      </div>
    </div>
  );
};

export default Chat;
