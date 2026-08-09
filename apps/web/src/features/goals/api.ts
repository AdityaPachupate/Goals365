import type { Goal } from '@365-goals/shared';

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'API request failed');
  }
  return res.json();
};

export const getGoals = async (): Promise<Goal[]> => {
  const data = await handleResponse(await fetch('/api/v1/goals'));
  return data.goals;
};

export const getGoal = async (id: string): Promise<Goal> => {
  const data = await handleResponse(await fetch(`/api/v1/goals/${id}`));
  return data.goal;
};

export const createGoal = async (goal: Partial<Goal>): Promise<Goal> => {
  const data = await handleResponse(await fetch('/api/v1/goals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  }));
  return data.goal;
};

export const updateGoal = async ({ id, ...updates }: { id: string } & Partial<Goal>): Promise<Goal> => {
  const data = await handleResponse(await fetch(`/api/v1/goals/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  }));
  return data.goal;
};

export const deleteGoal = async (id: string): Promise<void> => {
  await handleResponse(await fetch(`/api/v1/goals/${id}`, { method: 'DELETE' }));
};
