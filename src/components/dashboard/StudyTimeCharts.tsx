import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { useStudyTimeStats } from '../../hooks/useStudyTimeStats';

const StudyTimeCharts: React.FC = () => {
  const { currentUser } = useAuth();
  const { weeklyData, dailyData, loading } = useStudyTimeStats(currentUser?.uid);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-[300px] bg-white rounded-lg shadow-sm animate-pulse" />
        <div className="h-[300px] bg-white rounded-lg shadow-sm animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Weekly Study Time Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Last 7 Days Study Time</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStudyTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818CF8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
              />
              <YAxis tickFormatter={(value) => `${value}h`} />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                })}
                formatter={(value: number) => [`${value.toFixed(1)}h`, 'Study Time']}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#818CF8"
                fillOpacity={1}
                fill="url(#colorStudyTime)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Study Time Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Study Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="hour" 
                tickFormatter={(value) => `${value}:00`}
              />
              <YAxis tickFormatter={(value) => `${value}h`} />
              <Tooltip
                labelFormatter={(value) => `${value}:00 - ${(value + 1) % 24}:00`}
                formatter={(value: number) => [`${value.toFixed(1)}h`, 'Study Time']}
              />
              <Bar
                dataKey="hours"
                fill="#818CF8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudyTimeCharts;