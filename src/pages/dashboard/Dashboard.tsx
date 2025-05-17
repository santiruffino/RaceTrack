import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart3, Calendar, Clock, Medal, Mountain, Plus, Timer, TrendingUp } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useRaceStore from '../../store/raceStore';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import MetricsCard from '../../components/metrics/MetricsCard';
import FunFacts from '../../components/metrics/FunFacts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import RaceCountdown from '../../components/races/RaceCountdown';
import { calculateMetrics, formatPace, formatTime } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const {user} = useAuthStore();
  const {races, loadRaces} = useRaceStore();
  const {t} = useTranslation();

  useEffect(() => {
    if (user) {
      loadRaces(user.id);
    }
  }, [user, loadRaces]);

  const metrics = calculateMetrics(races);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar/>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("dashboard.welcome", {name: user?.name})}
            </h1>
            <p className="text-gray-600 mt-1">
              {t("dashboard.overview")}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/races/new">
              <Button
                variant="primary"
                icon={<Plus size={16}/>}
              >
                {t("dashboard.addRace")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Race Countdown */}
        <div className="mb-8">
          <RaceCountdown races={races}/>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title={t("dashboard.metrics.totalRaces")}
            value={metrics.totalRaces}
            icon={<Medal size={24} className="text-white"/>}
            color="bg-purple-500 text-white"
            delay={0.1}
          />

          <MetricsCard
            title={t("dashboard.metrics.completedRaces")}
            value={metrics.totalCompletedRaces}
            icon={<TrendingUp size={24} className="text-white"/>}
            color="bg-blue-500 text-white"
            delay={0.2}
          />

          <MetricsCard
            title={t("dashboard.metrics.upcomingRaces")}
            value={metrics.totalUpcomingRaces}
            icon={<Calendar size={24} className="text-white"/>}
            color="bg-amber-500 text-white"
            delay={0.3}
          />

          <MetricsCard
            title={t("dashboard.metrics.totalDistance")}
            value={`${metrics.totalDistance.toFixed(1)} km`}
            icon={<TrendingUp size={24} className="text-white"/>}
            color="bg-green-500 text-white"
            delay={0.4}
          />
        </div>

        {/* Fun Facts Section */}
        <FunFacts
          totalDistance={metrics.totalDistance}
          totalElevation={metrics.totalElevation}
          totalTime={metrics.totalTime}
        />

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock size={20} className="mr-2 text-purple-500"/>
                {t("dashboard.stats.timeStats.title")}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">{t("dashboard.stats.timeStats.totalTime")}</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {formatTime(metrics.totalTime)}
                  </p>
                </div>

                {metrics.fastest.race && (
                  <div>
                    <p className="text-sm text-gray-500">{t("dashboard.stats.timeStats.fastestPace")}</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {formatPace(metrics.fastest.pace)} min/km
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {metrics.fastest.race.name} ({metrics.fastest.race.distance} km)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="col-span-1">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Mountain size={20} className="mr-2 text-green-500"/>
                {t("dashboard.stats.elevationStats.title")}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">{t("dashboard.stats.elevationStats.totalElevation")}</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {metrics.totalElevation.toFixed(0)} m
                  </p>
                </div>

                {metrics.highest.race && (
                  <div>
                    <p className="text-sm text-gray-500">{t("dashboard.stats.elevationStats.highestRace")}</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {metrics.highest.elevation} m
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {metrics.highest.race.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="col-span-1">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 size={20} className="mr-2 text-blue-500"/>
                {t("dashboard.stats.terrainDistribution.title")}
              </h3>

              <div className="space-y-3">
                {Object.entries(metrics.terrainDistribution)
                  .filter(([, count]) => count > 0)
                  .map(([terrain, count]) => (
                  <div key={terrain}>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-700 capitalize">{t(`dashboard.stats.terrainDistribution.types.${terrain}`)}</p>
                      <p className="text-sm text-gray-500">{count} {t("dashboard.stats.terrainDistribution.races")}</p>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          terrain === 'road'
                            ? 'bg-blue-500'
                            : terrain === 'trail'
                              ? 'bg-green-500'
                              : 'bg-amber-500'
                        }`}
                        initial={{width: '0%'}}
                        animate={{
                          width: `${metrics.totalCompletedRaces > 0
                            ? (count / metrics.totalCompletedRaces) * 100
                            : 0}%`
                        }}
                        transition={{duration: 1, delay: 0.5}}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Races & Upcoming Races Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Medal size={20} className="mr-2 text-yellow-500"/>
                  {t("dashboard.recentRaces.title")}
                </h3>
                <Link to="/races" className="text-sm text-purple-600 hover:text-purple-800">
                  {t("dashboard.recentRaces.viewAll")}
                </Link>
              </div>

              <div className="space-y-4">
                {races
                  .filter(race => race.isCompleted)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 3)
                  .map(race => (
                    <motion.div
                      key={race.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{opacity: 0, y: 10}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.3}}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{race.name}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(race.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
                        <span>{race.distance} km</span>
                        <span>•</span>
                        <span className="capitalize">{race.terrainType}</span>
                        {race.time && (
                          <>
                            <span>•</span>
                            <span>{formatTime(race.time)}</span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}

                {races.filter(race => race.isCompleted).length === 0 && (
                  <div className="text-center py-8">
                    <Timer size={40} className="mx-auto text-gray-300 mb-2"/>
                    <p className="text-gray-500">{t("dashboard.recentRaces.noRaces")}</p>
                    <Link to="/races/new"
                          className="mt-2 inline-block text-purple-600 hover:text-purple-800">
                      {t("dashboard.recentRaces.addFirst")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="col-span-1">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar size={20} className="mr-2 text-blue-500"/>
                  {t("dashboard.upcomingRaces.title")}
                </h3>
                <Link to="/races/upcoming" className="text-sm text-purple-600 hover:text-purple-800">
                  {t("dashboard.upcomingRaces.viewAll")}
                </Link>
              </div>

              <div className="space-y-4">
                {races
                  .filter(race => !race.isCompleted)
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 3)
                  .map(race => (
                    <motion.div
                      key={race.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{opacity: 0, y: 10}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.3}}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{race.name}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(race.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
                        <span>{race.distance} km</span>
                        <span>•</span>
                        <span className="capitalize">{race.terrainType}</span>
                        {race.location && (
                          <>
                            <span>•</span>
                            <span>{race.location}</span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}

                {races.filter(race => !race.isCompleted).length === 0 && (
                  <div className="text-center py-8">
                    <Calendar size={40} className="mx-auto text-gray-300 mb-2"/>
                    <p className="text-gray-500">{t("dashboard.upcomingRaces.noRaces")}</p>
                    <Link to="/races/new"
                          className="mt-2 inline-block text-purple-600 hover:text-purple-800">
                      {t("dashboard.upcomingRaces.planNext")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default Dashboard;
