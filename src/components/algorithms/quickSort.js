/**
 * Quick Sort Algorithm with step-by-step visualization
 * Uses pivot-based partitioning to sort the array
 */
export function quickSort(arr) {
  const steps = [];
  const array = [...arr];

  steps.push({
    array: [...array],
    explanation: "Starting Quick Sort"
  });

  function partition(arr, low, high) {
    const pivot = arr[high];
    
    steps.push({
      array: [...arr],
      highlight: [high],
      explanation: `Selected pivot: ${pivot} at index ${high}`
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        highlight: [j, high],
        explanation: `Comparing ${arr[j]} with pivot ${pivot}`
      });

      if (arr[j] < pivot) {
        i++;
        
        if (i !== j) {
          // Swap elements
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          steps.push({
            array: [...arr],
            swap: [i, j],
            explanation: `Swapping ${arr[i]} and ${arr[j]}`
          });
        }
      }
    }

    // Place pivot in correct position
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    steps.push({
      array: [...arr],
      swap: [i + 1, high],
      explanation: `Placing pivot ${arr[i + 1]} at position ${i + 1}`
    });

    return i + 1;
  }

  function quickSortHelper(arr, low, high) {
    if (low < high) {
      steps.push({
        array: [...arr],
        highlight: Array.from({ length: high - low + 1 }, (_, idx) => low + idx),
        explanation: `Sorting partition from index ${low} to ${high}`
      });

      const pi = partition(arr, low, high);
      
      quickSortHelper(arr, low, pi - 1);
      quickSortHelper(arr, pi + 1, high);
    }
  }

  quickSortHelper(array, 0, array.length - 1);
  
  steps.push({
    array: [...array],
    explanation: "Array Sorted Successfully! ✓"
  });

  return steps;
}
