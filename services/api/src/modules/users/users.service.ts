import { getDb } from "@essencia/db";
import { users, type NewUser, type User } from "@essencia/db/schema";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

@Injectable()
export class UsersService {
  async findAll(): Promise<Omit<User, "passwordHash">[]> {
    const db = getDb();
    return db.query.users.findMany({
      columns: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findById(id: string): Promise<Omit<User, "passwordHash"> | null> {
    const db = getDb();
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user ?? null;
  }

  async create(data: {
    email: string;
    password: string;
    name: string;
    role?: "admin" | "teacher" | "parent" | "student";
  }): Promise<Omit<User, "passwordHash">> {
    const db = getDb();

    // Check if email already exists
    const existing = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (existing) {
      throw new ConflictException("Email já está em uso");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12);

    const newUser: NewUser = {
      email: data.email,
      passwordHash,
      name: data.name,
      role: data.role ?? "student",
    };

    const [created] = await db.insert(users).values(newUser).returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

    return created;
  }

  async update(
    id: string,
    data: Partial<{ email: string; name: string; role: "admin" | "teacher" | "parent" | "student" }>
  ): Promise<Omit<User, "passwordHash">> {
    const db = getDb();

    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const [updated] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    return updated;
  }

  async delete(id: string): Promise<void> {
    const db = getDb();

    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundException("Usuário não encontrado");
    }

    await db.delete(users).where(eq(users.id, id));
  }
}
