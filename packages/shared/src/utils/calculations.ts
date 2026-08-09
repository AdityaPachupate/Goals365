import type { Goal, Milestone } from '../index';

/**
 * Calculates the progress percentage of a goal based on completed milestones.
 * Returns a number between 0 and 100.
 */
export function calculateGoalProgress(milestones: Milestone[]): number {
  if (!milestones || milestones.length === 0) return 0;
  
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  return Math.round((completedCount / milestones.length) * 100);
}

/**
 * Calculates the days remaining until the target date.
 */
export function calculateDaysRemaining(targetDate: string | Date, now: Date = new Date()): number {
  const target = new Date(targetDate);
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

/**
 * Determines if a goal is "on track" based on time elapsed versus progress made.
 * A goal is considered on track if its progress percentage is greater than or
 * within 10% of the time elapsed percentage.
 */
export function isGoalOnTrack(
  goal: Goal,
  milestones: Milestone[],
  now: Date = new Date()
): boolean {
  if (goal.status === 'completed') return true;
  if (goal.status === 'archived') return false;
  
  const progress = calculateGoalProgress(milestones); // 0-100
  
  const startDate = new Date(goal.year, 0, 1); // January 1st of the goal's year
  const targetDate = new Date(goal.targetDate);
  
  const totalDuration = targetDate.getTime() - startDate.getTime();
  const timeElapsed = now.getTime() - startDate.getTime();
  
  if (totalDuration <= 0) return false;
  
  // Cap expected progress at 100%
  const expectedProgress = Math.min(Math.round((timeElapsed / totalDuration) * 100), 100);
  
  // If actual progress is within 10% of expected progress, it's on track
  return progress >= (expectedProgress - 10);
}
