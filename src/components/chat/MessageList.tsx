import type { Message } from "../../types/chat";

interface MessageListProps {
  messages: Message[];
}

function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {messages.map((message) => (
        <div key={message.id}>
          {message.content}
        </div>
      ))}
    </div>
  );
}

export default MessageList;