import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import type { InferSelectModel } from 'drizzle-orm';
import { users } from '../db/schema';

type User = InferSelectModel<typeof users>;

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  async findAll(): Promise<User[]> {
    return this.dbService.db.query.users.findMany();
  }

  async findOne(id: string): Promise<User> {
    return this.dbService.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });
  }
}
