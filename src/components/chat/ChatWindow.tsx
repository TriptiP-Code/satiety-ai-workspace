import type { Message } from "../../types/chat";
import type { Conversation } from "../../types/conversation";

import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import WelcomeSection from "./WelcomeSection";

interface ChatWindowProps {
  activeConversation?: Conversation;
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
  setConversations,
  isLoading,
  setIsLoading,
}: ChatWindowProps) {
  const messages = activeConversation?.messages ?? [];

  function handleSendMessage(content: string) {
    if (!activeConversation) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== activeConversation.id) {
          return conversation;
        }

        return {
          ...conversation,
          title:
            conversation.title === "New Chat"
              ? content.slice(0, 30)
              : conversation.title,
          messages: [...conversation.messages, userMessage],
        };
      })
    );

    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Hello! I'm Satiety. AI integration is coming soon 🚀",
      };

      setConversations((prev) =>
        prev.map((conversation) => {
          if (conversation.id !== activeConversation.id) {
            return conversation;
          }

          return {
            ...conversation,
            messages: [...conversation.messages, aiMessage],
          };
        })
      );

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

      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ChatWindow;