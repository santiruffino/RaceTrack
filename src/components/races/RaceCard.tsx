import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, TrendingUp, Medal, Edit, Trash2 } from 'lucide-react';
import { Race, TerrainType } from '../../types';
import Card from '../ui/Card';
import { formatTime, getTerrainColor, getTerrainIcon } from '../../lib/utils';
import Button from '../ui/Button';

interface RaceCardProps {
  race: Race;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const terrainIcons: Record<TerrainType, React.ReactNode> = {
  road: <MapPin size={16} />,
  trail: <TrendingUp size={16} />,
  cross: <MapPin size={16} />
};

const RaceCard: React.FC<RaceCardProps> = ({ race, onEdit, onDelete }) => {
  const isUpcoming = !race.isCompleted;
  const formattedDate = new Date(race.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card 
      hoverable 
      className="h-full"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{race.name}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <MapPin size={14} className="mr-1" />
              <span>{race.location || 'Location not specified'}</span>
            </div>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            isUpcoming 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${getTerrainColor(race.terrainType)}`}>
            {terrainIcons[race.terrainType]}
          </div>
          <span className="text-sm font-medium capitalize">{race.terrainType}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm">{race.distance} km</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-gray-500" />
            <span className="text-sm">
              {race.time ? formatTime(race.time) : isUpcoming ? 'TBD' : 'Not recorded'}
            </span>
          </div>
          
          {race.terrainType === 'trail' && (
            <div className="flex items-center">
              <TrendingUp size={16} className="mr-2 text-gray-500" />
              <span className="text-sm">
                {race.elevationGain ? `${race.elevationGain}m` : 'No elevation data'}
              </span>
            </div>
          )}
          
          {race.isCompleted && race.position && (
            <div className="flex items-center">
              <Medal size={16} className="mr-2 text-yellow-500" />
              <span className="text-sm">
                {`#${race.position.general} overall / #${race.position.ageGroup} AG`}
              </span>
            </div>
          )}

          <div className="flex items-center">
            <span className="text-sm text-gray-500">
              {formattedDate}
            </span>
          </div>
        </div>

        {race.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
            {race.notes}
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            icon={<Edit size={16} />}
            onClick={() => onEdit(race.id)}
          >
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<Trash2 size={16} />} 
            className="text-red-500 hover:bg-red-50"
            onClick={() => onDelete(race.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RaceCard;