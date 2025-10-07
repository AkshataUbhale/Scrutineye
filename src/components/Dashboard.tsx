import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, Eye, Clock, CheckCircle, XCircle, ArrowUp, ArrowDown, Filter, Calendar } from 'lucide-react';
import PriorityInbox from './PriorityInbox';
import ThreatMatrix from './ThreatMatrix';
import ComplianceMetrics from './ComplianceMetrics';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [timeFilter, setTimeFilter] = useState('today');

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 slide-up">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 mb-2">
            Good morning, Inspector Kumar
          </h1>
          <p className="text-slate-600">
            Your morning briefing for {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white rounded-lg border border-slate-200 px-4 py-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="text-sm font-medium text-navy-700 bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          
          <button className="flex items-center space-x-2 bg-navy-700 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Advanced Filters</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <ComplianceMetrics />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Priority Inbox - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <PriorityInbox onNavigate={onNavigate} />
        </div>

        {/* Side Panel with Quick Stats */}
        <div className="space-y-6">
          {/* Today's Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-navy-800 mb-4">Today's Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Cases Reviewed</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-navy-800">12</span>
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +3
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Violations Found</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-red-600">8</span>
                  <span className="text-xs text-red-600 flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +2
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Actions Issued</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-amber-600">5</span>
                  <span className="text-xs text-amber-600 flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +1
                  </span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Efficiency Score</span>
                  <span className="font-bold text-lg text-green-600">94.2%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-navy-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                📊 Generate Weekly Report
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                📧 Send Compliance Notice
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                📋 Bulk Review Queue
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                🎯 Focus Mode (30 min)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Matrix - Full Width */}
      <div className="mt-6">
        <ThreatMatrix />
      </div>
    </div>
  );
};

export default Dashboard;