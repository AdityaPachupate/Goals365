import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { auth } from './auth/auth.js'
import { serve } from '@hono/node-server'
import type { AppEnv } from './types.js'

export const app = new Hono<AppEnv>().basePath('/api/v1')

app.get('/', (c) => {
  return c.text('365 Goals API')
})

app.on(['POST', 'GET'], '/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

import { goalsRouter } from './routes/goals.js'
import { milestonesRouter } from './routes/milestones.js'
app.route('/goals', goalsRouter)
app.route('/milestones', milestonesRouter)

if (process.env.NODE_ENV !== 'production') {
  console.log('Starting local development server on http://localhost:3000')
  serve({
    fetch: app.fetch,
    port: 3000
  })
}

export const GET = handle(app)
export const POST = handle(app)
export default app
