import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { sortingAlgorithms, searchingAlgorithms } from '../data/algorithmInfo';

const Controls = ({
  algorithmType,
  setAlgorithmType,
  currentAlgorithm,
  setCurrentAlgorithm,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  searchTarget,
  setSearchTarget,
  isRunning,
  runAlgorithm,
  stopAlgorithm,
  generateArray,
  searchResult,
  currentIndex,
  array
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Algorithm Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Algorithm Type</label>
          <select
            value={algorithmType}
            onChange={(e) => {
              setAlgorithmType(e.target.value);
              setCurrentAlgorithm(e.target.value === 'sorting' ? 'bubble' : 'linear');
            }}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            disabled={isRunning}
          >
            <option value="sorting">Sorting</option>
            <option value="searching">Searching</option>
          </select>
        </div>

        {/* Algorithm Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Algorithm</label>
          <select
            value={currentAlgorithm}
            onChange={(e) => setCurrentAlgorithm(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            disabled={isRunning}
          >
            {(algorithmType === 'sorting' ? sortingAlgorithms : searchingAlgorithms).map(algo => (
              <option key={algo.value} value={algo.value}>{algo.label}</option>
            ))}
          </select>
        </div>

        {/* Array Size */}
        <div>
          <label className="block text-sm font-medium mb-2">Array Size: {arraySize}</label>
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            disabled={isRunning}
          />
        </div>

        {/* Speed */}
        <div>
          <label className="block text-sm font-medium mb-2">Speed: {speed}ms</label>
          <input
            type="range"
            min="10"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Fast</span>
            <span>Slow</span>
          </div>
        </div>
      </div>

      {/* Search Target (for searching algorithms) */}
      {algorithmType === 'searching' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Search Target</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={searchTarget}
              onChange={(e) => setSearchTarget(parseInt(e.target.value) || 0)}
              className="w-32 bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-center"
              disabled={isRunning}
              min="1"
              max="300"
            />
            <span className="text-sm text-gray-400">
              (Range: 1-300)
            </span>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={isRunning ? stopAlgorithm : runAlgorithm}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${isRunning
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
            }`}
        >
          {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isRunning ? 'Stop' : 'Start'}
        </button>

        <button
          onClick={generateArray}
          disabled={isRunning}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Generate New Array
        </button>
      </div>

      {/* Status */}
      {algorithmType === 'searching' && (
        <div className="mt-4 p-3 bg-gray-700 rounded-lg">
          <p className="text-sm">
            {isRunning ? (
              searchResult === -1 ?
                `🔍 Searching for ${searchTarget}... Current index: ${currentIndex >= 0 ? currentIndex : 'Starting'}` :
                `✅ Found ${searchTarget} at index ${searchResult}! Value: ${array[searchResult]}`
            ) : (
              searchResult === -1 ?
                `❌ Target ${searchTarget} not found in array` :
                `✅ Found ${searchTarget} at index ${searchResult}! Value: ${array[searchResult]}`
            )}
          </p>
        </div>
      )}

      {/* Array Values Display */}
      <div className="mt-4 p-3 bg-gray-700 rounded-lg">
        <h4 className="text-sm font-medium mb-2">Array Values:</h4>
        <div className="text-xs text-gray-300 break-all">
          [{array.slice(0, 50).join(', ')}{array.length > 50 ? '...' : ''}]
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Length: {array.length} | Min: {Math.min(...array)} | Max: {Math.max(...array)}
        </div>
      </div>
    </div>
  );
};

export default Controls;