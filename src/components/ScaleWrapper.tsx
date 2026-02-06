
import { useEffect, useState, useRef } from 'react';
import type { ReactNode } from 'react';

interface ScaleWrapperProps {
  children: ReactNode;
}

export const ScaleWrapper = ({ children }: ScaleWrapperProps) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const targetRatio = 640 / 1136;
      const windowRatio = windowWidth / windowHeight;

      let newScale = 1;
      if (windowRatio > targetRatio) {
        // Window is wider than target ratio - fit by height
        newScale = windowHeight / 1136;
      } else {
        // Window is narrower than target ratio - fit by width
        newScale = windowWidth / 640;
      }
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: 640,
          height: 1136,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
