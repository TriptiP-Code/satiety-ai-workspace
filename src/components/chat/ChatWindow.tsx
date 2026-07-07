import type { Message } from "../../types/chat";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import WelcomeSection from "./WelcomeSection";
import type { Conversation } from "../../types/conversation";
import { checkBackendHealth } from "../../services/api";

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

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === activeConversation.id
          ? {
              ...conversation,
              title:
                conversation.messages.length === 0
                  ? content.slice(0, 30)
                  : conversation.title,
              messages: [
                ...conversation.messages,
                userMessage,
              ],
            }
          : conversation
      )
    );

    setIsLoading(true);

    try {
      const data = await checkBackendHealth();

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message,
      };

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversation.id
            ? {
                ...conversation,
                messages: [
                  ...conversation.messages,
                  aiMessage,
                ],
              }
            : conversation
        )
      );
    } catch (error) {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Unable to connect to backend. Please try again.",
      };

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversation.id
            ? {
                ...conversation,
                messages: [
                  ...conversation.messages,
                  aiMessage,
                ],
              }
            : conversation
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  const messages = activeConversation?.messages ?? [];

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