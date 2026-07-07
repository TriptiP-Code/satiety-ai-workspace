import { useState } from "react";

import Button from "../ui/Button";
import type { Conversation } from "../../types/conversation";
import ConversationList from "../sidebar/ConversationList";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  onNewChat: () =>void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, title: string) => void;
  onSelectConversation: (id: string) => void;
}

function Sidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  onSelectConversation,
}: SidebarProps) {
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-indigo-400">
          Satiety
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Your AI Workspace
        </p>
      </div>

      {/* New Chat */}
      <div className="space-y-4 p-4">
        <Button
          className="w-full"
          onClick={onNewChat}
        >
          + New Chat
        </Button>

        <input
          type="text"
          placeholder="🔍 Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition focus:border-indigo-500"
        />
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Recent Chats
        </p>

        <ConversationList
          conversations={filteredConversations}
          activeConversationId={activeConversationId}
          onDeleteConversation={onDeleteConversation}
          onRenameConversation={onRenameConversation}
          onSelectConversation={onSelectConversation}
        />
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