import React, { useState } from 'react';
import { AlertTriangle, Clock, User, Package, ChevronRight, Filter, SortDesc } from 'lucide-react';

interface PriorityInboxProps {
  onNavigate: (view: string) => void;
}

const PriorityInbox: React.FC<PriorityInboxProps> = ({ onNavigate }) => {
  const [sortBy, setSortBy] = useState('priority');
  
  const priorityCases = [
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
      repeatOffender: true,
      estimatedImpact: 'High',
      description: 'High-value electronics bundle (₹45,000) missing mandatory MRP disclosure',
      riskFactors: ['Repeat Offender', 'High Value Product', 'Consumer Electronics']
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
      repeatOffender: false,
      estimatedImpact: 'High',
      description: 'Baby food products showing incorrect country of origin information',
      riskFactors: ['Sensitive Category', 'Health & Safety', 'Import Compliance']
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
      repeatOffender: true,
      estimatedImpact: 'Medium',
      description: 'Organic food products with inconsistent net quantity declarations',
      riskFactors: ['Repeat Offender', 'Consumer Deception', 'Food Category']
    },
    {
      id: 'VIO-2025-001250',
      title: 'Missing Expiry Date Information',
      seller: 'HealthPlus Supplements',
      platform: 'Amazon',
      category: 'Health Supplements',
      violationType: 'Expiry Date',
      severity: 'High',
      priority: 85,
      timeDetected: '6 hours ago',
      repeatOffender: false,
      estimatedImpact: 'High',
      description: 'Health supplements lacking proper expiry date disclosure',
      riskFactors: ['Health Category', 'Safety Critical', 'Regulatory Risk']
    },
    {
      id: 'VIO-2025-001251',
      title: 'Incomplete Manufacturer Details',
      seller: 'Fashion Forward',
      platform: 'Flipkart',
      category: 'Apparel',
      violationType: 'Manufacturer Info',
      severity: 'Medium',
      priority: 75,
      timeDetected: '8 hours ago',
      repeatOffender: false,
      estimatedImpact: 'Medium',
      description: 'Clothing items missing complete manufacturer information',
      riskFactors: ['Import Product', 'Traceability Issue', 'Consumer Rights']
    }
  ];

  const getSeverityColor = (severity: string) => {
    const colors = {
      'Critical': 'bg-red-100 text-red-800 border border-red-200',
      'High': 'bg-amber-100 text-amber-800 border border-amber-200',
      'Medium': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Low': 'bg-slate-100 text-slate-800 border border-slate-200'
    };
    return colors[severity as keyof typeof colors] || colors.Medium;
  };

  const getPriorityBarColor = (priority: number) => {
    if (priority >= 90) return 'bg-red-500';
    if (priority >= 80) return 'bg-amber-500';
    if (priority >= 70) return 'bg-blue-500';
    return 'bg-slate-400';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-navy-800">Top 5 High-Priority Cases</h2>
          <p className="text-sm text-slate-600 mt-1">
            Algorithmically ranked by severity, impact, and urgency
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <SortDesc className="w-4 h-4 text-slate-500" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-slate-200 rounded px-3 py-1 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="priority">Priority Score</option>
              <option value="time">Time Detected</option>
              <option value="severity">Severity Level</option>
              <option value="impact">Estimated Impact</option>
            </select>
          </div>
          
          <button className="text-sm text-navy-700 hover:text-navy-800 font-medium flex items-center space-x-1">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Cases List */}
      <div className="divide-y divide-slate-100">
        {priorityCases.map((case_, index) => (
          <div 
            key={case_.id} 
            className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group"
            onClick={() => onNavigate('workspace')}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Priority Score Bar */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getPriorityBarColor(case_.priority)} transition-all duration-300`}
                        style={{ width: `${case_.priority}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-slate-600">{case_.priority}/100</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getSeverityColor(case_.severity)}`}>
                      {case_.severity}
                    </span>
                    {case_.repeatOffender && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-800 border border-red-200">
                        Repeat Offender
                      </span>
                    )}
                  </div>
                </div>

                {/* Case Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-navy-800 group-hover:text-navy-900 transition-colors mb-1">
                      {case_.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      {case_.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-navy-600 transition-colors" />
                </div>

                {/* Case Metadata */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
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
                </div>

                {/* Risk Factors */}
                <div>
                  <p className="text-xs text-slate-500 mb-2">Risk Factors:</p>
                  <div className="flex flex-wrap gap-2">
                    {case_.riskFactors.map((factor, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-lg">
        <button className="text-sm text-navy-700 hover:text-navy-800 font-medium flex items-center space-x-1">
          <span>View All 156 Pending Cases</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PriorityInbox;