import React, { useState } from 'react';
import { Settings, Code, AlertTriangle, CheckCircle, Play, Pause, Edit, Plus } from 'lucide-react';

interface RulesEngineProps {
  onNavigate: (view: string) => void;
}

const RulesEngine: React.FC<RulesEngineProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'categories' | 'thresholds'>('rules');

  const complianceRules = [
    {
      id: 'MRP-001',
      name: 'MRP Disclosure Requirement',
      description: 'All products must display Maximum Retail Price clearly',
      category: 'Pricing',
      status: 'Active',
      confidence: 95,
      lastUpdated: '2025-01-10',
      violations: 234
    },
    {
      id: 'COO-001',
      name: 'Country of Origin Declaration',
      description: 'Products must clearly state country of manufacture',
      category: 'Origin',
      status: 'Active',
      confidence: 92,
      lastUpdated: '2025-01-08',
      violations: 156
    },
    {
      id: 'NQ-001',
      name: 'Net Quantity Specification',
      description: 'Packaged goods must display accurate net quantity',
      category: 'Quantity',
      status: 'Active',
      confidence: 88,
      lastUpdated: '2025-01-05',
      violations: 89
    },
    {
      id: 'EXP-001',
      name: 'Expiry Date Requirement',
      description: 'Perishable products must show clear expiry dates',
      category: 'Safety',
      status: 'Testing',
      confidence: 76,
      lastUpdated: '2025-01-12',
      violations: 45
    }
  ];

  const categories = [
    { name: 'Electronics', rules: 12, violations: 456 },
    { name: 'Packaged Foods', rules: 18, violations: 234 },
    { name: 'Apparel', rules: 8, violations: 123 },
    { name: 'Health Supplements', rules: 15, violations: 89 },
    { name: 'Baby Products', rules: 22, violations: 67 }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Testing': 'bg-amber-100 text-amber-800',
      'Inactive': 'bg-slate-100 text-slate-800'
    };
    return colors[status as keyof typeof colors] || colors.Active;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 mb-2">
            Rules Engine
          </h1>
          <p className="text-slate-600">
            Manage compliance logic and detection algorithms
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
            Import Rules
          </button>
          <button className="px-4 py-2 bg-navy-700 text-white rounded-lg hover:bg-navy-800 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4 inline mr-2" />
            New Rule
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'rules', label: 'Compliance Rules', icon: Code },
              { id: 'categories', label: 'Product Categories', icon: Settings },
              { id: 'thresholds', label: 'Detection Thresholds', icon: AlertTriangle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-navy-500 text-navy-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="p-6">
            <div className="space-y-4">
              {complianceRules.map((rule) => (
                <div 
                  key={rule.id}
                  className="border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-navy-800">{rule.name}</h3>
                        <span className="text-sm font-mono text-slate-500">{rule.id}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(rule.status)}`}>
                          {rule.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-4">{rule.description}</p>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-slate-500">Category</p>
                          <p className="text-sm font-medium text-slate-700">{rule.category}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Confidence</p>
                          <p className={`text-sm font-medium ${getConfidenceColor(rule.confidence)}`}>
                            {rule.confidence}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Last Updated</p>
                          <p className="text-sm font-medium text-slate-700">{rule.lastUpdated}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Violations Detected</p>
                          <p className="text-sm font-medium text-slate-700">{rule.violations}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-6">
                      <button className="p-2 text-slate-400 hover:text-navy-600 hover:bg-slate-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        {rule.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div 
                  key={category.name}
                  className="border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-all cursor-pointer"
                >
                  <h3 className="font-semibold text-navy-800 mb-4">{category.name}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Active Rules</span>
                      <span className="font-medium text-navy-800">{category.rules}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Violations</span>
                      <span className="font-medium text-red-600">{category.violations}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors text-sm font-medium">
                    Manage Rules
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Thresholds Tab */}
        {activeTab === 'thresholds' && (
          <div className="p-6">
            <div className="space-y-6">
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-navy-800 mb-4">Detection Sensitivity</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      OCR Confidence Threshold
                    </label>
                    <div className="flex items-center space-x-4">
                      <input 
                        type="range" 
                        min="70" 
                        max="99" 
                        defaultValue="85" 
                        className="flex-1"
                      />
                      <span className="text-sm font-medium text-slate-700 w-12">85%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Minimum confidence required for text extraction
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Violation Severity Threshold
                    </label>
                    <div className="flex items-center space-x-4">
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        defaultValue="7" 
                        className="flex-1"
                      />
                      <span className="text-sm font-medium text-slate-700 w-12">7/10</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Minimum severity score to flag as violation
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-navy-800 mb-4">Alert Thresholds</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Daily Violation Limit
                    </label>
                    <input 
                      type="number" 
                      defaultValue="50" 
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Alert when daily violations exceed this number
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Seller Risk Score Threshold
                    </label>
                    <input 
                      type="number" 
                      defaultValue="75" 
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Flag sellers with risk scores above this value
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-navy-800">47</p>
          <p className="text-sm text-slate-600">Active Rules</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Settings className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-navy-800">3</p>
          <p className="text-sm text-slate-600">Rules in Testing</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Code className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-navy-800">92.4%</p>
          <p className="text-sm text-slate-600">Detection Accuracy</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-navy-800">1,247</p>
          <p className="text-sm text-slate-600">Total Violations</p>
        </div>
      </div>
    </div>
  );
};

export default RulesEngine;