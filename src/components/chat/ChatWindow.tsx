import { useState } from "react";
import type { Message } from "../../types/chat";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import WelcomeSection from "./WelcomeSection";

function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);

  function handleSendMessage(content: string) {
  const newMessage: Message = {
    id: crypto.randomUUID(),
    role: "user",
    content,
  };

  setMessages((prev) => [...prev, newMessage]);
}

  return (
    <div className="flex h-full flex-col">
      {messages.length === 0 ? (
        <WelcomeSection />
      ) : (
        <MessageList messages={messages} />
      )}

      <ChatInput onSendMessage={handleSendMessage}/>
    </div>
  );
}

export default ChatWindow;