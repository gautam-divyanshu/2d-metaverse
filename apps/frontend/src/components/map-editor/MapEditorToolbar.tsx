import React from 'react';
import { Edit, Undo, Redo, Send, HelpCircle, Layers } from 'lucide-react';

interface MapEditorToolbarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const MapEditorToolbar: React.FC<MapEditorToolbarProps> = ({
  selectedTool,
  onToolSelect,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  return (
    <div
      className="fixed left-0 top-0 bg-gray-800 z-50"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: '20px 0',
        width: '64px',
      }}
    >
      {/* Top section tools */}
      <div className="flex flex-col gap-4 items-center">
        {/* Catalog Button */}
        <button
          onClick={onToggleSidebar}
          className={`p-2 transition-colors rounded ${
            isSidebarOpen ? 'text-blue-400' : 'text-white hover:text-blue-400'
          }`}
          title="Toggle Catalog"
        >
          <Layers className="w-6 h-6" />
        </button>

        {/* Edit Tool */}
        <button
          onClick={() => onToolSelect('edit')}
          className={`p-2 transition-colors ${
            selectedTool === 'edit'
              ? 'text-blue-400'
              : 'text-white hover:text-blue-400'
          }`}
          title="Edit"
        >
          <Edit className="w-6 h-6" />
        </button>

        {/* Undo */}
        <button
          onClick={() => onToolSelect('undo')}
          className={`p-2 transition-colors ${
            selectedTool === 'undo'
              ? 'text-blue-400'
              : 'text-white hover:text-blue-400'
          }`}
          title="Undo"
        >
          <Undo className="w-6 h-6" />
        </button>

        {/* Redo */}
        <button
          onClick={() => onToolSelect('redo')}
          className={`p-2 transition-colors ${
            selectedTool === 'redo'
              ? 'text-blue-400'
              : 'text-white hover:text-blue-400'
          }`}
          title="Redo"
        >
          <Redo className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom section tools */}
      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={() => onToolSelect('send')}
          className={`p-2 transition-colors rounded ${
            selectedTool === 'send'
              ? 'text-blue-400'
              : 'text-white hover:text-blue-400'
          }`}
          title="Send"
        >
          <Send className="w-6 h-6" />
        </button>

        <button
          onClick={() => onToolSelect('help')}
          className={`p-2 transition-colors rounded ${
            selectedTool === 'help'
              ? 'text-blue-400'
              : 'text-white hover:text-blue-400'
          }`}
          title="Help"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
