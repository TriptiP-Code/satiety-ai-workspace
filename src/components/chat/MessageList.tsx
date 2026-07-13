import type { Message } from "../../types/chat";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { useEffect, useRef } from "react";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

function MessageList({ messages, isLoading, }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, isLoading]);
  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto px-4 py-4 sm:px-6 lg:px-8">
{messages.map((message) => (
  <ChatMessage
    key={message.id}
    message={message}
  />
))}
{isLoading && <TypingIndicator />}
<div ref={bottomRef}></div>
    </div>
  );
  
}

export default MessageList;