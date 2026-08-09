import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { auth } from './auth/auth.js'

export const app = new Hono().basePath('/api/v1')

app.get('/', (c) => {
  return c.text('365 Goals API')
})

app.on(['POST', 'GET'], '/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

export const GET = handle(app)
export const POST = handle(app)
export default app
