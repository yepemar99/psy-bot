import { useState } from "react";
import { LoaderPinwheel, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";

interface ChatInputProps {
  onSend?: (message: string) => void;
  loading?: boolean;
}

export default function ChatInput({
  onSend = () => {},
  loading = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="relative w-full">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        placeholder="Escribe tu mensaje..."
      />
      <Button
        disabled={loading || message.trim() === ""}
        size="icon"
        onClick={handleSend}
        className="absolute bottom-2.5 right-2.5 h-8 w-8 rounded-full p-0"
      >
        {loading ? (
          <LoaderPinwheel className="animate-spin h-12 w-12" />
        ) : (
          <SendHorizonal className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
