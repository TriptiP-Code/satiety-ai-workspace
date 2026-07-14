import type { Conversation } from "./conversation";

export interface Workspace {
  id: string;
  name: string;
  isSystem?: boolean;
}