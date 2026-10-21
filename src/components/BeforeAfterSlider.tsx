import React, { useState, useRef, useCallback } from 'react';
import { Sliders } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeLabel: string;
  afterLabel: string;
  beforeDesc: string;
  afterDesc: string;
  durationWeeks?: number;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeLabel,
  afterLabel,
  beforeDesc,
  afterDesc,
  durationWeeks = 2
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span className="font-serif italic text-stone-700">Clinical Skin Camera · {durationWeeks}-Week Study</span>
        <span>Drag handle to compare</span>
      </div>

      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-stone-200/90 shadow-sm"
      >
        {/* AFTER PANEL (Full background layer) */}
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, #FFF5EF 0%, #F5DECE 55%, #E8C8B3 100%)'
          }}
        >
          {/* Radiant healthy skin texture simulation */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#F0C5A8_2px,transparent_2px)] [background-size:24px_24px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/40 blur-2xl pointer-events-none" />

          {/* Skin Macro Simulation - After Result */}
          <div className="relative z-10 text-center px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs border border-emerald-900/10 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-[11px] font-medium text-stone-900 uppercase tracking-wider font-sans">
                {afterLabel}
              </span>
            </div>
            <p className="text-xs text-stone-700 max-w-xs leading-relaxed font-sans mx-auto bg-white/60 p-2.5 rounded-xl backdrop-blur-xs">
              {afterDesc}
            </p>
          </div>
        </div>

        {/* BEFORE PANEL (Clipped overlay layer) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden flex items-center justify-center border-r border-white/60"
          style={{
            width: `${sliderPosition}%`,
            background: 'radial-gradient(ellipse at 40% 60%, #EFE1D9 0%, #DEC8BB 55%, #CFB4A3 100%)'
          }}
        >
          {/* Dull/red texture simulation */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C47D68_2px,transparent_2px)] [background-size:16px_16px]" />
          <div className="absolute top-12 left-12 w-28 h-28 rounded-full bg-red-400/20 blur-xl pointer-events-none" />

          {/* Skin Macro Simulation - Before State */}
          <div
            className="absolute left-6 text-center w-64"
            style={{ width: '260px' }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/85 backdrop-blur-md shadow-xs text-stone-100 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-[11px] font-medium uppercase tracking-wider font-sans">
                {beforeLabel}
              </span>
            </div>
            <p className="text-xs text-stone-900 leading-relaxed font-sans bg-stone-100/80 p-2.5 rounded-xl backdrop-blur-xs">
              {beforeDesc}
            </p>
          </div>
        </div>

        {/* DIVIDER HANDLE */}
        <div
          className="absolute inset-y-0 flex items-center justify-center pointer-events-none"
          style={{ left: `calc(${sliderPosition}% - 18px)` }}
        >
          <div className="w-[2px] h-full bg-white shadow-md" />
          <div className="absolute w-9 h-9 rounded-full bg-[#1C1917] text-white flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
            <Sliders className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
