import { z } from "zod";
export declare const userRoleSchema: z.ZodEnum<["admin", "teacher", "parent", "student"]>;
export declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    role: z.ZodEnum<["admin", "teacher", "parent", "student"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    name: string;
    role: "admin" | "teacher" | "parent" | "student";
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    email: string;
    name: string;
    role: "admin" | "teacher" | "parent" | "student";
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    role: z.ZodEnum<["admin", "teacher", "parent", "student"]>;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    role: "admin" | "teacher" | "parent" | "student";
    password: string;
}, {
    email: string;
    name: string;
    role: "admin" | "teacher" | "parent" | "student";
    password: string;
}>;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type User = z.infer<typeof userSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
//# sourceMappingURL=index.d.ts.map