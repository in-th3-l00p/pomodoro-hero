import React from 'react';
import { X } from 'lucide-react';
import { format } from '../../utils/dateUtils';
import { useSessionsByDate } from '../../hooks/useSessionsByDate';
import SessionCard from '../history/SessionCard';

interface SessionModalProps {
  date: Date;
  onClose: () => void;
}

const SessionModal: React.FC<SessionModalProps> = ({ date, onClose }) => {
  const { sessions, loading } = useSessionsByDate(date);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-in fade-in duration-200">
        <div className="flex items-center justify-between p-4 md:p-6 border-b">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Sessions for {format(date, 'MM d yyyy')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No sessions found for this date.</p>
              <p className="text-gray-400 text-sm mt-2">Try selecting a different date.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionModal;