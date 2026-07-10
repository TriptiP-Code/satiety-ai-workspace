import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, FolderPlus } from "lucide-react";

import Button from "../ui/Button";

import type { Conversation } from "../../types/conversation";
import type { Workspace } from "../../types/workspace";

import ConversationList from "../sidebar/ConversationList";
import WorkspaceSection from "../sidebar/WorkspaceSection";

interface SidebarProps {
  workspaces: Workspace[];
  conversations: Conversation[];

  activeConversationId: string;

  selectedWorkspaceId: string;
  theme: "dark" | "light";
  activeWorkspace: string;

  onNewChat: () => void;
  onNewWorkspace: () => void;

onSelectWorkspace: (workspaceId: string) => void;

onRenameWorkspace: (
  workspaceId: string,
  newName: string
) => void;

onDeleteWorkspace: (
  workspaceId: string
) => void;

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
  theme,
  activeWorkspace,

  onNewChat,
  onNewWorkspace,

onSelectWorkspace,

onRenameWorkspace,
onDeleteWorkspace,

onDeleteConversation,
onRenameConversation,
  onSelectConversation,
}: SidebarProps) {
  const [search, setSearch] = useState("");

const [expandedWorkspaceId, setExpandedWorkspaceId] =
  useState<string | null>(null);

const workspaceRefs = useRef<
  Record<string, HTMLDivElement | null>
>({});

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

useEffect(() => {
  if (!search.trim()) return;

  const firstMatch = groupedWorkspaces.find(
    (group) => group.hasSearchResult
  );

  if (!firstMatch) return;

  requestAnimationFrame(() => {
    workspaceRefs.current[
      firstMatch.workspace.id
    ]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}, [search, groupedWorkspaces]);

  return (
    <aside className={`flex w-80 shrink-0 flex-col border-r transition-colors duration-300 ${
  theme === "dark"
    ? "border-slate-800 bg-slate-900"
    : "border-slate-300 bg-slate-100"
}`}>
      {/* Header */}
      <div className={`flex h-16 items-center border-b px-6 ${
  theme === "dark"
    ? "border-slate-800"
    : "border-slate-300"
}`}>
        <div>
          <h1 className="text-xl font-bold text-indigo-400">
            Satiety
          </h1>

          <p className={`text-xs ${
  theme === "dark"
    ? "text-slate-400"
    : "text-slate-600"
}`}>
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
          className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
  theme === "dark"
    ? "border-slate-700 bg-slate-800 text-white focus:border-indigo-500"
    : "border-slate-300 bg-white text-slate-900 focus:border-indigo-500"
}`}
        />
      </div>

      {/* Workspaces */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <p className={`mb-3 text-xs font-semibold uppercase tracking-wide ${
  theme === "dark"
    ? "text-slate-500"
    : "text-slate-600"
}`}>
          Recent Chats
        </p>

        <div className="space-y-4">
          {groupedWorkspaces.map(
  ({
    workspace,
    conversations,
    hasSearchResult,
  }) => (
              <div
  key={workspace.id}
  ref={(element) => {
    workspaceRefs.current[workspace.id] =
      element;
  }}
>
<WorkspaceSection
 theme={theme}
  name={workspace.name}
  isSelected={
    selectedWorkspaceId === workspace.id
  }
  isExpanded={
    expandedWorkspaceId === workspace.id ||
    hasSearchResult
  }
  onClick={() => {
    onSelectWorkspace(workspace.id);

    setExpandedWorkspaceId((prev) =>
      prev === workspace.id
        ? null
        : workspace.id
    );
  }}
  onRename={() => {
    const name = prompt(
      "Rename workspace",
      workspace.name
    );

    if (!name) return;

    onRenameWorkspace(
      workspace.id,
      name
    );
  }}
  onDelete={() => {
    if (
      confirm(
        `Delete "${workspace.name}" workspace?`
      )
    ) {
      onDeleteWorkspace(workspace.id);
    }
  }}
/>
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
                    theme={theme}
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={`flex h-[88px] items-center border-t px-4 ${
  theme === "dark"
    ? "border-slate-800"
    : "border-slate-300"
}`}>
        <button className={`w-full rounded-lg px-3 py-3 text-left text-sm transition ${
  theme === "dark"
    ? "hover:bg-slate-800"
    : "hover:bg-slate-200"
}`}>
          ⚙ Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;