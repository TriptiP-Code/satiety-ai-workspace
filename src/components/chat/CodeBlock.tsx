import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  value: string;
}

function CodeBlock({
  language,
  value,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-700">

      <div className="flex items-center justify-between bg-slate-900 px-4 py-2">

        <span className="text-xs uppercase text-slate-400">
          {language || "code"}
        </span>

        <button
          onClick={handleCopy}
          className="text-xs text-slate-300 hover:text-white"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>

      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          background: "#020617",
          padding: "18px",
          fontSize: "14px",
        }}
      >
        {value}
      </SyntaxHighlighter>

    </div>
  );
}

export default CodeBlock;