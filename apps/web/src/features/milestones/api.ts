import type { Milestone } from '@365-goals/shared';

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'API request failed');
  }
  return res.json();
};

export const getMilestones = async (goalId: string): Promise<Milestone[]> => {
  const data = await handleResponse(await fetch(`/api/v1/milestones?goalId=${goalId}`));
  return data.milestones;
};

export const createMilestone = async (milestone: Partial<Milestone>): Promise<Milestone> => {
  const data = await handleResponse(await fetch('/api/v1/milestones', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(milestone),
  }));
  return data.milestone;
};

export const updateMilestone = async ({ id, ...updates }: { id: string } & Partial<Milestone>): Promise<Milestone> => {
  const data = await handleResponse(await fetch(`/api/v1/milestones/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  }));
  return data.milestone;
};

export const deleteMilestone = async (id: string): Promise<void> => {
  await handleResponse(await fetch(`/api/v1/milestones/${id}`, { method: 'DELETE' }));
};
