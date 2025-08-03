import type { IMessage } from "@/types/message.interface";

interface UserMessageProps {
  message: IMessage;
}

const UserMessage = ({ message }: UserMessageProps) => {
  return (
    <div className="px-4 py-2 rounded-lg bg-gray-700 backdrop-blur-sm text-sm max-w-md">
      {message.content}
    </div>
  );
};

export default UserMessage;
