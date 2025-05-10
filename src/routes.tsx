import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Pages
import Landing from './pages/landing/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Races from './pages/races/Races';
import NewRace from './pages/races/NewRace';
import EditRace from './pages/races/EditRace';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

// Public only route component (for non-authenticated users)
const PublicOnlyRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return !isAuthenticated ? <>{element}</> : <Navigate to="/dashboard" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<PublicOnlyRoute element={<Login />} />} />
      <Route path="/signup" element={<PublicOnlyRoute element={<Signup />} />} />
      <Route path="/forgot-password" element={<PublicOnlyRoute element={<ForgotPassword />} />} />
      <Route path="/reset-password" element={<PublicOnlyRoute element={<ResetPassword />} />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/races" element={<ProtectedRoute element={<Races />} />} />
      <Route path="/races/upcoming" element={<ProtectedRoute element={<Races />} />} />
      <Route path="/races/new" element={<ProtectedRoute element={<NewRace />} />} />
      <Route path="/races/edit/:id" element={<ProtectedRoute element={<EditRace />} />} />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes; 
