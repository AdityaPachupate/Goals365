import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { db } from '../db/client.js';
import { goals } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { requireSession } from '../auth/middleware.js';
import { CreateGoalSchema, UpdateGoalSchema } from '@365-goals/shared';

export const goalsRouter = new Hono();

// Require authentication for all goal routes
goalsRouter.use('*', requireSession);

// GET /goals - List all goals for the current user
goalsRouter.get('/', async (c) => {
  const userId = c.get('userId');
  const userGoals = await db.select().from(goals).where(eq(goals.userId, userId));
  return c.json({ goals: userGoals });
});

// GET /goals/:id - Get a specific goal
goalsRouter.get('/:id', async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  
  const [goal] = await db.select().from(goals).where(and(eq(goals.id, id), eq(goals.userId, userId)));
  
  if (!goal) {
    return c.json({ error: 'Goal not found' }, 404);
  }
  
  return c.json({ goal });
});

// POST /goals - Create a new goal
goalsRouter.post('/', zValidator('json', CreateGoalSchema), async (c) => {
  const userId = c.get('userId');
  const body = c.req.valid('json');
  
  const [newGoal] = await db.insert(goals).values({
    userId,
    title: body.title,
    description: body.description,
    year: body.year,
    targetDate: new Date(body.targetDate),
  }).returning();
  
  return c.json({ goal: newGoal }, 201);
});

// PATCH /goals/:id - Update a goal
goalsRouter.patch('/:id', zValidator('json', UpdateGoalSchema), async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  const body = c.req.valid('json');
  
  // Verify ownership
  const [existingGoal] = await db.select().from(goals).where(and(eq(goals.id, id), eq(goals.userId, userId)));
  if (!existingGoal) {
    return c.json({ error: 'Goal not found' }, 404);
  }

  const updateData: any = { updatedAt: new Date() };
  if (body.title !== undefined) updateData.title = body.title;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.year !== undefined) updateData.year = body.year;
  if (body.targetDate !== undefined) updateData.targetDate = new Date(body.targetDate);
  if (body.status !== undefined) {
    updateData.status = body.status;
    if (body.status === 'completed' && existingGoal.status !== 'completed') {
      updateData.completedAt = new Date();
    } else if (body.status === 'archived' && existingGoal.status !== 'archived') {
      updateData.archivedAt = new Date();
    }
  }

  const [updatedGoal] = await db.update(goals)
    .set(updateData)
    .where(and(eq(goals.id, id), eq(goals.userId, userId)))
    .returning();
    
  return c.json({ goal: updatedGoal });
});

// DELETE /goals/:id - Delete a goal
goalsRouter.delete('/:id', async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  
  const [deletedGoal] = await db.delete(goals)
    .where(and(eq(goals.id, id), eq(goals.userId, userId)))
    .returning();
    
  if (!deletedGoal) {
    return c.json({ error: 'Goal not found' }, 404);
  }
  
  return c.json({ success: true, goal: deletedGoal });
});
