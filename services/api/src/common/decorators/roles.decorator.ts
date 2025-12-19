import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";

/**
 * Decorator to specify which roles are allowed to access a route
 * @example @Roles('admin', 'teacher')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
