import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ 
  title, 
  value, 
  icon, 
  color,
  delay = 0
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <motion.p 
              className="mt-2 text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + delay, duration: 0.5 }}
            >
              {value}
            </motion.p>
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            {icon}
          </div>
        </div>
      </div>
      <div className={`h-1 w-full ${color}`}></div>
    </Card>
  );
};

export default MetricsCard;