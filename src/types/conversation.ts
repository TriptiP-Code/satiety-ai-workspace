import type { Message } from "./chat";

export interface Conversation {
  id: string;
  title: string;
  workspace: string;
  messages: Message[];
}