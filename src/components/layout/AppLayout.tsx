import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Conversation } from "../../types/conversation";

import Header from "./Header";
import Sidebar from "./Sidebar";
import type { Workspace } from "../../types/workspace";

const CONVERSATION_STORAGE_KEY = "satiety-conversations";

const WORKSPACE_STORAGE_KEY = "satiety-workspaces";

const ACTIVE_CHAT_KEY = "satiety-active-chat";

const ACTIVE_WORKSPACE_KEY =
  "satiety-active-workspace";
  

function AppLayout() {

  const WORKSPACE_KEY = "satiety-workspaces";
  const ACTIVE_WORKSPACE_KEY = "satiety-active-workspace";

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

  useEffect(() => {
  localStorage.setItem(
    WORKSPACE_KEY,
    JSON.stringify(workspaces)
  );
}, [workspaces]);



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

  setActiveConversationId(newConversation.id);
}

function handleNewChat() {
  const newConversation: Conversation = {
    id: crypto.randomUUID(),
    title: "New Chat",
    workspace: activeWorkspace.name,
    workspaceId: activeWorkspace.id,
    messages: [],
  };

  setConversations((prev) => [...prev, newConversation]);

  setActiveConversationId(newConversation.id);
}

  function handleDeleteConversation(id: string) {
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
    <div className="flex h-screen bg-slate-950 text-slate-100">
      <Sidebar
        conversations={conversations}
        workspaces={workspaces}
        activeWorkspace={activeWorkspace.name}
        selectedWorkspaceId={selectedWorkspaceId}onSelectWorkspace={setSelectedWorkspaceId}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onNewWorkspace={handleNewWorkspace}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        onSelectConversation={(id) => {
  setActiveConversationId(id);

  const conversation = conversations.find(
    (c) => c.id === id
  );

if (conversation) {
  setActiveWorkspaceId(
    conversation.workspaceId
  );
}
}}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex flex-1 min-w-0 overflow-hidden">
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