export interface IMessage {
  id?: string;
  content: string;
  sender: "user" | "bot";
  createdAt: Date;
}
