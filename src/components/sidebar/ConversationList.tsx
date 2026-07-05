import type { Conversation } from "../../types/conversation";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
}: ConversationListProps) {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelectConversation(conversation.id)}
          className={`w-full rounded-lg px-3 py-2 text-left transition ${
            activeConversationId === conversation.id
              ? "bg-indigo-600 text-white"
              : "bg-slate-900 hover:bg-slate-800"
          }`}
        >
          {conversation.title}
        </button>
      ))}
    </div>
  );
}

export default ConversationList;