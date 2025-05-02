import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import Card from '../ui/Card';

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
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const nextRace = races
    .filter(race => !race.isCompleted)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  useEffect(() => {
    if (!nextRace) return;

    const calculateTimeLeft = () => {
      // Create date objects with explicit timezone handling
      const raceDate = new Date(nextRace.date);
      const now = new Date();
      
      // Get the timezone offset in minutes
      const timezoneOffset = raceDate.getTimezoneOffset();
      
      // Adjust the race date by adding the timezone offset
      const adjustedRaceDate = new Date(raceDate.getTime() + (timezoneOffset * 60000));
      
      const difference = adjustedRaceDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [nextRace]);

  if (!nextRace) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Timer size={24} className="mr-2" />
          <h3 className="text-lg font-semibold">Next Race Countdown</h3>
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
            <div className="text-sm opacity-90 mt-1">Days</div>
          </div>
          <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-3xl font-bold">{timeLeft.hours}</div>
            <div className="text-sm opacity-90 mt-1">Hours</div>
          </div>
          <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-3xl font-bold">{timeLeft.minutes}</div>
            <div className="text-sm opacity-90 mt-1">Minutes</div>
          </div>
          <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-3xl font-bold">{timeLeft.seconds}</div>
            <div className="text-sm opacity-90 mt-1">Seconds</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RaceCountdown; 