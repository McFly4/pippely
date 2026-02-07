import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  public readonly db: PostgresJsDatabase<typeof schema>;

  constructor() {
    const client = postgres(process.env.DATABASE_URL!);
    this.db = drizzle(client, { schema });
  }
}
