import { useEffect, useRef, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import type { Conversation } from "../../types/conversation";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (
    id: string,
    title: string
  ) => void;
}

function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
  onRename,
}: ConversationItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(conversation.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(conversation.title);
  }, [conversation.title]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function saveTitle() {
    onRename(conversation.id, title);
    setIsEditing(false);
  }

  function cancelEditing() {
    setTitle(conversation.title);
    setIsEditing(false);
  }

  return (
    <div
      className={`group flex items-center rounded-lg transition ${
        isActive
          ? "bg-indigo-600"
          : "hover:bg-slate-800"
      }`}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={saveTitle}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveTitle();
            }

            if (e.key === "Escape") {
              cancelEditing();
            }
          }}
          className="flex-1 rounded-lg bg-slate-700 px-3 py-2 text-sm text-white outline-none"
        />
      ) : (
        <>
          <button
            onClick={() =>
              onSelect(conversation.id)
            }
            onDoubleClick={() =>
              setIsEditing(true)
            }
            className={`flex-1 truncate px-3 py-2 text-left text-sm ${
              isActive
                ? "text-white"
                : "text-slate-300"
            }`}
          >
            {conversation.title}
          </button>

          <div className="mr-2 hidden items-center gap-1 group-hover:flex">
            <button
              onClick={() =>
                setIsEditing(true)
              }
              className="rounded p-1 text-slate-400 transition hover:bg-slate-700 hover:text-white"
            >
              <Pencil size={15} />
            </button>

            <button
              onClick={() =>
                onDelete(conversation.id)
              }
              className="rounded p-1 text-slate-400 transition hover:bg-red-600 hover:text-white"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ConversationItem;