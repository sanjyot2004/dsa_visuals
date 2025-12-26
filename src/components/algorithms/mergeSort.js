/**
 * Merge Sort Algorithm with step-by-step visualization
 * Divide and conquer algorithm that recursively splits and merges arrays
 */
export function mergeSort(arr) {
  const steps = [];
  const array = [...arr];

  steps.push({
    array: [...array],
    explanation: "Starting Merge Sort"
  });

  function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    const leftArr = [];
    const rightArr = [];
    
    for (let i = 0; i < n1; i++) {
      leftArr[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      rightArr[j] = arr[mid + 1 + j];
    }
    
    steps.push({
      array: [...arr],
      highlight: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      explanation: `Merging subarrays [${leftArr}] and [${rightArr}]`
    });

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      steps.push({
        array: [...arr],
        highlight: [left + i, mid + 1 + j],
        explanation: `Comparing ${leftArr[i]} and ${rightArr[j]}`
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      steps.push({
        array: [...arr],
        highlight: [k],
        explanation: `Placed ${arr[k]} at position ${k}`
      });
      
      k++;
    }

    while (i < n1) {
      arr[k] = leftArr[i];
      steps.push({
        array: [...arr],
        highlight: [k],
        explanation: `Placing remaining element ${arr[k]}`
      });
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = rightArr[j];
      steps.push({
        array: [...arr],
        highlight: [k],
        explanation: `Placing remaining element ${arr[k]}`
      });
      j++;
      k++;
    }
  }

  function mergeSortHelper(arr, left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      steps.push({
        array: [...arr],
        highlight: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
        explanation: `Dividing array from index ${left} to ${right}`
      });

      mergeSortHelper(arr, left, mid);
      mergeSortHelper(arr, mid + 1, right);
      merge(arr, left, mid, right);
    }
  }

  mergeSortHelper(array, 0, array.length - 1);
  
  steps.push({
    array: [...array],
    explanation: "Array Sorted Successfully! ✓"
  });

  return steps;
}
