import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftRight } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors flex items-center space-x-2"
      title={i18n.language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      <ArrowLeftRight size={14} className="text-purple-500" />
      <span className="text-sm font-medium">
        {i18n.language === 'en' ? 'ES' : 'EN'}
      </span>
      <span className="text-base">
        {i18n.language === 'en' ? '🇪🇸' : '🇬🇧'}
      </span>
    </button>
  );
};

export default LanguageSwitcher; 