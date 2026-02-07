import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * Guard pour protéger les routes avec Better Auth
 * Vérifie que l'utilisateur est authentifié
 * Peut être bypassed avec @Public() decorator
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Vérifier si la route est publique
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    // Convertir la requête Express en Request standard pour Better Auth
    const url = new URL(
      request.url,
      `${request.protocol}://${request.get('host')}`,
    );

    const webRequest = new Request(url, {
      headers: request.headers as HeadersInit,
    });

    // Récupérer la session
    const session = await this.authService.getSession(webRequest);

    if (!session?.user) {
      throw new UnauthorizedException('Vous devez être connecté');
    }

    // Attacher l'utilisateur à la requête pour les decorators
    request.user = session.user;
    request.session = session.session;

    return true;
  }
}
