import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateGoal } from './queries';
import { ArrowLeft } from 'lucide-react';

export const CreateGoalScreen = () => {
  const navigate = useNavigate();
  const { mutateAsync: createGoal, isPending } = useCreateGoal();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [targetDate, setTargetDate] = useState(new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newGoal = await createGoal({ title, description, year: Number(year), targetDate });
      navigate(`/goals/${newGoal.id}`);
    } catch (error) {
      console.error('Failed to create goal', error);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create New Goal</h1>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5">
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
        
        <div className="grid grid-cols-2 gap-4">
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
        
        <button 
          type="submit"
          disabled={isPending || !title.trim()}
          className="mt-4 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {isPending ? 'Creating...' : 'Create Goal'}
        </button>
      </form>
    </div>
  );
};
