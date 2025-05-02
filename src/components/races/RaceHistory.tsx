import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Medal } from 'lucide-react';
import { Race } from '../../types';
import { formatTime, formatPace } from '../../lib/utils';

interface RaceHistoryProps {
  races: Race[];
}

const RaceHistory: React.FC<RaceHistoryProps> = ({ races }) => {
  if (races.length === 0) {
    return null;
  }

  const sortedRaces = [...races].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const bestTime = Math.min(...races.map(r => r.time || Infinity));
  
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Race History</h3>
      
      <div className="space-y-4">
        {sortedRaces.map((race, index) => (
          <motion.div
            key={race.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg ${race.time === bestTime ? 'bg-purple-50 border border-purple-200' : 'bg-white border border-gray-200'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  {new Date(race.date).toLocaleDateString()}
                </span>
              </div>
              
              {race.time && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-500" />
                    <span className="text-sm font-medium">
                      {formatTime(race.time)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    ({formatPace(race.time / 60 / race.distance)} /km)
                  </span>
                </div>
              )}
            </div>
            
            {race.position && (
              <div className="mt-2 flex items-center space-x-2">
                <Medal size={16} className="text-yellow-500" />
                <span className="text-sm text-gray-600">
                  #{race.position.general} overall / #{race.position.ageGroup} AG
                </span>
              </div>
            )}
            
            {race.time === bestTime && (
              <div className="mt-2 text-sm text-purple-600 font-medium">
                Personal Best! 🎉
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RaceHistory;