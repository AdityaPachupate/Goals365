import React from 'react';
import { useAuth } from '../../app/providers/AuthProvider';
import { useGoals } from '../goals/queries';

export const DashboardScreen = () => {
  const { user } = useAuth();
  const { data: goals, isLoading } = useGoals();
  
  const activeCount = goals?.filter(g => g.status === 'active').length || 0;
  const completedCount = goals?.filter(g => g.status === 'completed').length || 0;
  
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Good morning, {user?.name?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-gray-500 mt-2">Here is a quick overview of your 365 Goals.</p>
      </header>
      
      {isLoading ? (
         <div className="animate-pulse flex gap-4">
           <div className="bg-gray-200 h-32 w-1/3 rounded-2xl"></div>
           <div className="bg-gray-200 h-32 w-1/3 rounded-2xl"></div>
         </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <h3 className="font-medium text-gray-500 text-sm">Active Goals</h3>
            <p className="text-4xl font-bold mt-2 text-gray-900">{activeCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <h3 className="font-medium text-gray-500 text-sm">Completed</h3>
            <p className="text-4xl font-bold mt-2 text-green-600">{completedCount}</p>
          </div>
        </div>
      )}
    </div>
  );
};
