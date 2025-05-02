import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useRaceStore from '../../store/raceStore';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import RaceForm from '../../components/races/RaceForm';
import { Race } from '../../types';

const NewRace: React.FC = () => {
  const { user } = useAuthStore();
  const { addRace } = useRaceStore();
  const navigate = useNavigate();
  
  const handleSubmit = (data: Partial<Race>) => {
    if (!user) {
      return;
    }
    
    const newRace: Omit<Race, 'id'> = {
      userId: user.id,
      name: data.name || '',
      date: data.date || new Date().toISOString(),
      distance: data.distance || 0,
      terrainType: data.terrainType || 'road',
      time: data.time,
      elevationGain: data.elevationGain,
      position: data.position,
      isCompleted: data.isCompleted || false,
      notes: data.notes,
      location: data.location,
    };
    
    addRace(newRace);
    navigate(newRace.isCompleted ? '/races' : '/races/upcoming');
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add New Race</h1>
          <p className="text-gray-600 mt-1">
            Record a past race or plan a future event
          </p>
        </div>
        
        <RaceForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default NewRace;