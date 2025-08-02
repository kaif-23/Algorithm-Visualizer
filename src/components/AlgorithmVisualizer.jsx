
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Controls from './Controls';
import Visualization from './Visualization';
import AlgorithmInfo from './AlgorithmInfo';
import { bubbleSort, quickSort, selectionSort, insertionSort } from '../utils/sortingAlgorithms';
import { linearSearch, binarySearch } from '../utils/searchingAlgorithms';

const AlgorithmVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState('bubble');
  const [algorithmType, setAlgorithmType] = useState('sorting');
  const [speed, setSpeed] = useState(100);
  const [arraySize, setArraySize] = useState(30);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [searchTarget, setSearchTarget] = useState(50);
  const [searchResult, setSearchResult] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Refs to track running state and speed for algorithms
  const isRunningRef = useRef(false);
  const speedRef = useRef(100);

  // Update refs when state changes
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Generate random array
  const generateArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 300) + 10);
    }
    setArray(newArray);
    setSorted([]);
    setComparing([]);
    setSearchResult(-1);
    setCurrentIndex(-1);
  }, [arraySize]);

  // Initialize array on mount
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Sleep function for animation delays
  const sleep = () => new Promise(resolve => setTimeout(resolve, speedRef.current));

  // Run the selected algorithm
  const runAlgorithm = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setSorted([]);
    setComparing([]);
    setSearchResult(-1);
    setCurrentIndex(-1);

    // Use setTimeout to ensure state updates are processed
    setTimeout(async () => {
      try {
        if (algorithmType === 'sorting') {
          switch (currentAlgorithm) {
            case 'bubble':
              await bubbleSort(array, setArray, setComparing, setSorted, isRunningRef, speedRef, sleep);
              break;
            case 'quick':
              await quickSort(array, setArray, setComparing, setSorted, isRunningRef, speedRef, sleep);
              break;
            case 'selection':
              await selectionSort(array, setArray, setComparing, setSorted, setCurrentIndex, isRunningRef, speedRef, sleep);
              break;
            case 'insertion':
              await insertionSort(array, setArray, setComparing, setSorted, setCurrentIndex, isRunningRef, speedRef, sleep);
              break;
            default:
              break;
          }
        } else {
          switch (currentAlgorithm) {
            case 'linear':
              await linearSearch(array, searchTarget, setCurrentIndex, setSearchResult, isRunningRef, speedRef, sleep);
              break;
            case 'binary':
              await binarySearch(array, searchTarget, setArray, setCurrentIndex, setSearchResult, setComparing, isRunningRef, speedRef, sleep);
              break;
            default:
              break;
          }
        }
      } catch (error) {
        console.error('Algorithm execution error:', error);
      } finally {
        setIsRunning(false);
      }
    }, 100);
  };

  // Stop algorithm
  const stopAlgorithm = () => {
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Algorithm Visualizer
        </h1>

        <Controls
          algorithmType={algorithmType}
          setAlgorithmType={setAlgorithmType}
          currentAlgorithm={currentAlgorithm}
          setCurrentAlgorithm={setCurrentAlgorithm}
          arraySize={arraySize}
          setArraySize={setArraySize}
          speed={speed}
          setSpeed={setSpeed}
          searchTarget={searchTarget}
          setSearchTarget={setSearchTarget}
          isRunning={isRunning}
          runAlgorithm={runAlgorithm}
          stopAlgorithm={stopAlgorithm}
          generateArray={generateArray}
          searchResult={searchResult}
          currentIndex={currentIndex}
          array={array}
        />

        <Visualization
          array={array}
          comparing={comparing}
          sorted={sorted}
          currentIndex={currentIndex}
          searchResult={searchResult}
        />

        <AlgorithmInfo
          algorithmType={algorithmType}
          currentAlgorithm={currentAlgorithm}
        />
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;