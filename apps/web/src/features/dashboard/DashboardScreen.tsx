import React, { useState } from 'react';
import { useAuth } from '../../app/providers/AuthProvider';
import { useGoals, useCreateGoal, useUpdateGoal, useDeleteGoal } from '../goals/queries';
import { useMilestones, useUpdateMilestone, useCreateMilestone, useDeleteMilestone } from '../milestones/queries';
import { calculateGoalProgress } from '@365-goals/shared';
import { motion } from 'framer-motion';
import { signOut } from '../../lib/auth';

const YearProgress = ({ goals }: { goals: any[] }) => {
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [selectedDateGoals, setSelectedDateGoals] = useState<{date: Date, goals: any[]} | null>(null);

  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeapYear ? 366 : 365;
  const daysPassed = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const daysLeft = daysInYear - daysPassed;
  const percent = ((daysPassed / daysInYear) * 100).toFixed(1);

  const days = Array.from({ length: daysInYear }, (_, i) => new Date(year, 0, i + 1));

  const getGoalsForDate = (date: Date) => {
    if (!goals) return [];
    return goals.filter(g => {
       if(!g.targetDate) return false;
       const d = new Date(g.targetDate);
       return d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate();
    });
  };

  return (
    <details 
      className="bg-surface-container-lowest rounded-xl group border border-surface-container-highest shadow-[0_4px_20px_0_rgba(0,0,0,0.04)] [&_summary::-webkit-details-marker]:hidden"
      open={isGridOpen}
      onToggle={(e) => setIsGridOpen(e.currentTarget.open)}
    >
      <summary className="p-6 cursor-pointer list-none flex flex-col items-center justify-center text-center outline-none relative">
        <div className="absolute right-6 top-6">
          <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors group-open:rotate-180">
            expand_more
          </span>
        </div>
        <div className="mb-4 text-center font-headline-sm text-on-surface-variant flex items-center justify-center gap-1 md:gap-2 whitespace-nowrap overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="font-display-countdown text-[24px] md:text-[48px] font-bold text-primary leading-none"
          >
            {daysLeft}
          </motion.span>
          <span className="text-[11px] md:text-base pt-1 md:pt-2">days left this year,</span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
            className="font-display-countdown text-[24px] md:text-[48px] font-bold text-primary leading-none"
          >
            {daysPassed}
          </motion.span>
          <span className="text-[11px] md:text-base pt-1 md:pt-2">past</span>
        </div>
        <div className="w-full max-w-md mt-2 mx-auto flex items-center gap-4">
          <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden w-full flex-1 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="font-label-md text-label-md text-primary font-bold shrink-0">{percent}%</span>
        </div>
      </summary>

      <div className="px-6 pb-6 pt-6 border-t border-surface-container-highest flex flex-col gap-5 animate-[fadeIn_0.2s_ease-out]">
        <div className="w-full overflow-x-auto py-2 custom-scrollbar">
          <div className="grid grid-rows-7 grid-flow-col gap-1 w-max mx-auto">
            {days.map((date, i) => {
              const goalsOnDate = getGoalsForDate(date);
              const hasGoal = goalsOnDate.length > 0;
              const isPast = date < new Date(now.getFullYear(), now.getMonth(), now.getDate());
              const isToday = date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();

              const pastelColors = [
                "bg-blue-100 dark:bg-blue-900/30",
                "bg-pink-100 dark:bg-pink-900/30",
                "bg-green-100 dark:bg-green-900/30",
                "bg-yellow-100 dark:bg-yellow-900/30",
                "bg-purple-100 dark:bg-purple-900/30",
                "bg-orange-100 dark:bg-orange-900/30",
                "bg-rose-100 dark:bg-rose-900/30",
                "bg-teal-100 dark:bg-teal-900/30",
                "bg-indigo-100 dark:bg-indigo-900/30",
                "bg-fuchsia-100 dark:bg-fuchsia-900/30",
                "bg-cyan-100 dark:bg-cyan-900/30",
                "bg-red-100 dark:bg-red-900/30"
              ];

              const darkColors = [
                "bg-blue-400 dark:bg-blue-600/50",
                "bg-pink-400 dark:bg-pink-600/50",
                "bg-green-400 dark:bg-green-600/50",
                "bg-yellow-400 dark:bg-yellow-600/50",
                "bg-purple-400 dark:bg-purple-600/50",
                "bg-orange-400 dark:bg-orange-600/50",
                "bg-rose-400 dark:bg-rose-600/50",
                "bg-teal-400 dark:bg-teal-600/50",
                "bg-indigo-400 dark:bg-indigo-600/50",
                "bg-fuchsia-400 dark:bg-fuchsia-600/50",
                "bg-cyan-400 dark:bg-cyan-600/50",
                "bg-red-400 dark:bg-red-600/50"
              ];

              let bgColor = pastelColors[date.getMonth()];
              if (isPast && !hasGoal) bgColor = darkColors[date.getMonth()];
              if (isToday) bgColor = "bg-primary text-on-primary font-bold border-2 border-surface-container-lowest";
              if (hasGoal) bgColor = "bg-error cursor-pointer";

              return (
                <div 
                  key={i} 
                  title={hasGoal ? goalsOnDate.map(g => g.title).join('\n') : date.toDateString()}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${bgColor} hover:opacity-80 transition-opacity`}
                  onClick={(e) => {
                    if (hasGoal) {
                      e.stopPropagation();
                      setSelectedDateGoals({ date, goals: goalsOnDate });
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-4 text-xs text-on-surface-variant flex-wrap">
           <div className="flex items-center gap-1">
             <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(to right, #60a5fa, #f472b6, #4ade80)' }}></div> Past
           </div>
           <div className="flex items-center gap-1">
             <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(to right, #dbeafe, #fce7f3, #dcfce7)' }}></div> Future
           </div>
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-primary rounded-sm"></div> Today</div>
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-error rounded-sm"></div> Deadline</div>
        </div>

        {selectedDateGoals && (
          <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg animate-[fadeIn_0.2s_ease-out]">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-label-md text-error">Deadlines on {selectedDateGoals.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</h4>
              <button onClick={() => setSelectedDateGoals(null)} className="text-error hover:opacity-70">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <ul className="list-disc pl-5 text-on-surface font-body-md flex flex-col gap-1">
              {selectedDateGoals.goals.map(g => (
                <li key={g.id}>{g.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </details>
  );
};

const CreateGoalForm = ({ isOpen, onToggle, onSuccess, onCancel }: { isOpen: boolean, onToggle: (open: boolean) => void, onSuccess: (goal: any) => void, onCancel: () => void }) => {
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
    <details 
      open={isOpen}
      onToggle={(e) => onToggle(e.currentTarget.open)}
      className="bg-surface-container-lowest rounded-xl group relative transition-all duration-300 border border-surface-container-highest shadow-[0_4px_20px_0_rgba(0,0,0,0.04)] [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="p-4 cursor-pointer list-none flex justify-between items-center outline-none">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary group-open:hidden">add_circle</span>
          <span className="material-symbols-outlined text-primary hidden group-open:inline-block">edit_square</span>
          <h3 className="font-headline-md text-headline-md text-on-surface group-open:text-primary">
            {isOpen ? 'Creating New Goal' : 'Create New Goal'}
          </h3>
        </div>
        <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors group-open:rotate-180">
          expand_more
        </span>
      </summary>

      <div className="px-4 pb-4 pt-2 border-t border-surface-container-highest flex flex-col gap-5 animate-[fadeIn_0.2s_ease-out]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-1">Goal Title</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="E.g., Read 20 books"
              className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md text-body-md bg-white text-on-background"
            />
          </div>
          
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-1">Description (Optional)</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md text-body-md bg-white text-on-background"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Target Year</label>
              <input 
                required
                type="number" 
                value={year}
                onChange={e => setYear(Number(e.target.value))}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md text-body-md bg-white text-on-background"
              />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Total Hours</label>
              <input 
                type="number" 
                value={totalHours}
                onChange={e => setTotalHours(e.target.value)}
                placeholder="e.g. 100"
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md text-body-md bg-white text-on-background"
              />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Target Date</label>
              <input 
                required
                type="date" 
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                className="w-full px-4 py-2 border border-outline-variant/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md text-body-md bg-white text-on-background"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-2">
            <button 
              type="button"
              onClick={onCancel}
              className="flex-1 h-12 bg-surface-container text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-highest active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isPending || !title.trim()}
              className="flex-1 h-12 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {isPending ? 'Creating...' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </details>
  );
};

const GoalItem = ({ goal }: { goal: any }) => {
  const { data: milestones } = useMilestones(goal.id);
  const { mutate: updateMilestone } = useUpdateMilestone(goal.id);
  const { mutate: createMilestone, isPending: creatingMilestone } = useCreateMilestone();
  const { mutate: deleteMilestone } = useDeleteMilestone(goal.id);
  const { mutate: updateGoal, isPending: isUpdatingGoal } = useUpdateGoal();
  const { mutate: deleteGoal, isPending: isDeletingGoal } = useDeleteGoal();
  
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [editDate, setEditDate] = useState(goal.targetDate ? new Date(goal.targetDate).toISOString().split('T')[0] : '');

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
    <details className="bg-surface-container-lowest rounded-xl group relative hover:-translate-y-1 transition-all duration-300 border border-surface-container-highest shadow-[0_4px_20px_0_rgba(0,0,0,0.04)] [&_summary::-webkit-details-marker]:hidden">
      <summary className="p-4 cursor-pointer list-none flex flex-col outline-none">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="font-headline-md text-headline-md text-on-surface group-open:text-primary line-clamp-2">
              {goal.title}
            </h3>
            {hoursPerDayInfo && (
              <span className="bg-primary-container/10 text-primary px-2 py-1 rounded font-label-sm text-label-sm uppercase tracking-wider inline-block w-fit mt-1">
                {hoursPerDayInfo}
              </span>
            )}
          </div>
          <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors group-open:rotate-180 ml-4 shrink-0 mt-1">
            expand_more
          </span>
        </div>
        
        <div className="w-full group-open:hidden flex items-center gap-3 mt-2">
          <div className="h-2 bg-surface-container-high rounded-full overflow-hidden flex-1 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-label-sm text-label-sm text-primary font-bold shrink-0">{progress}%</span>
        </div>
      </summary>
      
      <div className="px-4 pb-4 pt-2 border-t border-surface-container-highest flex flex-col gap-4 animate-[fadeIn_0.2s_ease-out]">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-2 bg-surface-container-high rounded-full overflow-hidden flex-1 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-label-sm text-label-sm text-primary font-bold shrink-0">{progress}%</span>
          </div>
        </div>
        <div>
          <h4 className="font-label-md text-label-md text-on-surface-variant mb-2 mt-4">Milestones</h4>
          <ul className="flex flex-col gap-2">
            {milestones?.map(milestone => {
              const isCompleted = milestone.status === 'completed';
              return (
                <li 
                  key={milestone.id} 
                  className="flex items-center gap-2 hover:bg-surface-container-low p-1 rounded transition-colors group/milestone" 
                >
                  <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => toggleMilestone(milestone.id, milestone.status)}>
                    <span className={`material-symbols-outlined ${isCompleted ? 'text-primary' : 'text-outline-variant'} text-[20px]`}>
                      {isCompleted ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className={`font-body-md text-body-md ${isCompleted ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>
                      {milestone.title}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteMilestone(milestone.id); }}
                    className="opacity-0 group-hover/milestone:opacity-100 text-error p-1 rounded hover:bg-error/10 transition-all shrink-0 flex items-center justify-center"
                    title="Delete Milestone"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </li>
              );
            })}
          </ul>
          
          <form onSubmit={handleAddMilestone} className="flex gap-2 mt-4">
            <input 
              type="text"
              value={newMilestoneTitle}
              onChange={e => setNewMilestoneTitle(e.target.value)}
              placeholder="Add a milestone..."
              className="flex-1 px-3 py-2 font-body-md text-body-md bg-surface-container-low border border-surface-container-highest rounded-lg focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all text-on-background"
            />
            <button 
              type="submit"
              disabled={!newMilestoneTitle.trim() || creatingMilestone}
              className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary rounded-lg hover:opacity-90 disabled:opacity-50 transition-all shrink-0"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </form>
        </div>
        
        <div className="flex justify-between items-center text-on-surface-variant mt-2 pt-4 border-t border-surface-container-highest flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span> 
            <input 
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="px-2 py-1 bg-surface-container-low border border-surface-container-highest rounded font-body-sm text-on-surface outline-none focus:border-primary"
            />
            <button 
              onClick={() => updateGoal({ id: goal.id, targetDate: editDate })}
              disabled={isUpdatingGoal || editDate === new Date(goal.targetDate).toISOString().split('T')[0]}
              className="px-3 py-1 bg-primary/10 text-primary rounded-md font-label-md hover:bg-primary/20 transition-colors disabled:opacity-50"
            >
              Update
            </button>
          </div>
          <button 
            onClick={() => deleteGoal(goal.id)}
            disabled={isDeletingGoal}
            className="px-3 py-1 bg-error/10 text-error rounded-md font-label-md hover:bg-error/20 transition-colors disabled:opacity-50 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            Delete Goal
          </button>
        </div>
      </div>
    </details>
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

  const completedGoals = goals?.filter(g => g.status === 'completed').length || 0;
  // Approximation for UI
  const activeGoals = goals?.filter(g => g.status === 'active') || [];
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <>
      <header className="max-w-[1200px] mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop py-stack-md w-full">
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant">{getGreeting()}, {user?.name?.split(' ')[0] || 'there'}</p>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mt-1">
            {new Date().getFullYear()}
          </h1>
        </div>
        <div className="flex items-center gap-gutter">
          {user?.image ? (
            <img src={user.image} alt="Profile" className="w-10 h-10 rounded-full object-cover shadow-sm" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold">
              {user?.name?.charAt(0) || user?.email?.charAt(0)}
            </div>
          )}
          <button 
            onClick={handleSignOut}
            className="text-error font-label-md text-label-md hover:opacity-80 transition-opacity"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop w-full flex flex-col gap-stack-lg mt-stack-md pb-24">
        <YearProgress goals={goals || []} />
        
        <div className="flex flex-col gap-stack-lg w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-surface-container-highest">
            <h2 className="text-3xl md:text-4xl font-black text-on-background tracking-tight flex items-center gap-2">
              Your {new Date().getFullYear()} Goals ✨
            </h2>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="font-label-md text-label-md text-on-surface-variant">Total:</span>
                <span className="font-label-md text-label-md font-bold text-primary">{goals?.length || 0}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="font-label-md text-label-md text-on-surface-variant">Completed:</span>
                <span className="font-label-md text-label-md font-bold text-on-background">{completedGoals}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                <span className="font-label-md text-label-md text-on-surface-variant">Active:</span>
                <span className="font-label-md text-label-md font-bold text-on-background">{activeGoals.length}</span>
              </div>
            </div>
          </div>
          
          <section className="flex flex-col gap-stack-md w-full">
            <CreateGoalForm 
              isOpen={isCreatingGoal}
              onToggle={setIsCreatingGoal}
              onCancel={() => setIsCreatingGoal(false)}
              onSuccess={() => setIsCreatingGoal(false)}
            />
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="animate-pulse bg-surface-container h-40 rounded-xl"></div>
                <div className="animate-pulse bg-surface-container h-40 rounded-xl"></div>
              </div>
            ) : goals?.length === 0 ? (
              <div className="bg-surface-container-lowest p-12 rounded-xl border border-surface-container-highest shadow-sm text-center">
                <h3 className="font-headline-md text-headline-md text-on-surface">No goals yet</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-md mx-auto">
                  You haven't set any goals for this year. Click "New Goal" to get started!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {goals?.map(goal => (
                  <GoalItem key={goal.id} goal={goal} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

    </>
  );
};
