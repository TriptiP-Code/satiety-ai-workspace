import { useOutletContext } from "react-router-dom";
import ChatWindow from "../components/chat/ChatWindow";
import type { Conversation } from "../types/conversation";

interface OutletContext {
  activeConversation?: Conversation;
  conversations: Conversation[];
  setConversations: React.Dispatch<
    React.SetStateAction<Conversation[]>
  >;
  isLoading: boolean;
  setIsLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function HomePage() {
  const context = useOutletContext<OutletContext>();

  return <ChatWindow {...context} />;
}

export default HomePage;