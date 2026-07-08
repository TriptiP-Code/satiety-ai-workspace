import type { Message } from "../../types/chat";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import MarkdownComponents from "./MarkdownComponents";
import CopyButton from "./CopyButton";

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`mb-6 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="max-w-4xl w-full">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-400">
            {isUser ? "You" : "Satiety AI"}
          </span>

          <CopyButton text={message.content} />
        </div>

        <div
          className={`rounded-2xl px-5 py-4 ${
            isUser
              ? "bg-indigo-600 text-white"
              : "bg-slate-800 text-slate-100"
          }`}
        >
          <div className="markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;