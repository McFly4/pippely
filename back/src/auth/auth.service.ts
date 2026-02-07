import { Injectable, OnModuleInit } from '@nestjs/common';
import { getAuth } from './auth.config';

@Injectable()
export class AuthService implements OnModuleInit {
  private auth: any;

  /**
   * Initialise Better Auth au démarrage du module
   */
  async onModuleInit() {
    this.auth = await getAuth();
  }

  /**
   * Récupère l'instance Better Auth
   */
  getAuthInstance() {
    return this.auth;
  }

  /**
   * Gère les requêtes d'authentification
   */
  async handleRequest(request: Request): Promise<Response> {
    if (!this.auth) {
      this.auth = await getAuth();
    }
    return this.auth.handler(request);
  }

  /**
   * Récupère la session depuis une requête
   */
  async getSession(request: Request) {
    if (!this.auth) {
      this.auth = await getAuth();
    }
    return this.auth.api.getSession({
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
