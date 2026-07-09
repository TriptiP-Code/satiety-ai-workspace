interface WorkspaceSectionProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

function WorkspaceSection({
  name,
  isSelected,
  onClick,
}: WorkspaceSectionProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center rounded-md px-2 py-2 text-xs font-semibold uppercase transition

${
  isSelected
    ? "bg-slate-700 text-indigo-400"
    : "text-slate-400 hover:bg-slate-800"
}`}
    >
      ▼ {name}
    </button>
  );
}

export default WorkspaceSection;