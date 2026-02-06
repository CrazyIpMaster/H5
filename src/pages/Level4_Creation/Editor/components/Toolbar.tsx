
import { useEditorStore } from '../../../../store/useEditorStore';
// import { v4 as uuidv4 } from 'uuid'; // Need to install uuid or use simple generator

// Simple ID generator if uuid not available
const generateId = () => Math.random().toString(36).substr(2, 9);

interface ToolbarProps {
  onExport: () => void;
  onBack: () => void;
}

export const Toolbar = ({ onExport, onBack }: ToolbarProps) => {
  const { undo, redo, undoStack, redoStack, addLayer, isSaving } = useEditorStore();

  const handleAddText = () => {
    addLayer({
      id: generateId(),
      type: 'text',
      name: '新建文本',
      visible: true,
      locked: false,
      opacity: 1,
      blendMode: 'normal',
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      rotation: 0,
      scale: 1,
      zIndex: 10,
      content: '双击编辑文本',
      style: {
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
      }
    });
  };

  return (
    <div className="h-14 bg-[#1A1A2E] border-b border-white/10 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="text-sm">返回</span>
        </button>
        
        <div className="h-6 w-[1px] bg-white/10" />

        <div className="flex items-center gap-2">
          <button 
            onClick={undo}
            disabled={undoStack.length <= 1}
            className={`p-2 rounded hover:bg-white/10 transition-colors ${
              undoStack.length <= 1 ? 'text-white/20' : 'text-white'
            }`}
            title="撤销"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 7v6h6" />
              <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
            </svg>
          </button>
          <button 
            onClick={redo}
            disabled={redoStack.length === 0}
            className={`p-2 rounded hover:bg-white/10 transition-colors ${
              redoStack.length === 0 ? 'text-white/20' : 'text-white'
            }`}
            title="重做"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 7v6h-6" />
              <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
            </svg>
          </button>
        </div>

        <div className="h-6 w-[1px] bg-white/10" />

        <button 
          onClick={handleAddText}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white text-sm transition-colors"
        >
          <span className="text-lg">T</span>
          <span>添加文字</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        {isSaving && <span className="text-xs text-white/40">保存中...</span>}
        <button 
          onClick={onExport}
          className="px-4 py-1.5 bg-[#FFD700] text-[#7A2E1C] rounded font-bold text-sm hover:brightness-110 transition-all"
        >
          导出作品
        </button>
      </div>
    </div>
  );
};
