import React from 'react';
import { getComplexityInfo, getCodeImplementation } from '../data/algorithmInfo';

const AlgorithmInfo = ({ algorithmType, currentAlgorithm }) => {
  const complexity = getComplexityInfo(algorithmType, currentAlgorithm);
  const code = getCodeImplementation(algorithmType, currentAlgorithm);

  return (
    <div className="bg-gray-800 rounded-lg p-6 mt-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Algorithm Information</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-blue-400 mb-2">Complexity Analysis</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <div>
              <span className="font-medium">Time Complexity: </span>
              {complexity.time}
            </div>
            <div>
              <span className="font-medium">Space Complexity: </span>
              {complexity.space}
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-purple-400 mb-2">C++ Implementation</h4>
          <pre className="bg-gray-900 p-3 rounded text-xs overflow-x-auto text-green-400 font-mono">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;