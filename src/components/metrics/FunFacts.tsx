import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

interface FunFactsProps {
  totalDistance: number;
  totalElevation: number;
  totalTime: number;
}

const FunFacts: React.FC<FunFactsProps> = ({ totalDistance, totalElevation, totalTime }) => {
  const { t } = useTranslation();

  return (
    <Card className="mb-8">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp size={20} className="mr-2 text-purple-500" />
          {t('dashboard.funFacts.title')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div 
            className="p-4 bg-purple-50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className="text-sm text-gray-600">{t('dashboard.funFacts.soccerFields.description')}</p>
            <p className="text-lg font-semibold text-purple-700 mt-1">
              {t('dashboard.funFacts.soccerFields.value', { count: Math.round(totalDistance * 1000 / 105) })}
            </p>
            <p className="text-xs text-gray-500 mt-1">{t('dashboard.funFacts.soccerFields.note')}</p>
          </motion.div>

          <motion.div 
            className="p-4 bg-blue-50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className="text-sm text-gray-600">{t('dashboard.funFacts.mountEverest.description')}</p>
            <p className="text-lg font-semibold text-blue-700 mt-1">
              {t('dashboard.funFacts.mountEverest.value', { count: Number((totalElevation / 8848).toFixed(1)) })}
            </p>
            <p className="text-xs text-gray-500 mt-1">{t('dashboard.funFacts.mountEverest.note')}</p>
          </motion.div>

          <motion.div 
            className="p-4 bg-green-50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <p className="text-sm text-gray-600">{t('dashboard.funFacts.movies.description')}</p>
            <p className="text-lg font-semibold text-green-700 mt-1">
              {t('dashboard.funFacts.movies.value', { count: Math.round(totalTime / 120) })}
            </p>
            <p className="text-xs text-gray-500 mt-1">{t('dashboard.funFacts.movies.note')}</p>
          </motion.div>
        </div>
      </div>
    </Card>
  );
};

export default FunFacts; 