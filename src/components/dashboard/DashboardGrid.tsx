import React from 'react';
import { Timer, Calendar, BarChart2, Settings } from 'lucide-react';
import DashboardButton from './DashboardButton';
import { useNavigate } from 'react-router-dom';

const DashboardGrid: React.FC = () => {
  const navigate = useNavigate();

  const buttons = [
    {
      icon: Timer,
      label: 'Start a Timer',
      onClick: () => navigate('/timer')
    },
    {
      icon: Calendar,
      label: 'Calendar',
      onClick: () => navigate('/calendar')
    },
    {
      icon: BarChart2,
      label: 'History',
      onClick: () => navigate('/history')
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => navigate('/settings')
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {buttons.map((button, index) => (
        <DashboardButton
          key={index}
          icon={button.icon}
          label={button.label}
          onClick={button.onClick}
        />
      ))}
    </div>
  );
};

export default DashboardGrid;