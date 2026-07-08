import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Conversation } from "../../types/conversation";

import Header from "./Header";
import Sidebar from "./Sidebar";

const STORAGE_KEY = "satiety-conversations";
const ACTIVE_CHAT_KEY = "satiety-active-chat";

function AppLayout() {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
      return parsed.map((conversation: any) => ({
      ...conversation,
      workspace: conversation.workspace ?? "General",
    }));
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

    const savedConversations = localStorage.getItem(STORAGE_KEY);

    if (savedConversations) {
      const parsed: Conversation[] = JSON.parse(savedConversations);
      return parsed[0].id;
    }

    return crypto.randomUUID();
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
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

  function handleNewChat() {
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: "New Chat",
      workspace: "General",
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
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        onSelectConversation={setActiveConversationId}
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