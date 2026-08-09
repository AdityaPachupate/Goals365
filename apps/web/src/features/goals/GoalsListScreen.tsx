import React from 'react';

export const GoalsListScreen = () => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Goals</h1>
        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          New Goal
        </button>
      </header>
      
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h3 className="text-xl font-semibold text-gray-800">No goals yet</h3>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          You haven't set any goals for this year. Click "New Goal" to get started and break it down into 365 daily milestones!
        </p>
      </div>
    </div>
  );
};
