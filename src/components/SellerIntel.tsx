import React, { useState } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, User, Building, MapPin, Phone, Mail } from 'lucide-react';

interface SellerIntelProps {
  onNavigate: (view: string) => void;
}

const SellerIntel: React.FC<SellerIntelProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeller, setSelectedSeller] = useState<any>(null);

  const sellers = [
    {
      id: 'SELL-2025-7834',
      name: 'TechMart Electronics',
      businessName: 'TechMart Electronics Pvt Ltd',
      complianceScore: 72.4,
      riskLevel: 'Medium',
      totalViolations: 23,
      activeViolations: 8,
      resolvedViolations: 15,
      platforms: ['Amazon', 'Flipkart', 'Myntra'],
      categories: ['Electronics', 'Gadgets', 'Accessories'],
      lastActivity: '2 hours ago',
      trend: 'down'
    },
    {
      id: 'SELL-2025-7835',
      name: 'BabyCare Essentials',
      businessName: 'BabyCare Essentials India Ltd',
      complianceScore: 89.2,
      riskLevel: 'Low',
      totalViolations: 12,
      activeViolations: 2,
      resolvedViolations: 10,
      platforms: ['Amazon', 'Flipkart'],
      categories: ['Baby Products', 'Health & Safety'],
      lastActivity: '1 day ago',
      trend: 'up'
    },
    {
      id: 'SELL-2025-7836',
      name: 'Organic Foods Co.',
      businessName: 'Organic Foods Company',
      complianceScore: 65.8,
      riskLevel: 'High',
      totalViolations: 34,
      activeViolations: 12,
      resolvedViolations: 22,
      platforms: ['Amazon', 'BigBasket', 'Grofers'],
      categories: ['Packaged Foods', 'Organic Products'],
      lastActivity: '3 hours ago',
      trend: 'down'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getRiskLevelColor = (risk: string) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800 border-green-200',
      'Medium': 'bg-amber-100 text-amber-800 border-amber-200',
      'High': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[risk as keyof typeof colors] || colors.Medium;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 mb-2">
            Seller Intelligence Hub
          </h1>
          <p className="text-slate-600">
            Comprehensive seller compliance profiles and risk assessment
          </p>
        </div>

        <button className="px-4 py-2 bg-navy-700 text-white rounded-lg hover:bg-navy-800 transition-colors text-sm font-medium">
          Generate Report
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sellers by name, ID, or business..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select className="text-sm border border-slate-200 rounded px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent">
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>

            <select className="text-sm border border-slate-200 rounded px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent">
              <option value="score">Compliance Score</option>
              <option value="violations">Total Violations</option>
              <option value="activity">Last Activity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <div 
            key={seller.id}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => setSelectedSeller(seller)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800 group-hover:text-navy-900 transition-colors">
                    {seller.name}
                  </h3>
                  <p className="text-sm text-slate-500">{seller.id}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(seller.riskLevel)}`}>
                  {seller.riskLevel} Risk
                </span>
                {seller.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>

            {/* Compliance Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Compliance Score</span>
                <span className={`text-lg font-bold ${getScoreColor(seller.complianceScore)}`}>
                  {seller.complianceScore}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getScoreBgColor(seller.complianceScore)}`}
                  style={{ width: `${seller.complianceScore}%` }}
                ></div>
              </div>
            </div>

            {/* Violations Summary */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-800">{seller.totalViolations}</p>
                <p className="text-xs text-slate-500">Total</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-red-600">{seller.activeViolations}</p>
                <p className="text-xs text-slate-500">Active</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{seller.resolvedViolations}</p>
                <p className="text-xs text-slate-500">Resolved</p>
              </div>
            </div>

            {/* Platforms */}
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 mb-2">Platforms</p>
              <div className="flex flex-wrap gap-1">
                {seller.platforms.map((platform) => (
                  <span 
                    key={platform}
                    className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 mb-2">Categories</p>
              <div className="flex flex-wrap gap-1">
                {seller.categories.map((category) => (
                  <span 
                    key={category}
                    className="text-xs px-2 py-1 bg-navy-50 text-navy-700 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Last Activity */}
            <div className="flex items-center justify-between text-sm text-slate-500 pt-3 border-t border-slate-100">
              <span>Last activity: {seller.lastActivity}</span>
              <button 
                className="text-navy-600 hover:text-navy-800 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to detailed seller view
                }}
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-navy-800">1,247</p>
          <p className="text-sm text-slate-600">Total Sellers</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-navy-800">89</p>
          <p className="text-sm text-slate-600">High Risk</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingDown className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-navy-800">234</p>
          <p className="text-sm text-slate-600">Medium Risk</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-navy-800">924</p>
          <p className="text-sm text-slate-600">Low Risk</p>
        </div>
      </div>
    </div>
  );
};

export default SellerIntel;