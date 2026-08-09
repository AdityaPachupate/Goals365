import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGoal } from './queries';
import { useMilestones, useUpdateMilestone, useCreateMilestone } from '../milestones/queries';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import { calculateGoalProgress, isGoalOnTrack } from '@365-goals/shared';
import { motion, AnimatePresence } from 'framer-motion';

export const GoalDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: goal, isLoading: loadingGoal } = useGoal(id!);
  const { data: milestones, isLoading: loadingMilestones } = useMilestones(id!);
  const { mutate: updateMilestone } = useUpdateMilestone(id!);
  const { mutate: createMilestone, isPending: creatingMilestone } = useCreateMilestone();
  
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');

  if (loadingGoal || loadingMilestones) {
    return <div className="p-8 flex justify-center"><div className="animate-pulse w-8 h-8 rounded-full bg-blue-200"></div></div>;
  }

  if (!goal) {
    return <div className="p-8 text-center text-gray-500">Goal not found</div>;
  }

  const progress = calculateGoalProgress(milestones || []);
  const onTrack = isGoalOnTrack(goal as any, milestones as any);

  const toggleMilestone = (milestoneId: string, currentStatus: string) => {
    updateMilestone({
      id: milestoneId,
      status: currentStatus === 'completed' ? 'pending' : 'completed',
    });
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;
    createMilestone({ goalId: id!, title: newMilestoneTitle }, {
      onSuccess: () => setNewMilestoneTitle('')
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
      <header className="mb-8">
        <button onClick={() => navigate('/goals')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Goals
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{goal.title}</h1>
            <p className="text-gray-500 mt-1">{goal.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${onTrack ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            {onTrack ? 'On Track' : 'Falling Behind'}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-semibold text-gray-600">Progress</span>
          <span className="text-2xl font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 1 }}
            className="bg-blue-600 h-full rounded-full"
          />
        </div>
      </div>

      <div className="mb-6 flex justify-between items-end">
        <h2 className="text-xl font-bold text-gray-900">Milestones</h2>
        <span className="text-sm text-gray-500">{milestones?.length || 0} total</span>
      </div>

      <form onSubmit={handleAddMilestone} className="flex gap-2 mb-6">
        <input 
          type="text"
          value={newMilestoneTitle}
          onChange={e => setNewMilestoneTitle(e.target.value)}
          placeholder="Add a new milestone..."
          className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
        />
        <button 
          type="submit"
          disabled={!newMilestoneTitle.trim() || creatingMilestone}
          className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
        >
          <Plus className="w-6 h-6" />
        </button>
      </form>

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {milestones?.map(milestone => {
            const isCompleted = milestone.status === 'completed';
            return (
              <motion.div 
                key={milestone.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${isCompleted ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}
                onClick={() => toggleMilestone(milestone.id, milestone.status)}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                >
                  {isCompleted && <Check className="w-4 h-4 text-white" />}
                </motion.div>
                <span className={`text-lg font-medium transition-colors ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                  {milestone.title}
                </span>
              </motion.div>
            )
          })}
        </AnimatePresence>
        
        {milestones?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No milestones yet. Break your goal down into small steps!
          </div>
        )}
      </div>
    </div>
  );
};
