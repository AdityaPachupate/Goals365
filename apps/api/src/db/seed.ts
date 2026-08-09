import { db } from './client.js';
import { goals, milestones } from './schema.js';

async function seed() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Seed script should not be run in production');
  }

  const fakeUserId = 'fake-user-123';
  
  const [goal1] = await db.insert(goals).values({
    userId: fakeUserId,
    title: 'Run a marathon',
    description: 'Complete the City Marathon this year.',
    year: new Date().getFullYear(),
    targetDate: new Date(`${new Date().getFullYear()}-11-01`),
  }).returning();

  await db.insert(milestones).values([
    {
      goalId: goal1.id,
      title: 'Buy running shoes',
      sortOrder: 1,
    },
    {
      goalId: goal1.id,
      title: 'Run 10k',
      sortOrder: 2,
    }
  ]);

  console.log('Seed completed successfully.');
}

seed().catch(console.error);
