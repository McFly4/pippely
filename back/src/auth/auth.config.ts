import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';

// Cache pour l'instance Better Auth et le client DB
let authInstance: any = null;
let dbClient: any = null;
let db: any = null;

/**
 * Initialise Better Auth avec un import dynamique (ESM)
 * Better Auth est un module ESM pur, donc on doit l'importer dynamiquement
 */
export async function getAuth() {
  if (authInstance) {
    return authInstance;
  }

  // Initialiser le client DB si ce n'est pas déjà fait
  if (!dbClient) {
    dbClient = postgres(process.env.DIRECT_URL || process.env.DATABASE_URL!);
    db = drizzle(dbClient, { schema });
  }

  // Import dynamique de Better Auth (ESM)
  const { betterAuth } = await import('better-auth');
  const { drizzleAdapter } = await import('better-auth/adapters/drizzle');

  authInstance = betterAuth({
    baseURL: process.env.BACKEND_URL || 'http://localhost:4000',
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
