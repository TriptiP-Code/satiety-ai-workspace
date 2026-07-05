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
    <div className="flex-1 overflow-y-auto p-6">
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