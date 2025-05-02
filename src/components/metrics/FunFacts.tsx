import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Card from '../ui/Card';

interface FunFactsProps {
  totalDistance: number;
  totalElevation: number;
  totalTime: number;
}

const FunFacts: React.FC<FunFactsProps> = ({ totalDistance, totalElevation, totalTime }) => {
  return (
    <Card className="mb-8">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp size={20} className="mr-2 text-purple-500" />
          Fun Facts
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div 
            className="p-4 bg-purple-50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className="text-sm text-gray-600">Your total distance is equivalent to:</p>
            <p className="text-lg font-semibold text-purple-700 mt-1">
              {Math.round(totalDistance * 1000 / 105)} soccer fields
            </p>
            <p className="text-xs text-gray-500 mt-1">(A soccer field is 105m long)</p>
          </motion.div>

          <motion.div 
            className="p-4 bg-blue-50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className="text-sm text-gray-600">You've climbed the equivalent of:</p>
            <p className="text-lg font-semibold text-blue-700 mt-1">
              {(totalElevation / 8848).toFixed(1)} Mount Everests
            </p>
            <p className="text-xs text-gray-500 mt-1">(Mount Everest is 8,848m high)</p>
          </motion.div>

          <motion.div 
            className="p-4 bg-green-50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <p className="text-sm text-gray-600">Your total running time could:</p>
            <p className="text-lg font-semibold text-green-700 mt-1">
              {Math.round(totalTime / 120)} movies
            </p>
            <p className="text-xs text-gray-500 mt-1">(Average movie length: 2 hours)</p>
          </motion.div>
        </div>
      </div>
    </Card>
  );
};

export default FunFacts; 