import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { FastifyRequest } from "fastify";
import "@fastify/cookie";

import { SessionService } from "../../modules/auth/session.service";

const COOKIE_NAME = "cef_session";

export interface AuthenticatedRequest extends FastifyRequest {
  user: {
    userId: string;
    role: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = request.cookies?.[COOKIE_NAME];

    if (!token) {
      throw new UnauthorizedException("Não autenticado");
    }

    const session = await this.sessionService.getSession(token);

    if (!session) {
      throw new UnauthorizedException("Sessão expirada");
    }

    // Attach user info to request
    (request as AuthenticatedRequest).user = {
      userId: session.userId,
      role: session.role,
    };

    return true;
  }
}
