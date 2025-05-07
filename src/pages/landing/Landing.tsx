import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Medal, 
  Mountain, 
  TrendingUp, 
  Calendar, 
  BarChart3,
  Clock
} from 'lucide-react';
import Button from '../../components/ui/Button';
import useAuthStore from '../../store/authStore';

const Landing: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('landing.hero.title')}
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg text-white text-opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('landing.hero.subtitle')}
            </motion.p>
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                variant="primary" 
                size="lg" 
                className="bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => navigate('/login')}
              >
                {t('landing.hero.cta')}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">{t('landing.features.title')}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center ${feature.bgColor} mb-5`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t(`landing.features.${feature.key}.title`)}</h3>
                <p className="text-gray-600">{t(`landing.features.${feature.key}.description`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold text-purple-600">{stat.value}</p>
                <p className="mt-2 text-lg text-gray-600">{t(`landing.stats.${stat.key}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('landing.cta.title')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white text-opacity-90">
            {t('landing.cta.subtitle')}
          </p>
          <Button 
            size="lg" 
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() => navigate('/signup')}
          >
            {t('landing.cta.button')}
          </Button>
        </div>
      </section>
    </div>
  );
};

// Feature data
const features = [
  {
    key: 'raceLogging',
    icon: <Medal size={24} className="text-white" />,
    bgColor: 'bg-yellow-500'
  },
  {
    key: 'trackElevation',
    icon: <Mountain size={24} className="text-white" />,
    bgColor: 'bg-green-500'
  },
  {
    key: 'performanceAnalytics',
    icon: <TrendingUp size={24} className="text-white" />,
    bgColor: 'bg-blue-500'
  },
  {
    key: 'futureRacePlanning',
    icon: <Calendar size={24} className="text-white" />,
    bgColor: 'bg-purple-500'
  },
  {
    key: 'progressDashboard',
    icon: <BarChart3 size={24} className="text-white" />,
    bgColor: 'bg-indigo-500'
  },
  {
    key: 'timeTracking',
    icon: <Clock size={24} className="text-white" />,
    bgColor: 'bg-red-500'
  }
];

// Stats data
const stats = [
  { value: '10K+', key: 'activeUsers' },
  { value: '50K+', key: 'racesTracked' },
  { value: '500K+', key: 'kilometersRun' },
  { value: '99%', key: 'happyRunners' }
];

export default Landing;