import React from 'react';

const Visualization = ({ array, comparing, sorted, currentIndex, searchResult }) => {
  // Get bar color based on state
  const getBarColor = (index) => {
    if (searchResult === index) return 'bg-green-500';
    if (currentIndex === index) return 'bg-yellow-500';
    if (comparing.includes(index)) return 'bg-red-500';
    if (sorted.includes(index)) return 'bg-green-400';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-end justify-center space-x-1 h-96 overflow-x-auto">
        {array.map((value, index) => (
          <div
            key={index}
            className={`transition-all duration-200 ${getBarColor(index)} rounded-t`}
            style={{
              height: `${(value / 300) * 100}%`,
              width: `${Math.max(800 / array.length - 2, 4)}px`,
              minWidth: '2px'
            }}
            title={`Index: ${index}, Value: ${value}`}
          >
            {array.length <= 20 && (
              <div className="text-xs text-white text-center pt-1 font-mono">
                {value}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center mt-6 gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
          <span>Unsorted</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
          <span>Sorted</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span>Found</span>
        </div>
      </div>
    </div>
  );
};

export default Visualization;