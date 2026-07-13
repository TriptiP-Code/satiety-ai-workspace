import type { Message } from "../../types/chat";
import type { Conversation } from "../../types/conversation";

import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import WelcomeSection from "./WelcomeSection";

import { sendMessage } from "../../services/chatApi";

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
  setConversations,
  isLoading,
  setIsLoading,
}: ChatWindowProps) {
  async function handleSendMessage(content: string) {
    if (!activeConversation) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    // Add user message immediately
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === activeConversation.id
          ? {
              ...conversation,
              title:
                conversation.messages.length === 0
                  ? content.slice(0, 30)
                  : conversation.title,
              messages: [...conversation.messages, userMessage],
            }
          : conversation
      )
    );

    setIsLoading(true);

    try {
      const data = await sendMessage([
  ...activeConversation.messages,
  userMessage,
]);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversation.id
            ? {
                ...conversation,
                messages: [...conversation.messages, aiMessage],
              }
            : conversation
        )
      );
} catch (error) {
  console.error(error);

  const message =
    error instanceof Error
      ? error.message
      : "Something went wrong while contacting Satiety.";

  const errorMessage: Message = {
    id: crypto.randomUUID(),
    role: "assistant",
    content: `⚠️ ${message}`,
  };

  setConversations((prev) =>
    prev.map((conversation) =>
      conversation.id === activeConversation.id
        ? {
            ...conversation,
            messages: [
              ...conversation.messages,
              errorMessage,
            ],
          }
        : conversation
    )
  );
}finally {
      setIsLoading(false);
    }
  }

  if (!activeConversation) {
    return null;
  }

return (
  <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
    <div className="flex-1 min-h-0 overflow-hidden">
      {activeConversation.messages.length === 0 ? (
        <WelcomeSection />
      ) : (
        <MessageList
          messages={activeConversation.messages}
          isLoading={isLoading}
        />
      )}
    </div>

    <ChatInput
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
    />
  </div>
);
}

export default ChatWindow;