import React, { useState } from 'react';
import { TrendingUp, Info, Filter, Download, RefreshCw } from 'lucide-react';

const ThreatMatrix: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<{row: string, col: string, value: number} | null>(null);
  const [timeRange, setTimeRange] = useState('30days');

  // Sample data for the threat matrix
  const categories = ['Electronics', 'Packaged Foods', 'Apparel', 'Health Supplements', 'Baby Products', 'Home & Garden'];
  const violationTypes = ['Missing MRP', 'Country of Origin', 'Net Quantity', 'Expiry Date', 'Manufacturer Info', 'False Claims'];
  
  // Generate sample heatmap data (in real app, this would come from API)
  const heatmapData = categories.map(category => 
    violationTypes.map(violation => ({
      category,
      violation,
      count: Math.floor(Math.random() * 50) + 1,
      severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
    }))
  );

  const getIntensityColor = (count: number, severity: string) => {
    const maxCount = 50;
    const intensity = count / maxCount;
    
    if (severity === 'high') {
      return `rgba(239, 68, 68, ${0.3 + intensity * 0.7})`; // red scale
    } else if (severity === 'medium') {
      return `rgba(245, 158, 11, ${0.3 + intensity * 0.7})`; // amber scale
    } else {
      return `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`; // blue scale
    }
  };

  const handleCellClick = (category: string, violation: string, count: number) => {
    setSelectedCell({ row: category, col: violation, value: count });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-navy-800 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Dynamic Threat Matrix</span>
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Violation patterns across product categories - Click cells for detailed analysis
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm border border-slate-200 rounded px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          
          <button className="text-sm text-slate-600 hover:text-navy-700 p-2 hover:bg-slate-50 rounded transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button className="text-sm text-slate-600 hover:text-navy-700 p-2 hover:bg-slate-50 rounded transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Matrix */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Column Headers */}
            <div className="flex mb-2">
              <div className="w-36"></div> {/* Empty space for row headers */}
              {violationTypes.map((violation) => (
                <div 
                  key={violation} 
                  className="w-32 px-2 py-3 text-xs font-medium text-slate-700 text-center border-b-2 border-slate-200"
                >
                  {violation}
                </div>
              ))}
            </div>

            {/* Matrix Rows */}
            {heatmapData.map((row, rowIndex) => (
              <div key={categories[rowIndex]} className="flex items-center">
                {/* Row Header */}
                <div className="w-36 px-4 py-3 text-sm font-medium text-navy-800 border-r-2 border-slate-200">
                  {categories[rowIndex]}
                </div>
                
                {/* Data Cells */}
                {row.map((cell, colIndex) => (
                  <div 
                    key={`${rowIndex}-${colIndex}`}
                    className="w-32 h-16 border border-slate-200 cursor-pointer hover:ring-2 hover:ring-navy-500 transition-all relative group"
                    style={{ backgroundColor: getIntensityColor(cell.count, cell.severity) }}
                    onClick={() => handleCellClick(cell.category, cell.violation, cell.count)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-slate-800">{cell.count}</span>
                    </div>
                    
                    {/* Hover Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-navy-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                      <div className="font-medium">{cell.category} × {cell.violation}</div>
                      <div>Count: {cell.count} violations</div>
                      <div>Severity: {cell.severity}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-navy-800"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Severity Levels</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-400 rounded"></div>
                  <span className="text-xs text-slate-600">High Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-amber-400 rounded"></div>
                  <span className="text-xs text-slate-600">Medium Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-400 rounded"></div>
                  <span className="text-xs text-slate-600">Low Risk</span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Violation Count</p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-600">Low</span>
                <div className="flex space-x-1">
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((opacity, idx) => (
                    <div 
                      key={idx}
                      className="w-4 h-4 bg-slate-400 rounded"
                      style={{ opacity }}
                    ></div>
                  ))}
                </div>
                <span className="text-xs text-slate-600">High</span>
              </div>
            </div>
          </div>

          {selectedCell && (
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-sm font-medium text-navy-800">
                {selectedCell.row} × {selectedCell.col}
              </p>
              <p className="text-lg font-bold text-navy-800">{selectedCell.value} violations</p>
              <button className="text-xs text-navy-600 hover:text-navy-800 underline mt-1">
                View detailed breakdown →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreatMatrix;