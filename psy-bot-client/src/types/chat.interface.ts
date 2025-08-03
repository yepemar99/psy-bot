import type { IResponse } from "./common/response.interface";
import type { IMessage } from "./message.interface";

export interface IChat {
  id?: string;
  name: string;
  createdAt: Date;
}

export interface IChatResponse extends IResponse {
  data: IChat[];
}

export interface IChatDetails extends IChat {
  messages: IMessage[];
}
