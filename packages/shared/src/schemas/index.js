"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = exports.registerSchema = exports.loginSchema = exports.userSchema = exports.userRoleSchema = void 0;
const zod_1 = require("zod");
// User schemas
exports.userRoleSchema = zod_1.z.enum(["admin", "teacher", "parent", "student"]);
exports.userSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(2).max(100),
    role: exports.userRoleSchema,
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
// Auth schemas
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email inválido"),
    password: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email inválido"),
    password: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    name: zod_1.z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    role: exports.userRoleSchema,
});
// Pagination schemas
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(20),
});
