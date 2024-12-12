import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <ArrowLeft size={20} />
      <span>Back to Dashboard</span>
    </button>
  );
};

export default BackButton;