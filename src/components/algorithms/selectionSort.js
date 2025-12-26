export function selectionSort(arr) {
  const steps = [];
  const array = [...arr];

  for (let i = 0; i < array.length - 1; i++) {
    let min_idx = i;

    for (let j = i + 1; j < array.length; j++) {
      steps.push({ 
        array: [...array], 
        highlight: [min_idx, j],
        explanation: `Comparing ${array[min_idx]} with ${array[j]}`
      });
      
      if (array[j] < array[min_idx]) {
        min_idx = j;
      }
    }

    if (min_idx !== i) {
      steps.push({ 
        array: [...array], 
        highlight: [i, min_idx],
        explanation: `Found minimum ${array[min_idx]} at index ${min_idx}`
      });
      
      const temp = array[i];
      array[i] = array[min_idx];
      array[min_idx] = temp;
      
      steps.push({ 
        array: [...array], 
        swap: [i, min_idx],
        explanation: `Swapping ${array[i]} and ${array[min_idx]}`
      });
    }
  }

  steps.push({ 
    array: [...array],
    explanation: "Array Sorted Successfully! ✓"
  }); 
  
  return steps;
}