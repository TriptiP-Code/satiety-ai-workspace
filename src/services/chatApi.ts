import type { Message } from "../types/chat";

const API_URL =
  "https://satiety-ai-workspace-backend.onrender.com/api/chat";

export async function sendMessage(messages: Message[]) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to contact AI");
  }

  return response.json();
}