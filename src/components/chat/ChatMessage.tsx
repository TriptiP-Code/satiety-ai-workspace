import type { Message } from "../../types/chat";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`mb-4 flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >
        <div className="markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const {
                  children,
                  className,
                  ...rest
                } = props;

                const match = /language-(\w+)/.exec(
                  className || ""
                );

                const value = String(children).replace(
                  /\n$/,
                  ""
                );

                if (match) {
                  return (
                    <CodeBlock
                      language={match[1]}
                      value={value}
                    />
                  );
                }

                return (
                  <code
                    className="rounded bg-slate-700 px-1 py-0.5"
                    {...rest}
                  >
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