import { createMiddleware } from 'hono/factory';
import { auth } from './auth.js';

export const requireSession = createMiddleware(async (c, next) => {
    const session = await auth.api.getSession({
        headers: c.req.raw.headers
    });
    
    if (!session) {
        return c.json({ error: 'UNAUTHENTICATED' }, 401);
    }
    
    c.set('userId', session.user.id);
    c.set('session', session);
    await next();
});
