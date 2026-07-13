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
    <div className="h-full overflow-y-auto px-4 py-4 md:px-8 md:py-6">
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