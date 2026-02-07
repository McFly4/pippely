import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import type { User } from '../db/schema/types';

@Controller('users')
@UseGuards(AuthGuard) // Protège toutes les routes de ce controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Route protégée - nécessite authentification
   * Retourne tous les utilisateurs
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Route protégée - nécessite authentification
   * Retourne l'utilisateur courant
   */
  @Get('me')
  getCurrentUser(@CurrentUser() user: User) {
    return {
      user,
      message: 'Utilisateur courant récupéré avec succès',
    };
  }

  /**
   * Route protégée - nécessite authentification
   * Retourne un utilisateur par son ID
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  /**
   * Exemple de route publique (pas besoin d'auth)
   */
  @Public()
  @Get('public/stats')
  getPublicStats() {
    return {
      message: "Cette route est publique - pas besoin d'authentification",
      stats: {
        totalUsers: 100,
      },
    };
  }
}
