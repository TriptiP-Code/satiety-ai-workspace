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
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "⚠ Unable to contact Satiety AI.",
      };

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversation.id
            ? {
                ...conversation,
                messages: [...conversation.messages, errorMessage],
              }
            : conversation
        )
      );

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!activeConversation) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      {activeConversation.messages.length === 0 ? (
        <WelcomeSection />
      ) : (
        <MessageList
          messages={activeConversation.messages}
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