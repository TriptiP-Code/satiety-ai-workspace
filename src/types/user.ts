import type { Conversation } from "./conversation";
import type { Workspace } from "./workspace";

// export interface User {
//   id: string;

//   name: string;

//   email: string;

//   password: string;

//   conversations: Conversation[];

//   workspaces: Workspace[];

//   theme: "light" | "dark";
// }

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}