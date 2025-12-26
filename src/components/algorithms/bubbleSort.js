export function bubbleSort(arr) {
  const steps = [];
  const array = [...arr];
  let swapped;

  for (let i = 0; i < array.length; i++) {
    swapped = false; // Reset swapped flag for each pass

    for (let j = 0; j < array.length - i - 1; j++) {
      steps.push({ 
        array: [...array], 
        highlight: [j, j + 1],
        explanation: `Comparing ${array[j]} and ${array[j + 1]}`
      });
      
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        
        steps.push({ 
          array: [...array], 
          swap: [j, j + 1],
          explanation: `Swapping ${array[j + 1]} and ${array[j]}`
        });
        
        swapped = true; // Mark that a swap occurred
      }
    }

    // If no swaps occurred, array is sorted, so break early
    if (!swapped) {
      break;
    }
  }

  steps.push({ 
    array: [...array],
    explanation: "Array Sorted Successfully! ✓"
  }); // Final state
  
  return steps;
}