import React, { useState } from 'react';
import { useAuth } from '../../app/providers/AuthProvider';
import { useGoals, useCreateGoal } from '../goals/queries';
import { useMilestones, useUpdateMilestone, useCreateMilestone } from '../milestones/queries';
import { calculateGoalProgress } from '@365-goals/shared';
import { Check, Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from '../../lib/auth';

const YearProgress = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeapYear ? 366 : 365;
  const daysPassed = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const daysLeft = daysInYear - daysPassed;

  const startDayOfWeek = startOfYear.getDay();
  const totalCells = startDayOfWeek + daysInYear;
  
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isExpanded && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [isExpanded]);
  
  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 w-full max-w-full overflow-hidden transition-all">
      <div 
        className="flex justify-between items-center cursor-pointer group" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Year Progress</h2>
          <p className="text-gray-500 text-sm mt-1">{daysLeft} days left in {year}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round((daysPassed / daysInYear) * 100)}%
          </div>
          <div className={`p-1.5 rounded-full bg-gray-50 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 mt-5 pt-5">
              <div ref={scrollRef} className="overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2 w-full snap-x">
                <div 
                  className="grid gap-1 min-w-max pr-4" 
                  style={{ 
                    gridTemplateRows: 'repeat(7, 1fr)', 
                    gridAutoFlow: 'column',
                    gridAutoColumns: '12px' 
                  }}
                >
                  {Array.from({ length: totalCells }).map((_, i) => {
                    if (i < startDayOfWeek) {
                      return <div key={`empty-${i}`} className="w-3 h-3 rounded-sm bg-transparent" />;
                    }
                    const dayOfYear = i - startDayOfWeek;
                    let bgColor = "bg-gray-100"; // future
                    if (dayOfYear < daysPassed) bgColor = "bg-green-400"; // passed
                    else if (dayOfYear === daysPassed) bgColor = "bg-blue-500 animate-pulse shadow-sm shadow-blue-300"; // today
                    
                    return (
                      <div 
                        key={`day-${dayOfYear}`} 
                        className={`w-3 h-3 rounded-sm ${bgColor} transition-colors hover:opacity-80 snap-center`}
                        title={`Day ${dayOfYear + 1} of ${daysInYear}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CreateGoalForm = ({ onSuccess, onCancel }: { onSuccess: (goal: any) => void, onCancel: () => void }) => {
  const { mutateAsync: createGoal, isPending } = useCreateGoal();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [totalHours, setTotalHours] = useState('');
  const [targetDate, setTargetDate] = useState(new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newGoal = await createGoal({ 
        title, 
        description, 
        year: Number(year), 
        totalHours: totalHours ? Number(totalHours) : undefined,
        targetDate 
      });
      onSuccess(newGoal);
    } catch (error) {
      console.error('Failed to create goal', error);
    }
  };

  return (
    <motion.form 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
      onSubmit={handleSubmit}
    >
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6 flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
          <input 
            required
            type="text" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="E.g., Read 20 books"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Year</label>
            <input 
              required
              type="number" 
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Hours</label>
            <input 
              type="number" 
              value={totalHours}
              onChange={e => setTotalHours(e.target.value)}
              placeholder="e.g. 100"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
            <input 
              required
              type="date" 
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="flex gap-3 mt-2">
          <button 
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isPending || !title.trim()}
            className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {isPending ? 'Creating...' : 'Create Goal'}
          </button>
        </div>
      </div>
    </motion.form>
  );
};

const GoalItem = ({ goal }: { goal: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: milestones } = useMilestones(goal.id);
  const { mutate: updateMilestone } = useUpdateMilestone(goal.id);
  const { mutate: createMilestone, isPending: creatingMilestone } = useCreateMilestone();
  
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');

  const progress = calculateGoalProgress(milestones || []);
  
  const now = new Date();
  const targetDate = new Date(goal.targetDate);
  const timeDiff = targetDate.getTime() - now.getTime();
  const daysRemaining = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
  
  let hoursPerDayInfo = null;
  if (goal.totalHours) {
    const remainingHours = goal.totalHours * (1 - progress / 100);
    const hoursPerDay = remainingHours / daysRemaining;
    hoursPerDayInfo = `${hoursPerDay.toFixed(1)} hrs/day`;
  }

  const toggleMilestone = (milestoneId: string, currentStatus: string) => {
    updateMilestone({
      id: milestoneId,
      status: currentStatus === 'completed' ? 'pending' : 'completed',
    });
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;
    createMilestone({ goalId: goal.id, title: newMilestoneTitle }, {
      onSuccess: () => setNewMilestoneTitle('')
    });
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all">
      <div 
        className="flex justify-between items-start cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{goal.title}</h3>
            {hoursPerDayInfo && (
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full bg-blue-100 text-blue-700">
                {hoursPerDayInfo}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{goal.description}</p>
        </div>
        <div className="flex flex-col items-end shrink-0 ml-4">
          <span className="text-2xl font-bold text-blue-600">{progress}%</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', bounce: 0, duration: 1 }}
          className="bg-blue-600 h-full rounded-full"
        />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-6"
          >
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Checkpoints</h4>
              
              <div className="flex flex-col gap-2 mb-4">
                {milestones?.map(milestone => {
                  const isCompleted = milestone.status === 'completed';
                  return (
                    <div 
                      key={milestone.id}
                      onClick={() => toggleMilestone(milestone.id, milestone.status)}
                      className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${isCompleted ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                        {isCompleted && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                        {milestone.title}
                      </span>
                    </div>
                  )
                })}
                {milestones?.length === 0 && (
                  <div className="text-center py-4 text-sm text-gray-500">
                    No checkpoints yet. Break it down!
                  </div>
                )}
              </div>

              <form onSubmit={handleAddMilestone} className="flex gap-2">
                <input 
                  type="text"
                  value={newMilestoneTitle}
                  onChange={e => setNewMilestoneTitle(e.target.value)}
                  placeholder="Add a checkpoint..."
                  className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
                <button 
                  type="submit"
                  disabled={!newMilestoneTitle.trim() || creatingMilestone}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DashboardScreen = () => {
  const { user } = useAuth();
  const { data: goals, isLoading } = useGoals();
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/sign-in';
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pt-4 md:pt-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Good morning, {user?.name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-gray-500 mt-2">Let's make every day count.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            {user?.image ? (
              <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {user?.name?.charAt(0) || user?.email?.charAt(0)}
              </div>
            )}
            <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
            <button 
              onClick={handleSignOut}
              className="text-xs text-red-500 hover:text-red-700 ml-2 font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      
      <YearProgress />
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Goals</h2>
        <button 
          onClick={() => setIsCreatingGoal(!isCreatingGoal)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200"
        >
          {isCreatingGoal ? 'Close' : 'New Goal'}
        </button>
      </div>

      <AnimatePresence>
        {isCreatingGoal && (
          <CreateGoalForm 
            onCancel={() => setIsCreatingGoal(false)}
            onSuccess={() => setIsCreatingGoal(false)}
          />
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="grid gap-4">
          <div className="animate-pulse bg-gray-200 h-32 rounded-3xl"></div>
          <div className="animate-pulse bg-gray-200 h-32 rounded-3xl"></div>
        </div>
      ) : goals?.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-xl font-semibold text-gray-800">No goals yet</h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            You haven't set any goals for this year. Click "New Goal" to get started and break it down into 365 daily milestones!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {goals?.map(goal => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  );
};
