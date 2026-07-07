import type { Message } from "../../types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`mb-4 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
<div
  className={`w-fit max-w-[85%] rounded-2xl px-4 py-3 ${
    isUser
      ? "ml-auto bg-indigo-600 text-white"
      : "bg-slate-800 text-slate-100"
  }`}
>
        <div className="markdown min-w-0 overflow-x-auto">
          <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code(props) {
      const { children, className } = props;

      const match = /language-(\w+)/.exec(
        className || ""
      );

      if (match) {
        return (
          <CodeBlock
            language={match[1]}
            value={String(children).replace(/\n$/, "")}
          />
        );
      }

      return (
        <code className="rounded bg-slate-700 px-1">
          {children}
        </code>
      );
    },
  }}
>
  {message.content}
</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;