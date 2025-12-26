import './App.css';
import ControlPanel from './components/ControlPanel';
import InputPanel from './components/InputPanel';
import Visualizer from './components/Visualizer';
import { bubbleSort } from './components/algorithms/bubbleSort';
import { selectionSort } from './components/algorithms/selectionSort';
import { insertionSort } from './components/algorithms/insertionSort';
import { mergeSort } from './components/algorithms/mergeSort';
import { quickSort } from './components/algorithms/quickSort';
import { linearSearch } from './components/algorithms/linearSearch';
import { binarySearch } from './components/algorithms/binarySearch';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

function App() {
  const [steps, setSteps] = useState([]);
  const [speed, setSpeed] = useState(0.5);
  const [algorithm, setAlgorithm] = useState('bubble');
  const headerRef = useRef(null);
  const selectRef = useRef(null);

  useEffect(() => {
    // Animate header on mount
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }

    if (selectRef.current) {
      gsap.fromTo(selectRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  const handleArray = (arr, target = null) => {
    let generatedSteps = [];
    
    switch(algorithm) {
      case 'bubble':
        generatedSteps = bubbleSort(arr);
        break;
      case 'selection':
        generatedSteps = selectionSort(arr);
        break;
      case 'insertion':
        generatedSteps = insertionSort(arr);
        break;
      case 'merge':
        generatedSteps = mergeSort(arr);
        break;
      case 'quick':
        generatedSteps = quickSort(arr);
        break;
      case 'linear':
        generatedSteps = linearSearch(arr, target);
        break;
      case 'binary':
        generatedSteps = binarySearch(arr, target);
        break;
      default:
        generatedSteps = bubbleSort(arr);
    }
    
    setSteps(generatedSteps);
  };

  const algorithmCategories = {
    sorting: [
      { value: 'bubble', label: 'Bubble Sort' },
      { value: 'selection', label: 'Selection Sort' },
      { value: 'insertion', label: 'Insertion Sort' },
      { value: 'merge', label: 'Merge Sort' },
      { value: 'quick', label: 'Quick Sort' }
    ],
    searching: [
      { value: 'linear', label: 'Linear Search' },
      { value: 'binary', label: 'Binary Search' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 
          ref={headerRef}
          className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-sm"
        >
          DSA Visualizer ✨
        </h1>
        
        <div 
          ref={selectRef}
          className="mb-6 p-6 bg-white rounded-xl shadow-xl border-2 border-gray-200"
        >
          <label className="block text-base font-bold text-gray-800 mb-4">
            Select Algorithm:
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-bold text-purple-700 mb-3 uppercase">Sorting Algorithms</h3>
              <div className="space-y-2">
                {algorithmCategories.sorting.map((algo) => (
                  <button
                    key={algo.value}
                    onClick={() => setAlgorithm(algo.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                      algorithm === algo.value
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-300'
                    }`}
                  >
                    {algo.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-blue-700 mb-3 uppercase">Searching Algorithms</h3>
              <div className="space-y-2">
                {algorithmCategories.searching.map((algo) => (
                  <button
                    key={algo.value}
                    onClick={() => setAlgorithm(algo.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                      algorithm === algo.value
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-300'
                    }`}
                  >
                    {algo.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <InputPanel onSubmit={handleArray} algorithmType={algorithm} />
        <ControlPanel speed={speed} setSpeed={setSpeed} />
        <div className="mt-8">
          <Visualizer steps={steps} speed={speed} />
        </div>
      </div>
    </div>
  );
}

export default App;