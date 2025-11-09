import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform transform hover:scale-105">
      <div className="p-3 bg-amber-100 dark:bg-amber-800 rounded-full text-amber-500 dark:text-amber-300">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default KpiCard;