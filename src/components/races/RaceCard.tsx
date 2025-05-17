import React from 'react';
import { Clock, MapPin, TrendingUp, Medal, Edit, Trash2 } from 'lucide-react';
import { Race, TerrainType } from '../../types';
import Card from '../ui/Card';
import { formatTime, getTerrainColor } from '../../lib/utils';
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
  const isUpcoming = !race.isCompleted;
  const formattedDate = new Date(race.date).toLocaleDateString(i18n.language, {
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
              <span>{race.location || t('races.locationNotSpecified')}</span>
            </div>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            isUpcoming 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {isUpcoming ? t('races.upcoming') : t('races.completed')}
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${getTerrainColor(race.terrainType)}`}>
            {terrainIcons[race.terrainType]}
          </div>
          <span className="text-sm font-medium capitalize">{t(`races.terrainTypes.${race.terrainType}`)}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm">{race.distance} km</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-gray-500" />
            <span className="text-sm">
              {race.time ? formatTime(race.time) : isUpcoming ? t('races.tbd') : t('races.notRecorded')}
            </span>
          </div>
          
          {race.terrainType === 'trail' && (
            <div className="flex items-center">
              <TrendingUp size={16} className="mr-2 text-gray-500" />
              <span className="text-sm">
                {race.elevationGain ? `${race.elevationGain}m` : t('races.noElevationData')}
              </span>
            </div>
          )}
          
          {race.isCompleted && race.position && (
            <div className="flex items-center">
              <Medal size={16} className="mr-2 text-yellow-500" />
              <span className="text-sm">
                {t('races.position', { general: race.position.general, ageGroup: race.position.ageGroup })}
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
            {t('common.edit')}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<Trash2 size={16} />} 
            className="text-red-500 hover:bg-red-50"
            onClick={() => onDelete(race.id)}
          >
            {t('common.delete')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RaceCard;