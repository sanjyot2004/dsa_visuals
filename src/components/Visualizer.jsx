import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import ExplanationPanel from "./ExplanationPanel";

function Visualizer({ steps, speed }) {
  const containerRef = useRef(null);
  const [currentExplanation, setCurrentExplanation] = useState("");
  const [currentArray, setCurrentArray] = useState([]);

  useEffect(() => {
    if (!steps.length) return;
    
    // Set initial array
    setCurrentArray(steps[0].array);
    
    const tl = gsap.timeline();

    steps.forEach((step, stepIndex) => {
      // Update explanation text
      if (step.explanation) {
        tl.call(() => setCurrentExplanation(step.explanation));
      }

      // Update array state to reflect current step
      tl.call(() => {
        setCurrentArray([...step.array]);
        
        // Update all bar heights and text content to match current array state
        step.array.forEach((val, idx) => {
          const bar = document.querySelector(`#bar-${idx}`);
          if (bar) {
            gsap.set(bar, { height: `${val * 10}px` });
            bar.textContent = val.toString();
          }
        });
      });

      // Highlight bars being compared (yellow for comparison)
      if (step.highlight) {
        step.highlight.forEach((i) => {
          const color = step.found !== undefined && step.found === i 
            ? "#10b981" // Green for found element
            : "#facc15"; // Yellow for comparison
          
          tl.to(`#bar-${i}`, {
            scaleY: 1.15,
            backgroundColor: color,
            duration: speed / 2,
            ease: "power2.out"
          }, step.highlight[0] === i ? undefined : "<");
        });

        // Reset highlight after highlight duration (unless it's a found element)
        if (step.found === undefined) {
          tl.to(
            step.highlight.map((i) => `#bar-${i}`),
            {
              scaleY: 1,
              backgroundColor: "#3b82f6", // Blue default
              duration: speed / 2,
              ease: "power2.in"
            }
          );
        }
      }

      // Swap animation with red flash
      if (step.swap) {
        const [idx1, idx2] = step.swap;
        const bar1 = document.querySelector(`#bar-${idx1}`);
        const bar2 = document.querySelector(`#bar-${idx2}`);

        if (bar1 && bar2) {
          // Flash red during swap
          tl.to([bar1, bar2], {
            backgroundColor: "#ef4444",
            duration: speed / 4,
            ease: "power2.out"
          }, "<");

          const targetHeight1 = `${step.array[idx1] * 10}px`;
          const targetHeight2 = `${step.array[idx2] * 10}px`;

          tl.to(bar1, {
            height: targetHeight1,
            duration: speed * 0.8,
            ease: "power2.inOut"
          }, "<")
            .to(bar2, {
              height: targetHeight2,
              duration: speed * 0.8,
              ease: "power2.inOut"
            }, "<");

          // Restore to blue after swap
          tl.to([bar1, bar2], {
            backgroundColor: "#3b82f6",
            duration: speed / 4,
            ease: "power2.in"
          });

          // Update text labels
          tl.call(() => {
            if (bar1) bar1.textContent = step.array[idx1].toString();
            if (bar2) bar2.textContent = step.array[idx2].toString();
          });
        }
      }

      // If it's the final step, turn all bars green
      if (step.explanation && step.explanation.includes("Successfully")) {
        tl.to(
          ".array-bar",
          {
            backgroundColor: "#10b981",
            scale: 1.05,
            duration: speed,
            stagger: 0.05,
            ease: "back.out(1.7)"
          }
        );
      }
    });

    return () => tl.kill();
  }, [steps, speed]);

  if (!steps.length) return null;
  const initial = steps[0].array;

  return (
    <div>
      <div 
        ref={containerRef} 
        className="relative flex justify-center items-end h-80 bg-white rounded-2xl p-6 shadow-2xl border-2 border-gray-200"
      >
        {initial.map((val, idx) => (
          <div
            key={idx}
            id={`bar-${idx}`}
            className="array-bar absolute w-10 rounded-t-xl bg-gradient-to-t from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-lg hover:shadow-2xl transition-shadow"
            style={{
              height: `${val * 10}px`,
              transform: `translateX(${idx * 48}px)`,
              boxShadow: "0 6px 12px -2px rgba(0, 0, 0, 0.15), 0 3px 6px -2px rgba(0, 0, 0, 0.1)"
            }}
          >
            {val}
          </div>
        ))}
      </div>
      <ExplanationPanel explanation={currentExplanation} />
    </div>
  );
}

export default Visualizer;