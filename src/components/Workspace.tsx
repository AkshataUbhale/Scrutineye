import React, { useState } from 'react';
import { Search, Filter, SortDesc, Eye, AlertTriangle, Clock, User, Package, ChevronRight, Grid, List, Calendar } from 'lucide-react';

interface WorkspaceProps {
  onNavigate: (view: string) => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  const cases = [
    {
      id: 'VIO-2025-001247',
      title: 'Missing MRP on Electronics Bundle',
      seller: 'TechMart Electronics',
      platform: 'Amazon',
      category: 'Electronics',
      violationType: 'Missing MRP',
      severity: 'Critical',
      priority: 95,
      timeDetected: '2 hours ago',
      status: 'Under Investigation',
      assignee: 'Inspector Kumar',
      evidence: 3,
      description: 'High-value electronics bundle (₹45,000) missing mandatory MRP disclosure'
    },
    {
      id: 'VIO-2025-001248',
      title: 'Incorrect Country of Origin - Baby Products',
      seller: 'BabyCare Essentials',
      platform: 'Flipkart',
      category: 'Baby Products',
      violationType: 'Country of Origin',
      severity: 'Critical',
      priority: 93,
      timeDetected: '3 hours ago',
      status: 'Evidence Review',
      assignee: 'Inspector Sharma',
      evidence: 5,
      description: 'Baby food products showing incorrect country of origin information'
    },
    {
      id: 'VIO-2025-001249',
      title: 'Misleading Net Quantity Claims',
      seller: 'Organic Foods Co.',
      platform: 'Myntra',
      category: 'Packaged Foods',
      violationType: 'Net Quantity',
      severity: 'High',
      priority: 88,
      timeDetected: '5 hours ago',
      status: 'Pending Action',
      assignee: 'Inspector Patel',
      evidence: 2,
      description: 'Organic food products with inconsistent net quantity declarations'
    }
  ];

  const getSeverityColor = (severity: string) => {
    const colors = {
      'Critical': 'bg-red-100 text-red-800 border-red-200',
      'High': 'bg-amber-100 text-amber-800 border-amber-200',
      'Medium': 'bg-blue-100 text-blue-800 border-blue-200',
      'Low': 'bg-slate-100 text-slate-800 border-slate-200'
    };
    return colors[severity as keyof typeof colors] || colors.Medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Under Investigation': 'bg-blue-100 text-blue-800',
      'Evidence Review': 'bg-amber-100 text-amber-800',
      'Pending Action': 'bg-red-100 text-red-800',
      'Resolved': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || colors['Under Investigation'];
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 mb-2">
            Investigation Workspace
          </h1>
          <p className="text-slate-600">
            Active case files and ongoing investigations
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' 
                  ? 'bg-navy-100 text-navy-700' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-navy-100 text-navy-700' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select 
                value={filterBy} 
                onChange={(e) => setFilterBy(e.target.value)}
                className="text-sm border border-slate-200 rounded px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              >
                <option value="all">All Cases</option>
                <option value="critical">Critical Only</option>
                <option value="assigned">Assigned to Me</option>
                <option value="pending">Pending Action</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <SortDesc className="w-4 h-4 text-slate-500" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-slate-200 rounded px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              >
                <option value="priority">Priority Score</option>
                <option value="time">Time Detected</option>
                <option value="severity">Severity Level</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-slate-600">
              {cases.length} active cases
            </span>
            <button className="px-4 py-2 bg-navy-700 text-white rounded-lg hover:bg-navy-800 transition-colors text-sm font-medium">
              New Investigation
            </button>
          </div>
        </div>
      </div>

      {/* Cases List/Grid */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="divide-y divide-slate-100">
            {cases.map((case_, index) => (
              <div 
                key={case_.id}
                className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => {/* Navigate to case detail */}}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Case Header */}
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-sm font-mono text-slate-500">{case_.id}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getSeverityColor(case_.severity)}`}>
                        {case_.severity}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(case_.status)}`}>
                        {case_.status}
                      </span>
                    </div>

                    <h3 className="font-semibold text-navy-800 group-hover:text-navy-900 transition-colors mb-2">
                      {case_.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 mb-4">
                      {case_.description}
                    </p>

                    {/* Case Metadata */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-xs text-slate-500">Seller</p>
                          <button 
                            className="text-sm font-medium text-navy-700 hover:text-navy-800 hover:underline transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('seller-intel');
                            }}
                          >
                            {case_.seller}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-xs text-slate-500">Category</p>
                          <p className="text-sm font-medium text-slate-700">{case_.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-xs text-slate-500">Violation</p>
                          <p className="text-sm font-medium text-slate-700">{case_.violationType}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-xs text-slate-500">Detected</p>
                          <p className="text-sm font-medium text-slate-700">{case_.timeDetected}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="text-xs text-slate-500">Evidence</p>
                          <p className="text-sm font-medium text-slate-700">{case_.evidence} items</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="w-16 bg-slate-200 rounded-full h-2 mb-1">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${case_.priority}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-slate-600">{case_.priority}/100</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-navy-600 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((case_) => (
            <div 
              key={case_.id}
              className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => {/* Navigate to case detail */}}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-mono text-slate-500">{case_.id}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getSeverityColor(case_.severity)}`}>
                  {case_.severity}
                </span>
              </div>

              <h3 className="font-semibold text-navy-800 group-hover:text-navy-900 transition-colors mb-2">
                {case_.title}
              </h3>
              
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                {case_.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Seller:</span>
                  <span className="font-medium text-navy-700">{case_.seller}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Priority:</span>
                  <span className="font-medium text-slate-700">{case_.priority}/100</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Evidence:</span>
                  <span className="font-medium text-slate-700">{case_.evidence} items</span>
                </div>
              </div>

              <div className={`text-xs font-medium px-2 py-1 rounded-full text-center ${getStatusColor(case_.status)}`}>
                {case_.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workspace;