import type { Message } from "../types/chat";

// const API_URL =
//   "https://satiety-ai-workspace-backend.onrender.com/api/chat";

const API_URL =
"https://abcxyz123456.onrender.com/api/chat";
export async function sendMessage(messages: Message[]) {
let response: Response;

try {
  response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
    }),
  });
} catch {
  throw new Error(
    "Unable to reach Satiety servers. Please check your internet connection or try again later."
  );
}

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        "Something went wrong while contacting Satiety."
    );
  }

  return data;
}