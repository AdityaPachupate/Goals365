import type { Goal } from '@365-goals/shared';

const API_BASE = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173');

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'API request failed');
  }
  return res.json();
};

export const getGoals = async (): Promise<Goal[]> => {
  const data = await handleResponse(await fetch(`${API_BASE}/api/v1/goals`, { credentials: 'include' }));
  return data.goals;
};

export const getGoal = async (id: string): Promise<Goal> => {
  const data = await handleResponse(await fetch(`${API_BASE}/api/v1/goals/${id}`, { credentials: 'include' }));
  return data.goal;
};

export const createGoal = async (goal: Partial<Goal>): Promise<Goal> => {
  const data = await handleResponse(await fetch(`${API_BASE}/api/v1/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
    credentials: 'include'
  }));
  return data.goal;
};

export const updateGoal = async ({ id, ...updates }: { id: string } & Partial<Goal>): Promise<Goal> => {
  const data = await handleResponse(await fetch(`${API_BASE}/api/v1/goals/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
    credentials: 'include'
  }));
  return data.goal;
};

export const deleteGoal = async (id: string): Promise<void> => {
  await handleResponse(await fetch(`${API_BASE}/api/v1/goals/${id}`, { method: 'DELETE', credentials: 'include' }));
};
