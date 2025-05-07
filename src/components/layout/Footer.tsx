import React from 'react';
import { Link } from 'react-router-dom';
import { Timer, Heart, Twitter, Instagram, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <Timer size={28} className="text-purple-400" />
              <span className="ml-2 text-xl font-bold text-white">RaceTrack</span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  {t('navigation.dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/races" className="text-gray-400 hover:text-white transition-colors">
                  {t('navigation.myRaces')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.termsOfService')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.cookiePolicy')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-gray-400">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="text-gray-400 mt-4 md:mt-0 flex items-center">
            {t('footer.madeWith')} <Heart size={16} className="mx-1 text-red-500" /> {t('footer.forRunners')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;