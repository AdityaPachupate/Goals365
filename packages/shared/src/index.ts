import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  timezone: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const GoalSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  year: z.number().int(),
  targetDate: z.string(),
  status: z.enum(['active', 'completed', 'archived']),
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.string().nullable(),
  archivedAt: z.string().nullable(),
});

export type Goal = z.infer<typeof GoalSchema>;

export const MilestoneSchema = z.object({
  id: z.string().uuid(),
  goalId: z.string().uuid(),
  title: z.string().min(1).max(200),
  sortOrder: z.number().int(),
  status: z.enum(['pending', 'completed']),
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.string().nullable(),
});

export type Milestone = z.infer<typeof MilestoneSchema>;

export const CreateGoalSchema = GoalSchema.pick({
  title: true,
  description: true,
  year: true,
  targetDate: true,
});

export const UpdateGoalSchema = CreateGoalSchema.partial().extend({
  status: GoalSchema.shape.status.optional(),
});

export const CreateMilestoneSchema = z.object({
  goalId: z.string().uuid(),
  title: z.string().min(1).max(200),
  sortOrder: z.number().int().optional(),
});

export const UpdateMilestoneSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  sortOrder: z.number().int().optional(),
  status: z.enum(['pending', 'completed']).optional(),
});
