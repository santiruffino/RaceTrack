import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import useRaceStore from '../../store/raceStore';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import RaceForm from '../../components/races/RaceForm';
import { Race } from '../../types';

const secondsToTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hours, minutes, secs].map(val => val.toString().padStart(2, '0')).join(':');
};

const EditRace: React.FC = () => {
  const { user } = useAuthStore();
  const { races, updateRace } = useRaceStore();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [race, setRace] = useState<Race | null>(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    if (id && races.length > 0) {
      const foundRace = races.find(race => race.id === id);
      if (foundRace) {
        setRace(foundRace);
      } else {
        navigate('/races');
      }
    }
  }, [id, races, navigate]);
  
  const handleSubmit = (data: Partial<Race>) => {
    if (!user || !id) {
      return;
    }
    
    updateRace(id, data);
    navigate(data.isCompleted ? '/races' : '/races/upcoming');
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  if (!race) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">{t('races.loadingSuggestions')}</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t('races.editRace')}</h1>
          <p className="text-gray-600 mt-1">
            {t('races.newRaceDescription')}
          </p>
        </div>
        
        <RaceForm
          initialData={{
            ...race,
            date: race.date ? new Date(race.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            time: race.time ? secondsToTime(race.time) : undefined
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default EditRace;