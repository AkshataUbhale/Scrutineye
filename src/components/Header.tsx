import React, { useState } from 'react';
import { Shield, Search, Bell, User, ChevronDown, Home, FileText, Users } from 'lucide-react';

interface HeaderProps {
  activeView: 'dashboard' | 'case-file' | 'seller-dossier';
  onNavigate: (view: 'dashboard' | 'case-file' | 'seller-dossier') => void;
  currentCase?: any;
  currentSeller?: any;
}

const Header: React.FC<HeaderProps> = ({ activeView, onNavigate, currentCase, currentSeller }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Smart search implementation would go here
    console.log('Searching:', searchQuery);
  };

  const getBreadcrumbs = () => {
    switch (activeView) {
      case 'case-file':
        return (
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="hover:text-navy-700 transition-colors"
            >
              Dashboard
            </button>
            <span>/</span>
            <span className="font-medium text-navy-800">
              Case #{currentCase?.id || 'Unknown'}
            </span>
          </div>
        );
      case 'seller-dossier':
        return (
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="hover:text-navy-700 transition-colors"
            >
              Dashboard
            </button>
            <span>/</span>
            <span className="font-medium text-navy-800">
              Seller: {currentSeller?.name || 'Unknown'}
            </span>
          </div>
        );
      default:
        return (
          <div className="text-sm text-slate-600">
            <span className="font-medium text-navy-800">Morning Briefing</span>
          </div>
        );
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-navy-700 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-navy-800">ComplianceHub</h1>
                <p className="text-xs text-slate-500">Regulatory Intelligence Platform</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'dashboard' 
                    ? 'bg-navy-50 text-navy-700 border border-navy-200' 
                    : 'text-slate-600 hover:text-navy-700 hover:bg-slate-50'
                }`}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Dashboard
              </button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className={`relative transition-all duration-200 ${
                isSearchFocused ? 'transform scale-105' : ''
              }`}>
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Smart search: 'violations from TechMart last 30 days' or 'missing MRP in electronics'"
                  className="w-full pl-12 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                  <div className="p-3">
                    <p className="text-xs text-slate-500 mb-2">Smart suggestions:</p>
                    <div className="space-y-1">
                      <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 text-sm">
                        All violations from "{searchQuery}" in last 30 days
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 text-sm">
                        Missing MRP cases containing "{searchQuery}"
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-600 hover:text-navy-700 hover:bg-slate-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3 px-3 py-2 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-navy-800">Inspector Kumar</p>
                <p className="text-xs text-slate-500">Senior Regulator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="pb-4">
          {getBreadcrumbs()}
        </div>
      </div>
    </header>
  );
};

export default Header;