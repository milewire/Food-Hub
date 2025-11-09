import React from 'react';
import { UtensilsCrossed, Sun, Moon } from 'lucide-react';

interface HeaderProps {
    onToggleTheme: () => void;
    currentTheme: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleTheme, currentTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <UtensilsCrossed className="h-8 w-8 text-amber-500" />
          <h1 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
            FoodHub Insights
          </h1>
        </div>
        <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              Restaurant Data Analysis Dashboard
            </p>
            <button
                onClick={onToggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                aria-label="Toggle dark mode"
            >
                {currentTheme === 'light' ? (
                    <Moon className="h-6 w-6" />
                ) : (
                    <Sun className="h-6 w-6" />
                )}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
