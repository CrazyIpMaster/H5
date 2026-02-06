
import { useEditorStore } from '../../../../store/useEditorStore';
import type { BlendMode } from '../../../../types/editor';

export const PropertiesPanel = () => {
  const { state, updateLayer } = useEditorStore();
  const selectedId = state.selectedLayerIds[0];
  const layer = state.layers.find(l => l.id === selectedId);

  if (!layer) {
    return (
      <div className="w-64 bg-[#1A1A2E] border-r border-white/10 p-4">
        <p className="text-white/40 text-sm text-center mt-10">未选择图层</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-[#1A1A2E] border-r border-white/10 flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-white font-[var(--font-display)] text-sm tracking-wider">属性</h3>
      </div>

      <div className="p-4 space-y-6">
        {/* Transform */}
        <div className="space-y-3">
          <label className="text-xs text-white/60 font-bold uppercase">变换</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-white/40 mb-1 block">X</label>
              <input 
                type="number" 
                value={Math.round(layer.x)}
                onChange={(e) => updateLayer(layer.id, { x: Number(e.target.value) })}
                className="w-full bg-black/20 border border-white/10 rounded px-2 py-1 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block">Y</label>
              <input 
                type="number" 
                value={Math.round(layer.y)}
                onChange={(e) => updateLayer(layer.id, { y: Number(e.target.value) })}
                className="w-full bg-black/20 border border-white/10 rounded px-2 py-1 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block">宽</label>
              <input 
                type="number" 
                value={Math.round(layer.width)}
                onChange={(e) => updateLayer(layer.id, { width: Number(e.target.value) })}
                className="w-full bg-black/20 border border-white/10 rounded px-2 py-1 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block">高</label>
              <input 
                type="number" 
                value={Math.round(layer.height)}
                onChange={(e) => updateLayer(layer.id, { height: Number(e.target.value) })}
                className="w-full bg-black/20 border border-white/10 rounded px-2 py-1 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block">旋转</label>
              <input 
                type="number" 
                value={Math.round(layer.rotation)}
                onChange={(e) => updateLayer(layer.id, { rotation: Number(e.target.value) })}
                className="w-full bg-black/20 border border-white/10 rounded px-2 py-1 text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="space-y-3">
          <label className="text-xs text-white/60 font-bold uppercase">外观</label>
          
          <div>
            <label className="text-xs text-white/40 mb-1 block">不透明度 ({Math.round(layer.opacity * 100)}%)</label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01"
              value={layer.opacity}
              onChange={(e) => updateLayer(layer.id, { opacity: Number(e.target.value) })}
              className="w-full accent-[#FFD700]"
            />
          </div>

          <div>
            <label className="text-xs text-white/40 mb-1 block">混合模式</label>
            <select 
              value={layer.blendMode}
              onChange={(e) => updateLayer(layer.id, { blendMode: e.target.value as BlendMode })}
              className="w-full bg-black/20 border border-white/10 rounded px-2 py-1 text-white text-sm outline-none"
            >
              <option value="normal">正常</option>
              <option value="multiply">正片叠底</option>
              <option value="screen">滤色</option>
              <option value="overlay">叠加</option>
              <option value="darken">变暗</option>
              <option value="lighten">变亮</option>
            </select>
          </div>
        </div>
        
        {/* Text Specific */}
        {layer.type === 'text' && (
           <div className="space-y-3">
             <label className="text-xs text-white/60 font-bold uppercase">文字</label>
             <textarea
               value={layer.content}
               onChange={(e) => updateLayer(layer.id, { content: e.target.value })}
               className="w-full bg-black/20 border border-white/10 rounded px-2 py-1 text-white text-sm min-h-[60px]"
             />
             <div className="flex gap-2">
                <input 
                  type="color" 
                  value={layer.style?.color || '#ffffff'}
                  onChange={(e) => updateLayer(layer.id, { style: { ...layer.style, color: e.target.value } })}
                  className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                />
                <input 
                  type="number"
                  value={parseInt(layer.style?.fontSize || '24')}
                  onChange={(e) => updateLayer(layer.id, { style: { ...layer.style, fontSize: `${e.target.value}px` } })}
                  className="flex-1 bg-black/20 border border-white/10 rounded px-2 py-1 text-white text-sm"
                  placeholder="字号"
                />
             </div>
           </div>
        )}
      </div>
    </div>
  );
};
