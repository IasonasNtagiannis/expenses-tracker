import { History, LayoutDashboard } from "lucide-react";
import React from "react";

interface NavigationProps {
  onNavigate: (showHistory: boolean) => void;
  showHistory: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, showHistory }) => {
  return (
    <nav className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 mb-8 mt-4">
      <button
        onClick={() => onNavigate(false)}
        className={`w-full sm:w-auto p-4 rounded-lg flex items-center justify-center space-x-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md text-lg
          ${
            !showHistory
              ? "bg-black text-white ring-2 ring-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 ring-1 ring-gray-300"
          }`}
      >
        <LayoutDashboard size={22} />
        <span>Current View</span>
      </button>
      <button
        onClick={() => onNavigate(true)}
        className={`w-full sm:w-auto p-4 rounded-lg flex items-center justify-center space-x-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md text-lg
          ${
            showHistory
              ? "bg-black text-white ring-2 ring-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 ring-1 ring-gray-300"
          }`}
      >
        <History size={22} />
        <span>Expense History</span>
      </button>
    </nav>
  );
};

export default Navigation;
