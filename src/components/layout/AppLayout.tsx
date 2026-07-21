import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Conversation } from "../../types/conversation";

import Header from "./Header";
import Sidebar from "./Sidebar";
import type { Workspace } from "../../types/workspace";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {
  getWorkspacesApi,
  createWorkspaceApi,
  renameWorkspaceApi,
  deleteWorkspaceApi,
} from "../../services/workspaceApi";

const THEME_KEY = "satiety-theme";

const CONVERSATION_STORAGE_KEY = "satiety-conversations";

const WORKSPACE_STORAGE_KEY = "satiety-workspaces";

const ACTIVE_WORKSPACE_KEY = "satiety-active-workspace";
  

function AppLayout() {

  const { user } = useAuth();

  const conversationStorageKey =
  `${CONVERSATION_STORAGE_KEY}-${user?.id}`;

const workspaceStorageKey =
  `${WORKSPACE_STORAGE_KEY}-${user?.id}`;

const activeWorkspaceKey =
  `${ACTIVE_WORKSPACE_KEY}-${user?.id}`;

  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();


  const [workspaces, setWorkspaces] =
  useState<Workspace[]>([]);


  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(conversationStorageKey);

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

const [activeConversationId, setActiveConversationId] =
  useState<string | null>(null);
const [selectedWorkspaceId, setSelectedWorkspaceId] =
  useState("");

  const [activeWorkspaceId, setActiveWorkspaceId] =
  useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
  async function loadWorkspaces() {
    if (!user) return;

    try {
      const data = await getWorkspacesApi();

      const formatted = data.map((workspace: any) => ({
        id: workspace.id,
        name: workspace.name,
        isSystem: workspace.is_system,
      }));

      setWorkspaces(formatted);

      if (formatted.length > 0) {
        setSelectedWorkspaceId(formatted[0].id);
        setActiveWorkspaceId(formatted[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  loadWorkspaces();
}, [user]);

  useEffect(() => {
    localStorage.setItem(
      conversationStorageKey,
      JSON.stringify(conversations)
    );
  }, [conversations]);


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

// useEffect(() => {
//   const generalWorkspace =
//     workspaces.find((w) => w.isSystem) ??
//     workspaces[0];

//   const newConversation: Conversation = {
//     id: crypto.randomUUID(),
//     title: "Untitled Chat",
//     workspace: generalWorkspace.name,
//     workspaceId: generalWorkspace.id,
//     messages: [],
//   };

// setConversations((prev) => {
//   const cleaned = prev.filter(
//     (conversation) =>
//       !(
//         conversation.title === "Untitled Chat" &&
//         conversation.messages.length === 0
//       )
//   );

//   return [newConversation, ...cleaned];
// });

//   setActiveConversationId(newConversation.id);
//   setSelectedWorkspaceId(generalWorkspace.id);
//   setActiveWorkspaceId(generalWorkspace.id);
// }, []);

const activeConversation =
  conversations.find(
    (conversation) =>
      conversation.id === activeConversationId
  );

  const activeWorkspace =
  workspaces.find(
    (workspace) =>
      workspace.id === activeWorkspaceId
  ) ?? null;
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
  const targetWorkspace = workspaces.find(
    (w) => w.id === workspaceId
  );

  if (targetWorkspace?.isSystem) return;

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
  const targetWorkspace = workspaces.find(
    (w) => w.id === workspaceId
  );

  if (targetWorkspace?.isSystem) {
    return;
  }

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

  if (remainingConversations.length > 0) {
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

  function handleMoveConversation(
  conversationId: string,
  workspaceId: string
) {
  const workspace = workspaces.find(
    (w) => w.id === workspaceId
  );

  if (!workspace) return;

  setConversations((prev) =>
    prev.map((conversation) =>
      conversation.id === conversationId
        ? {
            ...conversation,
            workspaceId: workspace.id,
            workspace: workspace.name,
          }
        : conversation
    )
  );
}



  return (
    <div
   className={`flex h-[100dvh] overflow-hidden transition-colors duration-300 ${
    theme === "dark"
      ? "bg-slate-950 text-slate-100"
      : "bg-slate-100 text-slate-900"
  }`}
>
  {sidebarOpen && (
  <div
    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}
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
        onMoveConversation={handleMoveConversation}
        onDeleteWorkspace={handleDeleteWorkspace}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        onSelectConversation={(id) => {
    setActiveConversationId(id);
    navigate("/");

    if (window.innerWidth < 1024) {
        setSidebarOpen(false);
    }
}}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header
  theme={theme}
  toggleTheme={toggleTheme}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

        <main className="flex h-0 flex-1 overflow-hidden">
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