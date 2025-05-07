import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useAuthStore from './store/authStore';
import './i18n/config';
import AppRoutes from './routes';

const App: React.FC = () => {
  const { checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;