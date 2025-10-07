import React, { useState } from 'react';
import { ArrowLeft, User, AlertTriangle, CheckCircle, TrendingDown, TrendingUp, Calendar, Package, FileText, Shield, Phone, Mail, MapPin } from 'lucide-react';

interface SellerDossierProps {
  sellerData: any;
  onBack: () => void;
}

const SellerDossier: React.FC<SellerDossierProps> = ({ sellerData, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'violations' | 'compliance'>('overview');

  // Mock seller data
  const seller = {
    id: 'SELL-2025-7834',
    name: sellerData?.name || 'TechMart Electronics',
    businessName: 'TechMart Electronics Pvt Ltd',
    registrationNumber: 'CIN: U74999DL2018PTC334567',
    gstNumber: '07AABCT1234M1Z5',
    establishedDate: '2018-03-15',
    complianceScore: 72.4,
    riskLevel: 'Medium',
    totalViolations: 23,
    activeViolations: 8,
    resolvedViolations: 15,
    platforms: ['Amazon', 'Flipkart', 'Myntra'],
    categories: ['Electronics', 'Gadgets', 'Accessories'],
    contact: {
      email: 'compliance@techmart.com',
      phone: '+91-11-2345-6789',
      address: '123 Tech Park, Gurgaon, Haryana 122001'
    },
    recentActivity: [
      { date: '2025-01-15', type: 'violation', description: 'Missing MRP on Electronics Bundle', severity: 'Critical' },
      { date: '2025-01-10', type: 'resolution', description: 'Corrected Net Quantity on Product #ABC123', severity: 'Resolved' },
      { date: '2025-01-08', type: 'notice', description: 'Compliance Notice Issued - Country of Origin', severity: 'High' },
      { date: '2025-01-05', type: 'violation', description: 'Incorrect Manufacturer Details', severity: 'Medium' },
      { date: '2025-01-03', type: 'resolution', description: 'Updated MRP on 15 products', severity: 'Resolved' }
    ],
    complianceHistory: [
      { month: 'Jan', score: 72.4, violations: 8 },
      { month: 'Dec', score: 68.2, violations: 12 },
      { month: 'Nov', score: 75.1, violations: 6 },
      { month: 'Oct', score: 71.8, violations: 9 },
      { month: 'Sep', score: 69.5, violations: 11 },
      { month: 'Aug', score: 73.2, violations: 7 }
    ]
  };

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'violation': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'resolution': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'notice': return <FileText className="w-4 h-4 text-amber-500" />;
      default: return <Package className="w-4 h-4 text-slate-500" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'violations', label: 'Violations History', icon: AlertTriangle },
    { id: 'compliance', label: 'Compliance Trends', icon: Shield }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-navy-800">
              Seller Dossier: {seller.name}
            </h1>
            <p className="text-slate-600">{seller.businessName}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskLevelColor(seller.riskLevel)}`}>
            {seller.riskLevel} Risk
          </span>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-slate-100`}>
              <Shield className="w-5 h-5 text-slate-600" />
            </div>
            <div className={`text-xs ${seller.complianceHistory[0].score > seller.complianceHistory[1].score ? 'text-green-600' : 'text-red-600'} flex items-center space-x-1`}>
              {seller.complianceHistory[0].score > seller.complianceHistory[1].score ? 
                <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
              }
              <span>
                {Math.abs(seller.complianceHistory[0].score - seller.complianceHistory[1].score).toFixed(1)}%
              </span>
            </div>
          </div>
          <div>
            <h3 className={`text-2xl font-bold mb-1 ${getScoreColor(seller.complianceScore)}`}>
              {seller.complianceScore}%
            </h3>
            <p className="text-sm font-medium text-slate-700 mb-1">
              Compliance Score
            </p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getScoreBgColor(seller.complianceScore)}`}
                style={{ width: `${seller.complianceScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-red-50">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-xs text-red-600 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+2</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-1">
              {seller.activeViolations}
            </h3>
            <p className="text-sm font-medium text-slate-700 mb-1">
              Active Violations
            </p>
            <p className="text-xs text-slate-500">
              Out of {seller.totalViolations} total
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-green-50">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-xs text-green-600 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+3</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-600 mb-1">
              {seller.resolvedViolations}
            </h3>
            <p className="text-sm font-medium text-slate-700 mb-1">
              Resolved Issues
            </p>
            <p className="text-xs text-slate-500">
              Resolution rate: {Math.round((seller.resolvedViolations / seller.totalViolations) * 100)}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-blue-50">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-xs text-slate-600">
              {seller.platforms.length} platforms
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-1">
              {seller.categories.length}
            </h3>
            <p className="text-sm font-medium text-slate-700 mb-1">
              Product Categories
            </p>
            <p className="text-xs text-slate-500">
              {seller.categories.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Business Information */}
              <div className="lg:col-span-2">
                <h3 className="font-semibold text-navy-800 mb-4">Business Information</h3>
                <div className="bg-slate-50 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Seller ID</p>
                      <p className="font-medium text-slate-800">{seller.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Registration Number</p>
                      <p className="font-medium text-slate-800">{seller.registrationNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">GST Number</p>
                      <p className="font-medium text-slate-800">{seller.gstNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Established</p>
                      <p className="font-medium text-slate-800">
                        {new Date(seller.establishedDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Contact Information</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-800">{seller.contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-800">{seller.contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-800">{seller.contact.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-6">
                  <h3 className="font-semibold text-navy-800 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {seller.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                        <div className="mt-0.5">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800 mb-1">
                            {activity.description}
                          </p>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs text-slate-500">
                              {new Date(activity.date).toLocaleDateString('en-IN')}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              activity.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                              activity.severity === 'High' ? 'bg-amber-100 text-amber-800' :
                              activity.severity === 'Resolved' ? 'bg-green-100 text-green-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {activity.severity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions & Platforms */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-navy-800 mb-4">Platforms</h3>
                  <div className="space-y-2">
                    {seller.platforms.map((platform) => (
                      <div key={platform} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-800">{platform}</span>
                        <span className="text-sm text-green-600">Active</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-navy-800 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm">
                      📧 Send Compliance Notice
                    </button>
                    <button className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm">
                      📊 Generate Seller Report
                    </button>
                    <button className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm">
                      🔍 Deep Audit Request
                    </button>
                    <button className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm">
                      ⚠️ Flag for Monitoring
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content */}
        {activeTab !== 'overview' && (
          <div className="p-6">
            <div className="text-center py-12">
              <p className="text-slate-500">
                {activeTab === 'violations' ? 'Violations History' : 'Compliance Trends'} content would be displayed here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDossier;