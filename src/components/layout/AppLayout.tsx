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
    }

    return [
      {
        id: crypto.randomUUID(),
        title: "New Chat",
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
      messages: [],
    };

    setConversations((prev) => [...prev, newConversation]);
    setActiveConversationId(newConversation.id);
  }

  function handleDeleteConversation(id: string) {
    // If only one conversation exists, create a fresh one
    if (conversations.length === 1) {
      const newConversation: Conversation = {
        id: crypto.randomUUID(),
        title: "New Chat",
        messages: [],
      };

      setConversations([newConversation]);
      setActiveConversationId(newConversation.id);
      return;
    }

    const remainingConversations = conversations.filter(
      (conversation) => conversation.id !== id
    );

    setConversations(remainingConversations);

    // If the deleted conversation was active,
    // switch to the first remaining conversation.
    if (activeConversationId === id) {
      setActiveConversationId(
        remainingConversations[0].id
      );
    }
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={setActiveConversationId}
        onDeleteConversation={handleDeleteConversation}
      />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-hidden">
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