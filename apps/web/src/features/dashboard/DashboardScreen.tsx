import React from 'react';
import { useAuth } from '../../app/providers/AuthProvider';

export const DashboardScreen = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Good morning, {user?.name?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-gray-500 mt-2">Here is a quick overview of your 365 Goals.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700">Active Goals</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700">Completed</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">0</p>
        </div>
      </div>
    </div>
  );
};
