import React from 'react';
import { AlertTriangle, TrendingUp, Eye, Clock, CheckCircle, XCircle, ArrowUp, ArrowDown } from 'lucide-react';

const ComplianceMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'Critical Violations',
      value: '23',
      change: '+12%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red',
      description: 'Requiring immediate action'
    },
    {
      title: 'Pending Reviews',
      value: '156',
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'amber',
      description: 'In review queue'
    },
    {
      title: 'Compliance Rate',
      value: '87.3%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
      description: 'Overall platform compliance'
    },
    {
      title: 'Active Monitoring',
      value: '12.4K',
      change: '+156',
      trend: 'up',
      icon: Eye,
      color: 'blue',
      description: 'Products under surveillance'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'bg-red-50 text-red-700 border-red-200',
      amber: 'bg-amber-50 text-amber-700 border-amber-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      blue: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTrendColor = (trend: string, color: string) => {
    if (color === 'red' || color === 'amber') {
      return trend === 'up' ? 'text-red-600' : 'text-green-600';
    }
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown;
        
        return (
          <div 
            key={index} 
            className={`bg-white rounded-lg shadow-sm border ${getColorClasses(metric.color)} p-6 hover:shadow-md transition-shadow cursor-pointer group`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center space-x-1 text-xs ${getTrendColor(metric.trend, metric.color)}`}>
                <TrendIcon className="w-3 h-3" />
                <span className="font-medium">{metric.change}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-navy-800 mb-1 group-hover:text-navy-900 transition-colors">
                {metric.value}
              </h3>
              <p className="text-sm font-medium text-slate-700 mb-1">
                {metric.title}
              </p>
              <p className="text-xs text-slate-500">
                {metric.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComplianceMetrics;