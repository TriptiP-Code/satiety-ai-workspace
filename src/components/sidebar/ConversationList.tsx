import type { Conversation } from "../../types/conversation";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
  conversations: Conversation[];

  activeConversationId: string;

  workspaceId: string;
  selectedWorkspaceId: string;

  theme: "dark" | "light";

  onSelectWorkspace: (
    workspaceId: string
  ) => void;

  onSelectConversation: (
    id: string
  ) => void;

  onDeleteConversation: (
    id: string
  ) => void;

  onRenameConversation: (
    id: string,
    title: string
  ) => void;
}

function ConversationList({
  conversations,
  activeConversationId,
  theme,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
}: ConversationListProps) {
  return (
    <div>
      <div className="mt-2 space-y-1">
        {conversations.map(
          (conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={
                conversation
              }
              theme={theme}
              isActive={
                activeConversationId ===
                conversation.id
              }
              onSelect={
                onSelectConversation
              }
              onDelete={
                onDeleteConversation
              }
              onRename={
                onRenameConversation
              }
            />
          )
        )}
      </div>
    </div>
  );
}

export default ConversationList;