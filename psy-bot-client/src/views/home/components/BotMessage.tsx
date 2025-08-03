import type { IMessage } from "@/types/message.interface";

interface BotMessageProps {
  message: IMessage;
}

const BotMessage = ({ message }: BotMessageProps) => {
  return <div className="px-4 py-2 text-sm max-w-lg">{message.content}</div>;
};

export default BotMessage;
