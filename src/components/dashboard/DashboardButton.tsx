import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

const DashboardButton: React.FC<DashboardButtonProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 space-y-4"
    >
      <Icon className="w-8 h-8 text-indigo-600" />
      <span className="text-gray-900 font-medium">{label}</span>
    </button>
  );
};

export default DashboardButton;