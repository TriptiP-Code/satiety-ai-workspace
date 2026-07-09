import { useState } from "react";
import { ChevronDown, ChevronRight, FolderPlus } from "lucide-react";

import Button from "../ui/Button";

import type { Conversation } from "../../types/conversation";
import type { Workspace } from "../../types/workspace";

import ConversationList from "../sidebar/ConversationList";

interface SidebarProps {
  workspaces: Workspace[];
  conversations: Conversation[];

  activeConversationId: string;

  selectedWorkspaceId: string;
  activeWorkspace: string;

  onNewChat: () => void;
  onNewWorkspace: () => void;

  onSelectWorkspace: (workspaceId: string) => void;

  onDeleteConversation: (id: string) => void;
  onRenameConversation: (
    id: string,
    title: string
  ) => void;

  onSelectConversation: (id: string) => void;
}

function Sidebar({
  workspaces,
  conversations,

  activeConversationId,

  selectedWorkspaceId,
  activeWorkspace,

  onNewChat,
  onNewWorkspace,

  onSelectWorkspace,

  onDeleteConversation,
  onRenameConversation,
  onSelectConversation,
}: SidebarProps) {
  const [search, setSearch] = useState("");

const [expandedWorkspaceId, setExpandedWorkspaceId] =
  useState<string | null>(null);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

const groupedWorkspaces = workspaces.map((workspace) => {
  const workspaceConversations =
    filteredConversations.filter(
      (conversation) =>
        conversation.workspaceId === workspace.id
    );

  return {
    workspace,
    conversations: workspaceConversations,
    hasSearchResult:
      search.trim() !== "" &&
      workspaceConversations.length > 0,
  };
});

  return (
    <aside className="flex w-80 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <div>
          <h1 className="text-xl font-bold text-indigo-400">
            Satiety
          </h1>

          <p className="text-xs text-slate-400">
            Your AI Workspace
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4 p-4">
        <Button
          className="w-full"
          onClick={onNewChat}
        >
          + New Chat
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          onClick={onNewWorkspace}
        >
          <FolderPlus size={18} />

          <span className="ml-2">
            New Workspace
          </span>
        </Button>

        <input
          type="text"
          placeholder="🔍 Search conversations..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition focus:border-indigo-500"
        />
      </div>

      {/* Workspaces */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Recent Chats
        </p>

        <div className="space-y-4">
          {groupedWorkspaces.map(
  ({
    workspace,
    conversations,
    hasSearchResult,
  }) => (
              <div key={workspace.id}>
<button
  onClick={() => {
    onSelectWorkspace(workspace.id);

    setExpandedWorkspaceId((prev) =>
      prev === workspace.id
        ? null
        : workspace.id
    );
  }}
  className={`mb-2 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition ${
    selectedWorkspaceId === workspace.id
      ? "bg-slate-800 text-indigo-400"
      : "text-slate-400 hover:bg-slate-800"
  }`}
>
  {(
  expandedWorkspaceId === workspace.id ||
  hasSearchResult
) ? (
    <ChevronDown size={16} />
  ) : (
    <ChevronRight size={16} />
  )}

  <span className="text-lg">
    {(
  expandedWorkspaceId === workspace.id ||
  hasSearchResult
)
  ? "📂"
  : "📁"}
  </span>

  <span className="truncate">
    {workspace.name}
  </span>
</button>
{(
  expandedWorkspaceId === workspace.id ||
  hasSearchResult
) && (
                  <ConversationList
                    conversations={
                      conversations
                    }
                    activeConversationId={
                      activeConversationId
                    }
                    selectedWorkspaceId={
                      selectedWorkspaceId
                    }
                    workspaceId={workspace.id}
                    onSelectWorkspace={
                      onSelectWorkspace
                    }
                    onDeleteConversation={
                      onDeleteConversation
                    }
                    onRenameConversation={
                      onRenameConversation
                    }
                    onSelectConversation={
                      onSelectConversation
                    }
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex h-[88px] items-center border-t border-slate-800 px-4">
        <button className="w-full rounded-lg px-3 py-3 text-left text-sm hover:bg-slate-800">
          ⚙ Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;