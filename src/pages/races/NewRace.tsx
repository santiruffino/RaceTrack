import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useRaceStore from '../../store/raceStore';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import RaceForm from '../../components/races/RaceForm';
import { Race } from '../../types';
import { useTranslation } from 'react-i18next';

const NewRace: React.FC = () => {
  const { user } = useAuthStore();
  const { addRace } = useRaceStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleSubmit = (data: Partial<Race>) => {
    if (!user) {
      return;
    }
    
    const newRace: Omit<Race, 'id'> = {
      userId: user.id,
      name: data.name || '',
      date: data.date || new Date().toISOString(),
      distance: data.distance || 0,
      raceType: data.raceType || 'running',
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
          <h1 className="text-2xl font-bold text-gray-900">{t("races.addNewRace")}</h1>
          <p className="text-gray-600 mt-1">
            {t("races.newRaceDescription")}
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