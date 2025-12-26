/**
 * Binary Search Algorithm with step-by-step visualization
 * Efficiently searches sorted array by repeatedly dividing search interval in half
 */
export function binarySearch(arr, target) {
  const steps = [];
  const array = [...arr].sort((a, b) => a - b); // Binary search requires sorted array

  steps.push({
    array: [...array],
    explanation: `Array sorted. Searching for ${target} using binary search`
  });

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...array],
      highlight: [left, mid, right],
      explanation: `Checking middle element ${array[mid]} at index ${mid} (left: ${left}, right: ${right})`
    });

    if (array[mid] === target) {
      steps.push({
        array: [...array],
        highlight: [mid],
        found: mid,
        explanation: `Element ${target} found at index ${mid}! ✓`
      });
      return steps;
    }

    if (array[mid] < target) {
      steps.push({
        array: [...array],
        highlight: Array.from({ length: mid - left + 1 }, (_, idx) => left + idx),
        explanation: `${array[mid]} < ${target}, searching right half`
      });
      left = mid + 1;
    } else {
      steps.push({
        array: [...array],
        highlight: Array.from({ length: right - mid + 1 }, (_, idx) => mid + idx),
        explanation: `${array[mid]} > ${target}, searching left half`
      });
      right = mid - 1;
    }
  }

  steps.push({
    array: [...array],
    explanation: `Element ${target} not found in the array ✗`
  });

  return steps;
}
