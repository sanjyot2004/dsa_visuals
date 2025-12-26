import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ControlPanel({ speed, setSpeed }) {
  const sliderRef = useRef(null);
  
  useEffect(() => {
    if (sliderRef.current) {
      gsap.fromTo(sliderRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div 
      ref={sliderRef}
      className="mt-6 p-5 bg-white rounded-xl shadow-lg border-2 border-purple-200"
    >
      <div className="flex items-center gap-4">
        <label className="text-base font-bold text-gray-800 min-w-fit">
          Animation Speed:
        </label>
        <div className="flex-1 flex items-center gap-3">
          <span className="text-sm text-gray-700 font-medium">Slow</span>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg appearance-none cursor-pointer slider"
            style={{
              accentColor: '#8b5cf6'
            }}
          />
          <span className="text-sm text-gray-700 font-medium">Fast</span>
          <span className="ml-2 px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-full min-w-[3rem] text-center">
            {speed.toFixed(1)}x
          </span>
        </div>
      </div>
    </div>
  );
}
