import React from 'react';

interface SessionNameInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SessionNameInput: React.FC<SessionNameInputProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="w-full max-w-md">
      <label htmlFor="sessionName" className="block text-sm font-medium text-gray-700 mb-1">
        Session Name
      </label>
      <input
        type="text"
        id="sessionName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="What are you working on?"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}

export default SessionNameInput;