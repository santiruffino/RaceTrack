import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Timer, Mail, Lock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validatePasswords = (): boolean => {
    if (password !== confirmPassword) {
      setPasswordError(t('auth.passwordsDoNotMatch'));
      return false;
    }
    if (password.length < 6) {
      setPasswordError(t('auth.passwordMinLength'));
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }
    
    try {
      await signup(email, name, password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Timer size={48} className="text-purple-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t('auth.createAccount')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('auth.or')}{' '}
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
              {t('auth.signInToExisting')}
            </Link>
          </p>
        </div>

        <Card bordered={false} className="px-8 py-10">
          {(error || passwordError) && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-sm text-red-700">{error || passwordError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label={t('auth.fullName')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              icon={<User size={18} className="text-gray-400" />}
              placeholder={t('auth.enterName')}
            />

            <Input
              label={t('auth.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<Mail size={18} className="text-gray-400" />}
              placeholder={t('auth.enterEmail')}
            />

            <Input
              label={t('auth.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={<Lock size={18} className="text-gray-400" />}
              placeholder={t('auth.createPassword')}
            />

            <Input
              label={t('auth.confirmPassword')}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              icon={<Lock size={18} className="text-gray-400" />}
              placeholder={t('auth.confirmYourPassword')}
              error={passwordError}
            />

            <div className="mt-6">
              <Button type="submit" fullWidth loading={isLoading}>
                {t('auth.signup')}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('auth.or')}</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/')}
              >
                {t('auth.backToHome')}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
