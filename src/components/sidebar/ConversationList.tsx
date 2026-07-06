import type { Conversation } from "../../types/conversation";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
}

function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
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
        <button
          key={conversation.id}
          onClick={() => onSelectConversation(conversation.id)}
          className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
            activeConversationId === conversation.id
              ? "bg-indigo-600 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          {conversation.title}
        </button>
      ))}
    </div>
  );
}

export default ConversationList;