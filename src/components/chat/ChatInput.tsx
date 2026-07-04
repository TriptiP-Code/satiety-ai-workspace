import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;

    onSendMessage(input);

    setInput("");
  }

  return (
    <div className="border-t border-slate-800 bg-slate-950 p-6">
      <div className="mx-auto flex max-w-4xl items-center gap-3">
        <Button variant="secondary" className="px-3">
          <Paperclip size={18} />
        </Button>

        <Input
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <Button className="px-3" onClick={handleSend}>
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}

export default ChatInput;