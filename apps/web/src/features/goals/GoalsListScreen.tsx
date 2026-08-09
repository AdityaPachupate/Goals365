import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoals } from './queries';
import { motion } from 'framer-motion';

export const GoalsListScreen = () => {
  const navigate = useNavigate();
  const { data: goals, isLoading } = useGoals();

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Goals</h1>
        <button 
          onClick={() => navigate('/goals/new')}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
        >
          New Goal
        </button>
      </header>
      
      {isLoading ? (
        <div className="flex justify-center py-12"><div className="animate-pulse w-8 h-8 rounded-full bg-blue-200"></div></div>
      ) : goals?.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-xl font-semibold text-gray-800">No goals yet</h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            You haven't set any goals for this year. Click "New Goal" to get started and break it down into 365 daily milestones!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {goals?.map(goal => (
            <motion.div 
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${goal.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                  {goal.status}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500">
                <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
