import { useEffect, useRef, useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

interface WorkspaceSectionProps {
  name: string;
  isSelected: boolean;
  isExpanded: boolean;

  onClick: () => void;

  onRename: () => void;
  onDelete: () => void;
}

function WorkspaceSection({
  name,
  isSelected,
  isExpanded,

  onClick,

  onRename,
  onDelete,
}: WorkspaceSectionProps) {
  const [showMenu, setShowMenu] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="group relative"
    >
      <button
        onClick={onClick}
        className={`flex w-full items-center justify-between rounded-md px-3 py-2 transition ${
          isSelected
            ? "bg-slate-800 text-indigo-400"
            : "text-slate-300 hover:bg-slate-800"
        }`}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-lg">
            {isExpanded ? "📂" : "📁"}
          </span>

          <span className="truncate text-sm font-medium">
            {name}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu((prev) => !prev);
          }}
          className="rounded p-1 opacity-0 transition group-hover:opacity-100 hover:bg-slate-700"
        >
          <MoreHorizontal size={16} />
        </button>
      </button>

      {showMenu && (
        <div className="absolute right-2 top-11 z-50 w-40 rounded-lg border border-slate-700 bg-slate-800 shadow-xl">
          <button
            onClick={() => {
              setShowMenu(false);
              onRename();
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-700"
          >
            <Pencil size={15} />
            Rename
          </button>

          <button
            onClick={() => {
              setShowMenu(false);
              onDelete();
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-700"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default WorkspaceSection;