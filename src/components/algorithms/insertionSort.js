export function insertionSort(arr) {
  const steps = [];
  const array = [...arr];

  steps.push({
    array: [...array],
    explanation: "Starting Insertion Sort"
  });

  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    // Show the element being picked
    steps.push({ 
      array: [...array], 
      highlight: [i],
      explanation: `Picking element ${key} at index ${i}`
    });

    // Compare and shift elements
    while (j >= 0 && array[j] > key) {
      steps.push({ 
        array: [...array], 
        highlight: [j, j + 1],
        explanation: `Comparing ${array[j]} with ${key}`
      });

      array[j + 1] = array[j];
      
      steps.push({ 
        array: [...array], 
        highlight: [j + 1],
        explanation: `Shifting ${array[j + 1]} to the right`
      });
      
      j = j - 1;
    }

    array[j + 1] = key;
    
    steps.push({ 
      array: [...array], 
      highlight: [j + 1],
      explanation: `Placed ${key} at index ${j + 1}`
    });
  }

  steps.push({ 
    array: [...array],
    explanation: "Array Sorted Successfully! ✓"
  });
  
  return steps;
}
