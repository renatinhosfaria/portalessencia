# Database Documentation

Documentação do banco de dados PostgreSQL e uso do Drizzle ORM.

---

## 📊 Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **PostgreSQL** | 16 | Banco principal |
| **Drizzle ORM** | Latest | Type-safe queries |
| **Redis** | 7 | Cache de sessões |

---

## 🗄 Schema

### Diagrama ER

```
┌─────────────────────┐
│       users         │
├─────────────────────┤
│ id (PK)             │
│ email (UNIQUE)      │
│ password_hash       │
│ name                │
│ role                │
│ created_at          │
│ updated_at          │
│ deleted_at          │
└─────────────────────┘
```

### Tabela `users`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | PK - Random UUID |
| `email` | `varchar(255)` | Único |
| `password_hash` | `varchar(255)` | bcrypt |
| `name` | `varchar(100)` | Nome completo |
| `role` | `user_role` | Enum de roles |
| `created_at` | `timestamp` | Data criação |
| `updated_at` | `timestamp` | Última atualização |
| `deleted_at` | `timestamp` | Soft delete |

### Enum `user_role`

```sql
CREATE TYPE user_role AS ENUM (
  'ADMIN', 'DIRECTOR', 'TEACHER', 'PARENT', 'STUDENT'
);
```

---

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# Dev
DATABASE_URL=postgresql://essencia:essencia_dev@localhost:5432/essencia_db

# Prod
DATABASE_URL=postgresql://user:password@host:5432/essencia_db
```

---

## 📝 Schema Drizzle

```typescript
// packages/db/src/schema/users.ts
import { pgTable, uuid, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', [
  'ADMIN', 'DIRECTOR', 'TEACHER', 'PARENT', 'STUDENT',
]);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  role: userRoleEnum('role').notNull().default('STUDENT'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});
```

---

## 🔄 Migrações

### Comandos

```bash
pnpm db:generate  # Gerar migração
pnpm db:migrate   # Aplicar migrações
pnpm db:studio    # GUI Drizzle
```

### Nomenclatura

```
YYYYMMDDHHMM_module_action.ts

# Exemplos:
0000_initial_schema.ts
0001_users_add_phone.ts
```

---

## 🔍 Queries Exemplo

```typescript
// Buscar por email
const user = await db.query.users.findFirst({
  where: eq(users.email, 'user@example.com'),
});

// Criar usuário
const [newUser] = await db.insert(users)
  .values({ email, passwordHash, name, role })
  .returning();

// Soft delete
await db.update(users)
  .set({ deletedAt: new Date() })
  .where(eq(users.id, userId));
```

---

## 🔒 Regras de Acesso

> ⚠️ `packages/db` só pode ser importado por `services/api`

```typescript
// ✅ Backend (services/api)
import { db, users } from '@essencia/db';

// ❌ Frontend (apps/*) - ESLint Error!
import { db } from '@essencia/db';
```

---

## 📚 Referências

- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL 16](https://www.postgresql.org/docs/16/)
