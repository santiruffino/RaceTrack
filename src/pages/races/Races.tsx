import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Filter, Search } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useRaceStore from '../../store/raceStore';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import RaceCard from '../../components/races/RaceCard';
import { TerrainType } from '../../types';

const Races: React.FC = () => {
  const { user } = useAuthStore();
  const { races, loadRaces, deleteRace } = useRaceStore();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [terrainFilter, setTerrainFilter] = useState<TerrainType | 'all'>('all');
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(true);
  
  useEffect(() => {
    if (user) {
      loadRaces(user.id);
    }
  }, [user, loadRaces]);
  
  const handleEdit = (id: string) => {
    navigate(`/races/edit/${id}`);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this race?')) {
      deleteRace(id);
    }
  };
  
  const handleAddNew = () => {
    navigate('/races/new');
  };
  
  const filteredRaces = races
    .filter(race => race.isCompleted === showOnlyCompleted)
    .filter(race => terrainFilter === 'all' || race.terrainType === terrainFilter)
    .filter(race => 
      race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (race.location && race.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {showOnlyCompleted ? 'Completed Races' : 'Upcoming Races'}
            </h1>
            <p className="text-gray-600 mt-1">
              {showOnlyCompleted 
                ? 'View and manage your race history' 
                : 'Plan and prepare for your upcoming events'}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button
              variant="primary"
              icon={<Plus size={16} />}
              onClick={handleAddNew}
            >
              Add New Race
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search races..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={terrainFilter}
                onChange={(e) => setTerrainFilter(e.target.value as TerrainType | 'all')}
              >
                <option value="all">All Terrains</option>
                <option value="road">Road</option>
                <option value="trail">Trail</option>
                <option value="cross">Cross</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  showOnlyCompleted 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setShowOnlyCompleted(true)}
              >
                Completed
              </button>
              <button
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  !showOnlyCompleted 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setShowOnlyCompleted(false)}
              >
                Upcoming
              </button>
            </div>
          </div>
        </div>
        
        {/* Race List */}
        {filteredRaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRaces.map((race, index) => (
              <motion.div
                key={race.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <RaceCard
                  race={race}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No races found</h3>
              <p className="text-gray-600 mb-6">
                {showOnlyCompleted
                  ? "You haven't recorded any completed races yet."
                  : "You don't have any upcoming races planned."}
              </p>
              <Button
                variant="primary"
                icon={<Plus size={16} />}
                onClick={handleAddNew}
              >
                {showOnlyCompleted ? 'Add your first race' : 'Plan a race'}
              </Button>
            </motion.div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Races;