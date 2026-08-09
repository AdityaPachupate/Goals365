import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { AuthProvider } from './app/providers/AuthProvider';
import { ProtectedRoute } from './app/router/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';
import { SignInScreen } from './features/auth/SignInScreen';
import { DashboardScreen } from './features/dashboard/DashboardScreen';
import { GoalsListScreen } from './features/goals/GoalsListScreen';
import { CreateGoalScreen } from './features/goals/CreateGoalScreen';
import { ProfileScreen } from './features/profile/ProfileScreen';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignInScreen />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardScreen />} />
                <Route path="/goals" element={<GoalsListScreen />} />
                <Route path="/goals/new" element={<CreateGoalScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
