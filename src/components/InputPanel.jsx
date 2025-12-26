import { useState, useEffect, useRef } from "react";
import gsap from 'gsap';

export default function InputPanel({ onSubmit, algorithmType }) {
  const [value, setValue] = useState("");
  const [target, setTarget] = useState("");
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const isSearchAlgorithm = algorithmType === 'linear' || algorithmType === 'binary';

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(panelRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  };

  const handleSubmit = () => {
    const arr = value
      .split(",")
      .map(num => parseInt(num.trim()))
      .filter(n => !isNaN(n));
    
    if (isSearchAlgorithm) {
      const targetNum = parseInt(target.trim());
      if (!isNaN(targetNum)) {
        onSubmit(arr, targetNum);
      }
    } else {
      onSubmit(arr);
    }
  };

  return (
    <div 
      ref={panelRef}
      className="mb-6 p-6 bg-white rounded-xl shadow-lg border-2 border-blue-200"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            className="flex-1 border-2 border-blue-300 p-3 rounded-lg focus:border-purple-500 focus:outline-none transition-colors shadow-sm bg-white"
            placeholder="Enter numbers (e.g., 5, 3, 8, 1, 4)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          
          {isSearchAlgorithm && (
            <input
              type="text"
              className="w-32 border-2 border-blue-300 p-3 rounded-lg focus:border-purple-500 focus:outline-none transition-colors shadow-sm bg-white"
              placeholder="Target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          )}
          
          <button
            ref={buttonRef}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            onClick={handleSubmit}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isSearchAlgorithm ? 'Search' : 'Visualize'}
          </button>
        </div>
        <p className="text-sm text-gray-700 font-medium">
          {isSearchAlgorithm 
            ? 'Enter comma-separated numbers and a target value to search for'
            : 'Enter comma-separated numbers to sort (e.g., 5, 3, 8, 1, 4)'}
        </p>
      </div>
    </div>
  );
}
