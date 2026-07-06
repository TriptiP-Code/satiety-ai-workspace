import { Outlet } from "react-router-dom";
import { useState } from "react";
import type { Conversation } from "../../types/conversation";


import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  const [conversations, setConversations] = useState<Conversation[]>([
  {
    id: crypto.randomUUID(),
    title: "New Chat",
    messages: [],
  },
]);

const [activeConversationId, setActiveConversationId] = useState(
  conversations[0].id
);
const activeConversation = conversations.find(
  (conversation) => conversation.id === activeConversationId
);

const [isLoading, setIsLoading] = useState(false);
function handleNewChat() {
  const newConversation: Conversation = {
    id: crypto.randomUUID(),
    title: `Chat ${conversations.length + 1}`,
    messages: [],
  };

  setConversations((prev) => [...prev, newConversation]);

  setActiveConversationId(newConversation.id);
}
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      <Sidebar
  conversations={conversations}
  activeConversationId={activeConversationId}
  onNewChat={handleNewChat}
  onSelectConversation={setActiveConversationId}
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