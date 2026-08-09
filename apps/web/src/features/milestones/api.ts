import type { Milestone } from '@365-goals/shared';

const API_BASE = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173');

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'API request failed');
  }
  return res.json();
};

export const getMilestones = async (goalId: string): Promise<Milestone[]> => {
  const data = await handleResponse(await fetch(`${API_BASE}/api/v1/milestones?goalId=${goalId}`, { credentials: 'include' }));
  return data.milestones;
};

export const createMilestone = async (milestone: Partial<Milestone>): Promise<Milestone> => {
  const data = await handleResponse(await fetch(`${API_BASE}/api/v1/milestones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(milestone),
    credentials: 'include'
  }));
  return data.milestone;
};

export const updateMilestone = async ({ id, ...updates }: { id: string } & Partial<Milestone>): Promise<Milestone> => {
  const data = await handleResponse(await fetch(`${API_BASE}/api/v1/milestones/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
    credentials: 'include'
  }));
  return data.milestone;
};

export const deleteMilestone = async (id: string): Promise<void> => {
  await handleResponse(await fetch(`${API_BASE}/api/v1/milestones/${id}`, { method: 'DELETE', credentials: 'include' }));
};
