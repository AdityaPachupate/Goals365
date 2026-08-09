import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { db } from '../db/client.js';
import { milestones, goals } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { requireSession } from '../auth/middleware.js';
import { CreateMilestoneSchema, UpdateMilestoneSchema } from '@365-goals/shared';
import type { AppEnv } from '../types.js';

export const milestonesRouter = new Hono<AppEnv>();

milestonesRouter.use('*', requireSession);

// GET /milestones?goalId=123
milestonesRouter.get('/', async (c) => {
  const userId = c.get('userId');
  const goalId = c.req.query('goalId');
  
  if (!goalId) {
    return c.json({ error: 'goalId is required' }, 400);
  }
  
  // Verify goal ownership
  const [goal] = await db.select().from(goals).where(and(eq(goals.id, goalId), eq(goals.userId, userId)));
  if (!goal) {
    return c.json({ error: 'Goal not found' }, 404);
  }
  
  const goalMilestones = await db.select().from(milestones)
    .where(eq(milestones.goalId, goalId))
    .orderBy(milestones.sortOrder);
    
  return c.json({ milestones: goalMilestones });
});

// POST /milestones
milestonesRouter.post('/', zValidator('json', CreateMilestoneSchema), async (c) => {
  const userId = c.get('userId');
  const body = c.req.valid('json');
  
  // Verify goal ownership
  const [goal] = await db.select().from(goals).where(and(eq(goals.id, body.goalId), eq(goals.userId, userId)));
  if (!goal) {
    return c.json({ error: 'Goal not found' }, 404);
  }
  
  const [newMilestone] = await db.insert(milestones).values({
    goalId: body.goalId,
    title: body.title,
    sortOrder: body.sortOrder ?? 0,
  }).returning();
  
  return c.json({ milestone: newMilestone }, 201);
});

// PATCH /milestones/:id
milestonesRouter.patch('/:id', zValidator('json', UpdateMilestoneSchema), async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  const body = c.req.valid('json');
  
  // Find milestone and join goal to verify ownership
  const [existing] = await db
    .select({ milestone: milestones, goal: goals })
    .from(milestones)
    .innerJoin(goals, eq(milestones.goalId, goals.id))
    .where(and(eq(milestones.id, id), eq(goals.userId, userId)));
    
  if (!existing) {
    return c.json({ error: 'Milestone not found' }, 404);
  }

  const updateData: any = { updatedAt: new Date() };
  if (body.title !== undefined) updateData.title = body.title;
  if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder;
  if (body.status !== undefined) {
    updateData.status = body.status;
    if (body.status === 'completed' && existing.milestone.status !== 'completed') {
      updateData.completedAt = new Date();
    } else if (body.status === 'pending' && existing.milestone.status !== 'pending') {
      updateData.completedAt = null;
    }
  }

  const [updated] = await db.update(milestones)
    .set(updateData)
    .where(eq(milestones.id, id))
    .returning();
    
  return c.json({ milestone: updated });
});

// DELETE /milestones/:id
milestonesRouter.delete('/:id', async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  
  // Find milestone and join goal to verify ownership
  const [existing] = await db
    .select({ milestone: milestones, goal: goals })
    .from(milestones)
    .innerJoin(goals, eq(milestones.goalId, goals.id))
    .where(and(eq(milestones.id, id), eq(goals.userId, userId)));
    
  if (!existing) {
    return c.json({ error: 'Milestone not found' }, 404);
  }
  
  const [deleted] = await db.delete(milestones)
    .where(eq(milestones.id, id))
    .returning();
    
  return c.json({ success: true, milestone: deleted });
});
