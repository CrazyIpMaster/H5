
import { useRef } from 'react';
import { useEditorStore } from '../../../../store/useEditorStore';
import type { EditorLayer } from '../../../../types/editor';

interface CanvasProps {
  scale: number;
}

export const Canvas = ({ scale }: CanvasProps) => {
  const { state, selectLayer } = useEditorStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle drag/move logic here (omitted for brevity, can be added later)

  return (
    <div 
      className="relative shadow-2xl bg-white overflow-hidden"
      style={{
        width: state.canvasWidth * scale,
        height: state.canvasHeight * scale,
        backgroundColor: state.backgroundColor
      }}
      ref={containerRef}
      id="editor-canvas"
    >
      {state.layers.map((layer) => (
        <LayerComponent 
          key={layer.id} 
          layer={layer} 
          scale={scale}
          isSelected={state.selectedLayerIds.includes(layer.id)}
          onSelect={() => selectLayer(layer.id)}
        />
      ))}
    </div>
  );
};

const LayerComponent = ({ layer, scale, isSelected, onSelect }: { 
  layer: EditorLayer; 
  scale: number; 
  isSelected: boolean; 
  onSelect: () => void 
}) => {
  if (!layer.visible) return null;

  const style: React.CSSProperties = {
    position: 'absolute',
    left: layer.x * scale,
    top: layer.y * scale,
    width: layer.width * scale,
    height: layer.height * scale,
    transform: `rotate(${layer.rotation}deg) scale(${layer.scale})`, // Note: scale is applied to transform, but width/height are also scaled for layout. 
    // Actually, if we use transform scale, we should keep width/height as base.
    // Let's simplify: width/height are the *display* size in canvas coords.
    opacity: layer.opacity,
    mixBlendMode: layer.blendMode,
    zIndex: layer.zIndex,
    cursor: layer.locked ? 'default' : 'move',
    border: isSelected ? '2px solid #FFD700' : 'none',
    ...layer.style
  };

  return (
    <div 
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {layer.type === 'image' && (
        <img 
          src={layer.content} 
          alt={layer.name} 
          className="w-full h-full object-contain pointer-events-none" 
        />
      )}
      {layer.type === 'text' && (
        <div className="w-full h-full flex items-center justify-center whitespace-pre-wrap">
          {layer.content}
        </div>
      )}
      {layer.type === 'svg' && (
        <div 
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: layer.content }} 
        />
      )}
    </div>
  );
};
