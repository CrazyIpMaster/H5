
import { useEditorStore } from '../../../../store/useEditorStore';
import { motion, AnimatePresence } from 'framer-motion';

export const LayersPanel = () => {
  const { state, selectLayer, updateLayer, removeLayer } = useEditorStore();

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg w-64 max-h-[400px] overflow-y-auto">
      <h3 className="font-serif text-lg text-[#4A1A1A] mb-4">图层管理</h3>
      <div className="space-y-2">
        <AnimatePresence>
          {[...state.layers].reverse().map((layer) => {
            const isSelected = state.selectedLayerIds.includes(layer.id);
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                  isSelected ? 'bg-[#D64131]/10 border border-[#D64131]' : 'hover:bg-gray-100'
                }`}
                onClick={() => selectLayer(layer.id)}
              >
                {/* Visibility Toggle */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    updateLayer(layer.id, { visible: !layer.visible });
                  }}
                  className={`text-xs mr-2 ${layer.visible ? 'text-gray-600' : 'text-gray-300'}`}
                >
                  {layer.visible ? '👁️' : '🚫'}
                </button>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-[#4A1A1A] text-sm truncate">{layer.name}</p>
                </div>

                {/* Actions */}
                {isSelected && (
                  <div className="flex items-center gap-1 ml-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        updateLayer(layer.id, { locked: !layer.locked });
                      }}
                      className="text-gray-500 hover:text-gray-700 text-xs"
                    >
                      {layer.locked ? '🔒' : '🔓'}
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLayer(layer.id);
                      }}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
