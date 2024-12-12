import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="relative p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div>
        <div className="absolute h-12 w-12 flex items-center justify-center rounded-md bg-indigo-50">
          {icon}
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{title}</p>
      </div>
      <div className="mt-4 ml-16 text-base text-gray-500">
        {description}
      </div>
    </div>
  );
};

export default FeatureCard;