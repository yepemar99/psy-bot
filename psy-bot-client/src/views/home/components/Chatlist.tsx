import type { IMessage } from "@/types/message.interface";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ChatlistProps {
  messages?: IMessage[];
  loading?: boolean;
}

const Chatlist = ({ messages = [], loading = false }: ChatlistProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll al final cuando cambian los mensajes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-3 p-4 h-full">
      {messages.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl text-muted-foreground">
            Listo cuando tú lo estés.
          </h1>
        </div>
      )}

      <AnimatePresence initial={false}>
        {messages.map((message, i) => (
          <motion.div
            key={message.id + "-" + i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-3"
          >
            {message.sender === "user" ? (
              <div className="flex justify-end">
                <UserMessage message={message} />
              </div>
            ) : (
              <div className="flex justify-start">
                <BotMessage message={message} />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Loading visual */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-32 text-muted-foreground"
        >
          <MessageCircle className="w-10 h-10 animate-bounce text-primary mb-2" />
          <p className="text-sm">Pensando...</p>
        </motion.div>
      )}

      {/* Scroll target */}
      <div ref={bottomRef} />
    </div>
  );
};

export default Chatlist;
