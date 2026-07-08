import { useState } from "react";

import Button from "../ui/Button";
import type { Conversation } from "../../types/conversation";
import ConversationList from "../sidebar/ConversationList";
import { ChevronDown, ChevronRight } from "lucide-react";
import { FolderPlus } from "lucide-react";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  activeWorkspace: string;
  onNewChat: () => void;
  onNewWorkspace: () => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, title: string) => void;
  onSelectConversation: (id: string) => void;
}

function Sidebar({
  conversations,
  activeConversationId,
  activeWorkspace,
  onNewChat,
  onNewWorkspace,
  onDeleteConversation,
  onRenameConversation,
  onSelectConversation,
}: SidebarProps) {
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(search.toLowerCase()),
  );

  const groupedConversations = filteredConversations.reduce(
    (groups, conversation) => {
      const workspace = conversation.workspace;

      if (!groups[workspace]) {
        groups[workspace] = [];
      }

      groups[workspace].push(conversation);

      return groups;
    },
    {} as Record<string, Conversation[]>,
  );
  const [collapsedWorkspaces, setCollapsedWorkspaces] = useState<
    Record<string, boolean>
  >({});

  return (
    <aside className="flex w-80 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <div>
          <h1 className="text-xl font-bold text-indigo-400">Satiety</h1>

          <p className="text-xs text-slate-400">Your AI Workspace</p>
        </div>
      </div>

      {/* New Chat */}
      <div className="space-y-4 p-4">
        <Button className="w-full" onClick={onNewChat}>
          + New Chat
        </Button>
        <Button variant="secondary" className="w-full" onClick={onNewWorkspace}>
          <FolderPlus size={18} />
          <span className="ml-2">New Workspace</span>
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

        <div className="space-y-4">
          {Object.entries(groupedConversations).map(
            ([workspace, conversations]) => (
              <div key={workspace}>
                <button
                  onClick={() =>
                    setCollapsedWorkspaces((prev) => ({
                      ...prev,
                      [workspace]: !prev[workspace],
                    }))
                  }
                  className={`mb-2 flex w-full items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide transition
${
  activeWorkspace === workspace
    ? "bg-slate-800 text-indigo-400"
    : "text-slate-500 hover:bg-slate-800"
}`}
                >
                  {collapsedWorkspaces[workspace] ? (
                    <ChevronRight size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}

                  {workspace}
                </button>

                {!collapsedWorkspaces[workspace] && (
                  <ConversationList
                    conversations={conversations}
                    activeConversationId={activeConversationId}
                    onDeleteConversation={onDeleteConversation}
                    onRenameConversation={onRenameConversation}
                    onSelectConversation={onSelectConversation}
                  />
                )}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="h-[88px] border-t border-slate-800 px-4 flex items-center">
        <button className="w-full rounded-lg px-3 py-3 text-left text-sm hover:bg-slate-800">
          ⚙ Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
