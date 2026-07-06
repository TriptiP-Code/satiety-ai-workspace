import { Trash2 } from "lucide-react";
import type { Conversation } from "../../types/conversation";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No conversations yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`group flex items-center justify-between rounded-lg transition ${
            activeConversationId === conversation.id
              ? "bg-indigo-600"
              : "hover:bg-slate-800"
          }`}
        >
          <button
            onClick={() => onSelectConversation(conversation.id)}
            className={`flex-1 truncate px-3 py-2 text-left text-sm ${
              activeConversationId === conversation.id
                ? "text-white"
                : "text-slate-300"
            }`}
          >
            {conversation.title}
          </button>

          <button
            onClick={() => onDeleteConversation(conversation.id)}
            className="mr-2 hidden rounded p-1 text-slate-400 hover:bg-red-500 hover:text-white group-hover:block"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ConversationList;