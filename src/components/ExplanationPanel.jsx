import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * ExplanationPanel Component
 * Displays step-by-step explanations during algorithm visualization
 */
export default function ExplanationPanel({ explanation }) {
  const panelRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (explanation && textRef.current) {
      // Animate text change with GSAP
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [explanation]);

  if (!explanation) return null;

  return (
    <div 
      ref={panelRef}
      className="mt-6 p-5 bg-white rounded-lg shadow-xl border-2 border-purple-300"
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
        <h3 className="text-base font-bold text-gray-800">Current Step</h3>
      </div>
      <p 
        ref={textRef}
        className="mt-3 text-lg text-gray-900 font-semibold"
      >
        {explanation}
      </p>
    </div>
  );
}
