import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Conversation } from "../../types/conversation";

import Header from "./Header";
import Sidebar from "./Sidebar";
import type { Workspace } from "../../types/workspace";
import { useTheme } from "../../context/ThemeContext";

const CONVERSATION_STORAGE_KEY = "satiety-conversations";

const WORKSPACE_STORAGE_KEY = "satiety-workspaces";

const ACTIVE_CHAT_KEY = "satiety-active-chat";

const ACTIVE_WORKSPACE_KEY =
  "satiety-active-workspace";

const THEME_KEY = "satiety-theme";
  

function AppLayout() {

  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  

  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => {
  const saved = localStorage.getItem(
    WORKSPACE_STORAGE_KEY
  );

  if (saved) {
    return JSON.parse(saved);
  }

  return [
    {
      id: crypto.randomUUID(),
      name: "General",
    },
  ];
});



  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(CONVERSATION_STORAGE_KEY);

if (saved) {
  const parsed = JSON.parse(saved);

  return parsed.map((conversation: any) => {
    // Already migrated
    if (conversation.workspaceId) {
      return conversation;
    }

    // Old data
    const workspaceName =
      conversation.workspace ?? "General";

    const workspace = workspaces.find(
      (w) => w.name === workspaceName
    );

    return {
      ...conversation,
      workspaceId:
        workspace?.id ?? workspaces[0].id,
    };
  });
}
    return [
      {
        id: crypto.randomUUID(),
        title: "New Chat",
        workspace: "General",
        messages: [],
      },
    ];
  });

  const [activeConversationId, setActiveConversationId] = useState(() => {
    const saved = localStorage.getItem(ACTIVE_CHAT_KEY);

    if (saved) {
      return saved;
    }

    const savedConversations = localStorage.getItem(CONVERSATION_STORAGE_KEY);

    if (savedConversations) {
      const parsed: Conversation[] = JSON.parse(savedConversations);
      return parsed[0].id;
    }

    return crypto.randomUUID();
  });

const [selectedWorkspaceId, setSelectedWorkspaceId] =
  useState(() => {
    return workspaces[0].id;
  });

  const [activeWorkspaceId, setActiveWorkspaceId] =
  useState(() => {
    const saved = localStorage.getItem(
      ACTIVE_WORKSPACE_KEY
    );

    if (saved) return saved;

    return workspaces[0].id;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
  localStorage.setItem(
    ACTIVE_WORKSPACE_KEY,
    activeWorkspaceId
  );
}, [activeWorkspaceId]);

  useEffect(() => {
  localStorage.setItem(
    WORKSPACE_STORAGE_KEY,
    JSON.stringify(workspaces)
  );
}, [workspaces]);

  useEffect(() => {
    localStorage.setItem(
      CONVERSATION_STORAGE_KEY,
      JSON.stringify(conversations)
    );
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(
      ACTIVE_CHAT_KEY,
      activeConversationId
    );
  }, [activeConversationId]);

  useEffect(() => {
  localStorage.setItem(THEME_KEY, theme);
}, [theme]);

useEffect(() => {
  document.documentElement.classList.remove(
    "light",
    "dark"
  );

  document.documentElement.classList.add(theme);
}, [theme]);

  const activeConversation =
    conversations.find(
      (conversation) =>
        conversation.id === activeConversationId
    ) ?? conversations[0];

  const activeWorkspace =
  workspaces.find(
    (workspace) =>
      workspace.id === activeWorkspaceId
  ) ?? workspaces[0];

function handleNewWorkspace() {
  const name = prompt("Workspace name");

  if (!name?.trim()) return;

  const workspace: Workspace = {
    id: crypto.randomUUID(),
    name: name.trim(),
  };

  setWorkspaces((prev) => [...prev, workspace]);

  const newConversation: Conversation = {
    id: crypto.randomUUID(),
    title: "New Chat",
    workspace: workspace.name,
    workspaceId: workspace.id,
    messages: [],
  };

  setConversations((prev) => [
    ...prev,
    newConversation,
  ]);

  setActiveWorkspaceId(workspace.id);
  setSelectedWorkspaceId(workspace.id);

  setActiveConversationId(newConversation.id);
}

function handleNewChat() {
  const workspace =
    workspaces.find(
      (w) => w.id === selectedWorkspaceId
    ) ?? workspaces[0];

  const newConversation: Conversation = {
    id: crypto.randomUUID(),
    title: "New Chat",
    workspace: workspace.name,
    workspaceId: workspace.id,
    messages: [],
  };

  setConversations((prev) => [
    ...prev,
    newConversation,
  ]);

  setActiveConversationId(newConversation.id);

  // If we're on Settings, go back to chat
  navigate("/");
}

function handleRenameWorkspace(
  workspaceId: string,
  newName: string
) {
  const name = newName.trim();

  if (!name) return;

  setWorkspaces((prev) =>
    prev.map((workspace) =>
      workspace.id === workspaceId
        ? {
            ...workspace,
            name,
          }
        : workspace
    )
  );

  setConversations((prev) =>
    prev.map((conversation) =>
      conversation.workspaceId === workspaceId
        ? {
            ...conversation,
            workspace: name,
          }
        : conversation
    )
  );
}

function handleDeleteWorkspace(
  workspaceId: string
) {
  if (workspaces.length === 1) {
    alert("At least one workspace must exist.");
    return;
  }

  const remainingWorkspaces = workspaces.filter(
    (workspace) => workspace.id !== workspaceId
  );

  const remainingConversations =
    conversations.filter(
      (conversation) =>
        conversation.workspaceId !== workspaceId
    );

  setWorkspaces(remainingWorkspaces);

  setConversations(remainingConversations);

  const fallbackWorkspace =
    remainingWorkspaces[0];

  setSelectedWorkspaceId(
    fallbackWorkspace.id
  );

  setActiveWorkspaceId(
    fallbackWorkspace.id
  );

  if (
    remainingConversations.length > 0
  ) {
    setActiveConversationId(
      remainingConversations[0].id
    );
  }
}

  function handleDeleteConversation(id: string) 
  {
    if (conversations.length === 1) {
      const newConversation: Conversation = {
        id: crypto.randomUUID(),
        title: "New Chat",
        workspace: "General",
        messages: [],
      };

      setConversations([newConversation]);
      setActiveConversationId(newConversation.id);
      return;
    }

    const index = conversations.findIndex(
      (conversation) => conversation.id === id
    );

    const remaining = conversations.filter(
      (conversation) => conversation.id !== id
    );

    setConversations(remaining);

    if (activeConversationId === id) {
      const nextConversation =
        remaining[index] ?? remaining[index - 1];

      setActiveConversationId(nextConversation.id);
    }
  }

  function handleRenameConversation(
    id: string,
    newTitle: string
  ) {
    const title =
      newTitle.trim() === ""
        ? "New Chat"
        : newTitle.trim();

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id
          ? {
              ...conversation,
              title,
            }
          : conversation
      )
    );
  }



  return (
    <div
  className={`flex h-screen transition-colors duration-300 ${
    theme === "dark"
      ? "bg-slate-950 text-slate-100"
      : "bg-slate-100 text-slate-900"
  }`}
>
      <Sidebar
        conversations={conversations}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
        workspaces={workspaces}
        selectedWorkspaceId={selectedWorkspaceId}
        onSelectWorkspace={setSelectedWorkspaceId}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onNewWorkspace={handleNewWorkspace}
        onRenameWorkspace={handleRenameWorkspace}
        onDeleteWorkspace={handleDeleteWorkspace}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        onSelectConversation={(id) => {
  setActiveConversationId(id);
  navigate("/");
}}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header
  theme={theme}
  toggleTheme={toggleTheme}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

        <main className="flex min-h-0 flex-1 overflow-hidden">
          <Outlet
            context={{
              activeConversation,
              conversations,
              setConversations,
              isLoading,
              setIsLoading,
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;