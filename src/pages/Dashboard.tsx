import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import StudyTimeCharts from '../components/dashboard/StudyTimeCharts';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="mt-2 text-gray-600">Ready to boost your productivity, {currentUser?.email}?</p>
      </div>
      
      <div className="mb-12">
        <StudyTimeCharts />
      </div>
      
      <DashboardGrid />
    </div>
  );
};

export default Dashboard;