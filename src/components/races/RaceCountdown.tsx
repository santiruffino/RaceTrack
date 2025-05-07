import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import Card from '../ui/Card';
import { useTranslation } from 'react-i18next';

interface Race {
  id: string;
  name: string;
  date: string;
  isCompleted: boolean;
}

interface RaceCountdownProps {
  races: Race[];
}

const RaceCountdown: React.FC<RaceCountdownProps> = ({ races }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  // Find the next upcoming race
  const nextRace = races
    .filter(race => {
      const raceDate = new Date(race.date);
      const now = new Date();
      return !race.isCompleted && raceDate > now;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  useEffect(() => {
    if (!nextRace) return;

    const calculateTimeLeft = () => {
      const raceDate = new Date(nextRace.date);
      const now = new Date();
      const timezoneOffset = raceDate.getTimezoneOffset();
      const adjustedRaceDate = new Date(raceDate.getTime() + (timezoneOffset * 60000));
      const difference = adjustedRaceDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timeRemaining = calculateTimeLeft();
    if (!timeRemaining) {
      setTimeLeft(null);
      return;
    }

    setTimeLeft(timeRemaining);

    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      if (!updatedTime) {
        clearInterval(timer);
        setTimeLeft(null);
        return;
      }
      setTimeLeft(updatedTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [nextRace]);

  // Return null if there's no upcoming race or if the time left is null
  if (!nextRace || !timeLeft) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Timer size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">{t('dashboard.countdown.title')}</h3>
        </div>
        
        <div className="mb-2">
          <h4 className="text-xl font-bold">{nextRace.name}</h4>
          <p className="text-sm opacity-90">
            {new Date(nextRace.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-3xl font-bold">{timeLeft.days}</div>
            <div className="text-sm opacity-90 mt-1">{t('dashboard.countdown.days')}</div>
          </div>
          <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-3xl font-bold">{timeLeft.hours}</div>
            <div className="text-sm opacity-90 mt-1">{t('dashboard.countdown.hours')}</div>
          </div>
          <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-3xl font-bold">{timeLeft.minutes}</div>
            <div className="text-sm opacity-90 mt-1">{t('dashboard.countdown.minutes')}</div>
          </div>
          <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-3xl font-bold">{timeLeft.seconds}</div>
            <div className="text-sm opacity-90 mt-1">{t('dashboard.countdown.seconds')}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RaceCountdown;
