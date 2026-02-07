import { Injectable } from '@nestjs/common';
import { auth } from './auth.config';

@Injectable()
export class AuthService {
  /**
   * Récupère l'instance Better Auth
   */
  getAuthInstance() {
    return auth;
  }

  /**
   * Gère les requêtes d'authentification
   */
  async handleRequest(request: Request): Promise<Response> {
    return auth.handler(request);
  }

  /**
   * Récupère la session depuis une requête
   */
  async getSession(request: Request) {
    return auth.api.getSession({
      headers: request.headers,
    });
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  async isAuthenticated(request: Request): Promise<boolean> {
    const session = await this.getSession(request);
    return !!session?.user;
  }

  /**
   * Récupère l'utilisateur courant
   */
  async getCurrentUser(request: Request) {
    const session = await this.getSession(request);
    return session?.user || null;
  }
}
