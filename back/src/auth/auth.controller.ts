import { All, Controller, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Gère toutes les requêtes d'authentification Better Auth
   * Better Auth expose automatiquement les endpoints:
   * - POST /api/auth/sign-up/email
   * - POST /api/auth/sign-in/email
   * - POST /api/auth/sign-out
   * - GET /api/auth/session
   * - etc.
   */
  @All('*')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    // Si c'est un signup, générer le champ 'name' à partir de firstName et lastName
    if (req.url.includes('/sign-up') && req.body) {
      const { firstName, lastName } = req.body;
      if (firstName && lastName && !req.body.name) {
        req.body.name = `${firstName} ${lastName}`;
      }
    }

    // Convertir la requête Express en Request standard
    const url = new URL(req.url, `${req.protocol}://${req.get('host')}`);

    // Créer les headers en incluant explicitement Content-Type pour les requêtes avec body
    const headers = new Headers(req.headers as HeadersInit);
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      headers.set('Content-Type', 'application/json');
    }

    const request = new Request(url, {
      method: req.method,
      headers,
      body:
        req.method !== 'GET' && req.method !== 'HEAD'
          ? JSON.stringify(req.body)
          : undefined,
    });

    const response = await this.authService.handleRequest(request);

    // Copier les headers de la réponse
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Définir le status
    res.status(response.status);

    // Envoyer le body
    const body = await response.text();

    // Logger l'erreur si status >= 400
    if (response.status >= 400) {
      console.log('Better Auth error response:', body);
    }

    res.send(body);
  }
}
