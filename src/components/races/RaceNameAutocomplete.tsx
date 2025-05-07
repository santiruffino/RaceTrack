import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { searchRaceNames } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';

interface RaceNameAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (name: string) => void;
  error?: string;
}

const RaceNameAutocomplete: React.FC<RaceNameAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  error
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      const results = await searchRaceNames(value);
      setSuggestions(results);
      setIsLoading(false);
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  return (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Race Name
      </label>
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className={`
            pl-10 pr-4 py-2 w-full rounded-md border
            ${error ? 'border-red-500' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            transition-colors duration-200
          `}
          placeholder={t('races.enterRaceName')}
        />
      </div>

      <AnimatePresence>
        {showSuggestions && (value.length >= 2) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200"
          >
            {isLoading ? (
              <div className="p-2 text-sm text-gray-500">{t('races.loadingSuggestions')}</div>
            ) : suggestions.length > 0 ? (
              <ul>
                {suggestions.map((name, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 cursor-pointer"
                    onClick={() => {
                      onSelect(name);
                      setShowSuggestions(false);
                    }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-2 text-sm text-gray-500">{t('races.noSuggestionsFound')}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default RaceNameAutocomplete;