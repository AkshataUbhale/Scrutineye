import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

interface ReportsProps {
  onNavigate: (view: string) => void;
}

const Reports: React.FC<ReportsProps> = ({ onNavigate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const reportTemplates = [
    {
      id: 'compliance-summary',
      title: 'Compliance Summary Report',
      description: 'Overall platform compliance metrics and trends',
      icon: BarChart3,
      color: 'blue',
      lastGenerated: '2 hours ago',
      frequency: 'Daily'
    },
    {
      id: 'violation-analysis',
      title: 'Violation Pattern Analysis',
      description: 'Deep dive into violation types and categories',
      icon: TrendingUp,
      color: 'amber',
      lastGenerated: '1 day ago',
      frequency: 'Weekly'
    },
    {
      id: 'seller-performance',
      title: 'Seller Performance Dashboard',
      description: 'Individual seller compliance scorecards',
      icon: PieChart,
      color: 'green',
      lastGenerated: '3 hours ago',
      frequency: 'Weekly'
    },
    {
      id: 'regulatory-impact',
      title: 'Regulatory Impact Assessment',
      description: 'Effectiveness of enforcement actions',
      icon: Activity,
      color: 'purple',
      lastGenerated: '1 week ago',
      frequency: 'Monthly'
    }
  ];

  const recentReports = [
    {
      id: 'RPT-2025-001',
      title: 'January 2025 Compliance Summary',
      type: 'Compliance Summary',
      generatedBy: 'Inspector Kumar',
      generatedAt: '2025-01-15 09:30',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 'RPT-2025-002',
      title: 'Electronics Category Violation Analysis',
      type: 'Violation Analysis',
      generatedBy: 'Inspector Sharma',
      generatedAt: '2025-01-14 16:45',
      size: '1.8 MB',
      format: 'Excel'
    },
    {
      id: 'RPT-2025-003',
      title: 'Top 50 Sellers Performance Review',
      type: 'Seller Performance',
      generatedBy: 'Inspector Patel',
      generatedAt: '2025-01-13 11:20',
      size: '3.1 MB',
      format: 'PDF'
    }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      amber: 'bg-amber-100 text-amber-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 mb-2">
            Reports & Analytics
          </h1>
          <p className="text-slate-600">
            Generate comprehensive compliance reports and insights
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-sm border border-slate-200 rounded px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <button className="px-4 py-2 bg-navy-700 text-white rounded-lg hover:bg-navy-800 transition-colors text-sm font-medium">
            Custom Report
          </button>
        </div>
      </div>

      {/* Report Templates */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-navy-800 mb-4">Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div 
                key={template.id}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(template.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <button className="text-slate-400 hover:text-navy-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-semibold text-navy-800 group-hover:text-navy-900 transition-colors mb-2">
                  {template.title}
                </h3>
                
                <p className="text-sm text-slate-600 mb-4">
                  {template.description}
                </p>

                <div className="space-y-2 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <span>Last generated:</span>
                    <span className="font-medium">{template.lastGenerated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Frequency:</span>
                    <span className="font-medium">{template.frequency}</span>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors text-sm font-medium">
                  Generate Report
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy-800">Recent Reports</h2>
          <button className="text-sm text-navy-600 hover:text-navy-800 font-medium">
            View All Reports →
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="divide-y divide-slate-100">
            {recentReports.map((report) => (
              <div 
                key={report.id}
                className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-slate-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-navy-800 group-hover:text-navy-900 transition-colors">
                        {report.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-slate-500">{report.type}</span>
                        <span className="text-sm text-slate-500">•</span>
                        <span className="text-sm text-slate-500">Generated by {report.generatedBy}</span>
                        <span className="text-sm text-slate-500">•</span>
                        <span className="text-sm text-slate-500">{report.generatedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">{report.size}</p>
                      <p className="text-xs text-slate-500">{report.format}</p>
                    </div>
                    
                    <button className="p-2 text-slate-400 hover:text-navy-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <p className="text-2xl font-bold text-navy-800">47</p>
          <p className="text-sm text-slate-600">Reports Generated</p>
          <p className="text-xs text-green-600 mt-1">+12% this month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <p className="text-2xl font-bold text-navy-800">156</p>
          <p className="text-sm text-slate-600">Data Points Analyzed</p>
          <p className="text-xs text-blue-600 mt-1">Across all reports</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <p className="text-2xl font-bold text-navy-800">23</p>
          <p className="text-sm text-slate-600">Automated Reports</p>
          <p className="text-xs text-amber-600 mt-1">Scheduled weekly</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <p className="text-2xl font-bold text-navy-800">94%</p>
          <p className="text-sm text-slate-600">Report Accuracy</p>
          <p className="text-xs text-green-600 mt-1">AI-verified data</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;