import Button from "../ui/Button";
import type { Conversation } from "../../types/conversation";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
}

function Sidebar({conversations,activeConversationId,onNewChat,onSelectConversation}: SidebarProps) {
  return (
    <aside className="flex w-72 flex-col border-r border-slate-800 bg-slate-900">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-indigo-400">
          Satiety
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Your AI Workspace
        </p>
      </div>

      {/* Actions */}
      <div className="p-4">
        <Button className="w-full" onClick={onNewChat}>
          + New Chat
        </Button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Recent Chats
        </p>

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
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-800">
          ⚙ Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;