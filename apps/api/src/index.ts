import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/vercel'
import { auth } from './auth/auth.js'
import { serve } from '@hono/node-server'
import type { AppEnv } from './types.js'

export const app = new Hono<AppEnv>().basePath('/api/v1')

app.use('*', cors({
  origin: (origin) => origin || 'http://localhost:5173',
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/', (c) => {
  return c.text('365 Goals API')
})

// Keep-alive endpoint for cron jobs (Render free tier)
app.get('/ping', (c) => {
  return c.text('pong')
})

app.on(['POST', 'GET'], '/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

import { goalsRouter } from './routes/goals.js'
import { milestonesRouter } from './routes/milestones.js'
app.route('/goals', goalsRouter)
app.route('/milestones', milestonesRouter)

const port = parseInt(process.env.PORT || '3000', 10)
console.log(`Starting server on port ${port}...`)
serve({
  fetch: app.fetch,
  port
})

export const GET = handle(app)
export const POST = handle(app)
export default app
