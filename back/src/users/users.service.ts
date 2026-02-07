import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { eq, InferSelectModel } from 'drizzle-orm';
import { users } from '../db/schema';

type User = InferSelectModel<typeof users>;

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  async findAll(): Promise<User[]> {
    return this.dbService.db.query.users.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.dbService.db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
