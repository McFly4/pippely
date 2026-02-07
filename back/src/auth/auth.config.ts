import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

// Cache pour l'instance Better Auth
let authInstance: any = null;

/**
 * Initialise Better Auth avec un import dynamique (ESM)
 * Better Auth est un module ESM pur, donc on doit l'importer dynamiquement
 */
export async function getAuth() {
  if (authInstance) {
    return authInstance;
  }

  // Import dynamique de Better Auth (ESM)
  const { betterAuth } = await import('better-auth');
  const { drizzleAdapter } = await import('better-auth/adapters/drizzle');

  authInstance = betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: {
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verificationTokens,
      },
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    user: {
      additionalFields: {
        firstName: {
          type: 'string',
          required: true,
        },
        lastName: {
          type: 'string',
          required: true,
        },
        role: {
          type: 'string',
          defaultValue: 'user',
        },
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 jours
      updateAge: 60 * 60 * 24, // 1 jour
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5, // 5 minutes
      },
    },
    trustedOrigins: [process.env.FRONTEND_URL || 'http://localhost:3000'],
  });

  return authInstance;
}
