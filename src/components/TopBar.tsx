import React, { useState } from 'react';
import { Search, Bell, Menu, Moon, Sun, Filter, Zap } from 'lucide-react';

interface TopBarProps {
  onMenuClick: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick, darkMode, onToggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Smart search:', searchQuery);
  };

  return (
    <header className={`sticky top-0 z-30 transition-colors duration-300 ${
      darkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-slate-200'
    } border-b shadow-sm backdrop-blur-sm bg-opacity-95`}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'text-slate-300 hover:bg-slate-700' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Smart Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className={`relative transition-all duration-200 ${
                searchFocused ? 'transform scale-[1.02]' : ''
              }`}>
                <Search className={`w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                  darkMode ? 'text-slate-400' : 'text-slate-400'
                }`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Smart search: 'violations from TechMart last 30 days' or 'missing MRP in electronics'"
                  className={`w-full pl-12 pr-12 py-3 rounded-xl transition-all duration-200 text-sm ${
                    darkMode
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:bg-slate-600'
                      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-500 focus:bg-white'
                  } border focus:ring-2 focus:ring-navy-500 focus:border-transparent shadow-sm`}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Zap className={`w-4 h-4 ${
                    darkMode ? 'text-amber-400' : 'text-amber-500'
                  }`} />
                </div>
              </div>

              {/* Smart Search Suggestions */}
              {searchQuery && searchFocused && (
                <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl border z-50 ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-700' 
                    : 'bg-white border-slate-200'
                }`}>
                  <div className="p-4">
                    <p className={`text-xs mb-3 ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      🧠 AI-powered suggestions:
                    </p>
                    <div className="space-y-1">
                      <button className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        darkMode 
                          ? 'hover:bg-slate-700 text-slate-200' 
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}>
                        All violations from "<span className="font-medium text-navy-500">{searchQuery}</span>" in last 30 days
                      </button>
                      <button className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        darkMode 
                          ? 'hover:bg-slate-700 text-slate-200' 
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}>
                        Missing MRP cases containing "<span className="font-medium text-navy-500">{searchQuery}</span>"
                      </button>
                      <button className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        darkMode 
                          ? 'hover:bg-slate-700 text-slate-200' 
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}>
                        Seller compliance history for "<span className="font-medium text-navy-500">{searchQuery}</span>"
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Advanced Filters */}
            <button className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              darkMode 
                ? 'text-slate-300 hover:bg-slate-700' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}>
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 ${
                darkMode 
                  ? 'text-amber-400 hover:bg-slate-700 hover:text-amber-300' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-amber-600'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <button className={`relative p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'text-slate-300 hover:bg-slate-700' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;