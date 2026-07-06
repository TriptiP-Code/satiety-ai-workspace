import { useState } from "react";
import type { Message } from "../../types/chat";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import WelcomeSection from "./WelcomeSection";
import type { Conversation } from "../../types/conversation";

interface ChatWindowProps {
  activeConversation?: Conversation;
  conversations: Conversation[];
  setConversations: React.Dispatch<
    React.SetStateAction<Conversation[]>
  >;
  isLoading: boolean;
  setIsLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function ChatWindow({
  activeConversation,
  conversations,
  setConversations,
  isLoading,
  setIsLoading,
}: ChatWindowProps)  {
  const [messages, setMessages] = useState<Message[]>([]);
  

function handleSendMessage(content: string) {
  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: "user",
    content,
  };

  setMessages((prev) => [...prev, userMessage]);

  setIsLoading(true);

  setTimeout(() => {
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Hello! I'm Satiety. AI integration is coming soon 🚀",
    };

    setMessages((prev) => [...prev, aiMessage]);

    setIsLoading(false);
  }, 1000);
}

  return (
    <div className="flex h-full flex-col">
      {messages.length === 0 ? (
        <WelcomeSection />
      ) : (
<MessageList
  messages={messages}
  isLoading={isLoading}
/>
      )}

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading}/>
    </div>
  );
}

export default ChatWindow;