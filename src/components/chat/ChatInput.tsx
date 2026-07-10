import { useState } from "react";
import { Paperclip, Send } from "lucide-react";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { useTheme } from "../../context/ThemeContext";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

function ChatInput({
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const { theme } = useTheme();

  function handleSend() {
    if (isLoading) return;

    if (!input.trim()) return;

    onSendMessage(input);

    setInput("");
  }

  return (
    <div
      className={`border-t px-8 py-5 transition-colors duration-300 ${
        theme === "dark"
          ? "border-slate-800 bg-slate-950"
          : "border-slate-300 bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-4xl items-center gap-3">
        <Button
          variant="secondary"
          className="px-3"
          disabled={isLoading}
        >
          <Paperclip size={18} />
        </Button>

        <Input
          placeholder={
            isLoading
              ? "Satiety is thinking..."
              : "Ask anything..."
          }
          value={input}
          disabled={isLoading}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !isLoading
            ) {
              handleSend();
            }
          }}
        />

        <Button
          className="px-3"
          onClick={handleSend}
          disabled={isLoading}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}

export default ChatInput;