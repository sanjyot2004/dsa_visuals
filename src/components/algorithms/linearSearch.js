/**
 * Linear Search Algorithm with step-by-step visualization
 * Searches for a target element by checking each element sequentially
 */
export function linearSearch(arr, target) {
  const steps = [];
  const array = [...arr];

  steps.push({
    array: [...array],
    explanation: `Searching for ${target} in the array`
  });

  for (let i = 0; i < array.length; i++) {
    steps.push({
      array: [...array],
      highlight: [i],
      explanation: `Checking element ${array[i]} at index ${i}`
    });

    if (array[i] === target) {
      steps.push({
        array: [...array],
        highlight: [i],
        found: i,
        explanation: `Element ${target} found at index ${i}! ✓`
      });
      return steps;
    }
  }

  steps.push({
    array: [...array],
    explanation: `Element ${target} not found in the array ✗`
  });

  return steps;
}
