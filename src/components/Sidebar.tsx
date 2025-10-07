import React from "react";
import {
  Home,
  Briefcase,
  Users,
  FileText,
  Settings,
  Shield,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: any) => void;
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  isOpen,
  onClose,
  darkMode,
}) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      description: "Morning briefing & overview",
    },
    {
      id: "workspace",
      label: "Workspace",
      icon: Briefcase,
      description: "Active case investigations",
    },
    {
      id: "seller-intel",
      label: "Seller Intel",
      icon: Users,
      description: "Seller compliance profiles",
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      description: "Analytics & documentation",
    },
    {
      id: "rules-engine",
      label: "Rules Engine",
      icon: Settings,
      description: "Compliance logic & settings",
    },
  ];

  const handleNavigation = (viewId: string) => {
    onNavigate(viewId);
    onClose(); // Close mobile sidebar after navigation
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 transform transition-all duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${
          darkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-slate-200"
        } border-r shadow-lg`}
      >
        {/* Logo Section */}
        <div
          className={`p-6 border-b ${
            darkMode ? "border-slate-700" : "border-slate-200"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-navy-800"
                }`}
              >
                Scrutineye{" "}
              </h1>
              <p
                className={`text-xs ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Regulatory Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? darkMode
                      ? "bg-navy-600 text-white shadow-lg"
                      : "bg-navy-50 text-navy-700 border border-navy-200 shadow-sm"
                    : darkMode
                    ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-navy-700"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  }`}
                />
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{item.label}</p>
                  <p
                    className={`text-xs ${
                      isActive
                        ? darkMode
                          ? "text-navy-200"
                          : "text-navy-600"
                        : darkMode
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-60" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
            darkMode ? "border-slate-700" : "border-slate-200"
          }`}
        >
          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-slate-700" : "bg-slate-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">IK</span>
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  Inspector Kumar
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Senior Regulator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
