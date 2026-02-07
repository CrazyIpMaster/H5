
import { useEffect, useState } from 'react';
import { useEditorStore } from '../../../store/useEditorStore';
import type { EditorLayer } from '../../../types/editor';
import { Canvas } from './components/Canvas';
import { LayersPanel } from './components/LayersPanel';
import { PropertiesPanel } from './components/PropertiesPanel';
import { Toolbar } from './components/Toolbar';
import { getPatternById } from '../../../data/patterns';
import { getBlessingById } from '../../../data/blessings';
// import { convertImage } from '../../../utils/imageConverter';

interface EditorProps {
  patternId: string | null;
  blessingId: string | null;
  onBack: () => void;
  onExport: (imageDataUrl: string) => void;
}

export const Editor = ({ patternId, blessingId, onBack, onExport }: EditorProps) => {
  const { initialize, state } = useEditorStore();
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    // Initialize Editor with assets
    const initEditor = async () => {
      const layers: EditorLayer[] = [];
      const timestamp = Date.now();
      
      // Add Background Layer
      layers.push({
        id: `bg-${timestamp}`,
        type: 'image',
        name: '背景',
        visible: true,
        locked: true,
        opacity: 1,
        blendMode: 'normal',
        x: 0,
        y: 0,
        width: 800,
        height: 1200,
        rotation: 0,
        scale: 1,
        zIndex: 0,
        content: '/images/poster-bg.png', // Needs a real background
        style: {}
      });

      // Add Pattern Layer
      if (patternId) {
        const pattern = getPatternById(patternId);
        if (pattern) {
          layers.push({
            id: `pattern-${timestamp}`,
            type: 'image',
            name: pattern.name,
            visible: true,
            locked: false,
            opacity: 1,
            blendMode: 'normal',
            x: 200,
            y: 400,
            width: 400,
            height: 400,
            rotation: 0,
            scale: 1,
            zIndex: 5,
            content: pattern.image,
            style: {}
          });
        }
      }

      // Add Blessing Layer
      if (blessingId) {
        const blessing = getBlessingById(blessingId);
        if (blessing) {
           layers.push({
            id: `blessing-${timestamp}`,
            type: 'text',
            name: '祝福语',
            visible: true,
            locked: false,
            opacity: 1,
            blendMode: 'normal',
            x: 100,
            y: 100,
            width: 600,
            height: 200,
            rotation: 0,
            scale: 1,
            zIndex: 10,
            content: blessing.text,
            style: {
              fontSize: '64px',
              color: '#FFD700',
              fontFamily: 'serif',
              fontWeight: 'bold',
              textAlign: 'center',
              writingMode: 'vertical-rl'
            }
          });
        }
      }

      await initialize(800, 1200, layers);
    };

    initEditor();
  }, [patternId, blessingId, initialize]);

  // Handle Export
  const handleExport = async () => {
    // Use html2canvas to capture #editor-canvas
    // Note: We need to dynamically import or use the global html2canvas if added via script, 
    // but here we imported it in PosterResult, so we can use it here too.
    const html2canvas = (await import('html2canvas')).default;
    const canvasElement = document.getElementById('editor-canvas');
    
    if (canvasElement) {
      const canvas = await html2canvas(canvasElement, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: state.backgroundColor
      });
      onExport(canvas.toDataURL('image/png'));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0F] overflow-hidden">
      <Toolbar onExport={handleExport} onBack={onBack} />
      
      <div className="flex-1 flex overflow-hidden">
        <LayersPanel />
        
        <div className="flex-1 bg-[#050508] relative overflow-hidden flex items-center justify-center p-8">
           {/* Canvas Container */}
           <div 
             className="relative transition-transform duration-200"
             style={{ transform: `scale(${scale})` }}
           >
             <Canvas scale={1} />
           </div>
           
           {/* Zoom Controls */}
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1A1A2E] rounded-full px-4 py-2 flex items-center gap-4 border border-white/10">
             <button onClick={() => setScale(s => Math.max(0.1, s - 0.1))} className="text-white">-</button>
             <span className="text-white text-xs">{Math.round(scale * 100)}%</span>
             <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="text-white">+</button>
           </div>
        </div>

        <PropertiesPanel />
      </div>
    </div>
  );
};
