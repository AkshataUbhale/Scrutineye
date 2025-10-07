import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Workspace from './components/Workspace';
import SellerIntel from './components/SellerIntel';
import Reports from './components/Reports';
import RulesEngine from './components/RulesEngine';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';

// ✅ Define a shared type for views
export type View =
  | "dashboard"
  | "workspace"
  | "seller-intel"
  | "reports"
  | "rules-engine";

function App() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case "workspace":
        return <Workspace onNavigate={setActiveView} />;
      case "seller-intel":
        return <SellerIntel onNavigate={setActiveView} />;
      case "reports":
        return <Reports onNavigate={setActiveView} />;
      case "rules-engine":
        return <RulesEngine onNavigate={setActiveView} />;
      default:
        return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />

      {/* Main Content */}
      <div className="lg:ml-64 transition-all duration-300">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <main
          className={`transition-colors duration-300 ${
            darkMode ? "bg-slate-900" : "bg-slate-50"
          }`}
        >
          <div className="fade-in">{renderActiveView()}</div>
        </main>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
