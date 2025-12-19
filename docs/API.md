# API Documentation

Documentação completa da API REST do Portal Digital Colégio Essência Feliz.

---

## 📌 Informações Gerais

### Base URL

| Ambiente | URL |
|----------|-----|
| **Desenvolvimento** | `http://localhost:3002` |
| **Produção** | `https://api.essencia.edu.br` |

### Formato de Respostas

Todas as respostas são em **JSON** com a seguinte estrutura:

```json
// Sucesso
{
  "data": { ... },
  "meta": {
    "timestamp": "2024-12-18T12:00:00.000Z"
  }
}

// Erro
{
  "statusCode": 400,
  "message": "Descrição do erro",
  "error": "Bad Request"
}
```

### Headers Padrão

```http
Content-Type: application/json
Accept: application/json
```

---

## 🔐 Autenticação

A API utiliza autenticação baseada em **cookies de sessão**.

### Cookie de Sessão

| Atributo | Valor |
|----------|-------|
| **Nome** | `cef_session` |
| **HttpOnly** | `true` |
| **Secure** | `true` (produção) |
| **SameSite** | `Lax` |
| **Path** | `/` |
| **Max-Age** | 86400 (24 horas) |

### Códigos de Resposta de Auth

| Código | Significado | Ação Recomendada |
|--------|-------------|------------------|
| `401 Unauthorized` | Sessão inválida/expirada | Redirecionar para login |
| `403 Forbidden` | Sem permissão para recurso | Exibir mensagem de erro |

---

## 🔑 Endpoints de Autenticação

### POST `/auth/login`

Autentica um usuário e cria uma sessão.

**Request:**

```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@essencia.edu.br",
  "password": "senha123"
}
```

**Response (200 OK):**

```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "usuario@essencia.edu.br",
      "name": "Nome do Usuário",
      "role": "ADMIN"
    }
  }
}
```

**Headers de Resposta:**

```http
Set-Cookie: cef_session=abc123...; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400
```

**Erros:**

| Código | Descrição |
|--------|-----------|
| `400` | Campos obrigatórios ausentes |
| `401` | Credenciais inválidas |

---

### POST `/auth/logout`

Encerra a sessão do usuário.

**Request:**

```http
POST /auth/logout
Cookie: cef_session=abc123...
```

**Response (200 OK):**

```json
{
  "data": {
    "message": "Logout realizado com sucesso"
  }
}
```

**Headers de Resposta:**

```http
Set-Cookie: cef_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0
```

---

### GET `/auth/me`

Retorna informações do usuário autenticado.

**Request:**

```http
GET /auth/me
Cookie: cef_session=abc123...
```

**Response (200 OK):**

```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "usuario@essencia.edu.br",
      "name": "Nome do Usuário",
      "role": "ADMIN",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

## 👥 Endpoints de Usuários

> ⚠️ **Requer autenticação** e role `ADMIN`

### GET `/users`

Lista todos os usuários com paginação.

**Query Parameters:**

| Parâmetro | Tipo | Default | Descrição |
|-----------|------|---------|-----------|
| `page` | number | 1 | Página atual |
| `limit` | number | 10 | Itens por página |
| `search` | string | - | Busca por nome/email |
| `role` | string | - | Filtrar por role |

**Request:**

```http
GET /users?page=1&limit=10&role=TEACHER
Cookie: cef_session=abc123...
```

**Response (200 OK):**

```json
{
  "data": {
    "users": [
      {
        "id": "uuid",
        "email": "professor@essencia.edu.br",
        "name": "Professor Exemplo",
        "role": "TEACHER",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

---

### GET `/users/:id`

Retorna um usuário específico.

**Request:**

```http
GET /users/123e4567-e89b-12d3-a456-426614174000
Cookie: cef_session=abc123...
```

**Response (200 OK):**

```json
{
  "data": {
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "usuario@essencia.edu.br",
      "name": "Nome Completo",
      "role": "ADMIN",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-06-01T00:00:00.000Z"
    }
  }
}
```

---

### POST `/users`

Cria um novo usuário.

**Request:**

```http
POST /users
Cookie: cef_session=abc123...
Content-Type: application/json

{
  "email": "novo@essencia.edu.br",
  "name": "Novo Usuário",
  "password": "senhaForte123!",
  "role": "TEACHER"
}
```

**Response (201 Created):**

```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "novo@essencia.edu.br",
      "name": "Novo Usuário",
      "role": "TEACHER",
      "createdAt": "2024-12-18T00:00:00.000Z"
    }
  }
}
```

**Validações:**

| Campo | Regra |
|-------|-------|
| `email` | Email válido e único |
| `name` | 2-100 caracteres |
| `password` | Mínimo 8 caracteres |
| `role` | ADMIN, DIRECTOR, TEACHER, PARENT, STUDENT |

---

### PATCH `/users/:id`

Atualiza um usuário existente.

**Request:**

```http
PATCH /users/123e4567-e89b-12d3-a456-426614174000
Cookie: cef_session=abc123...
Content-Type: application/json

{
  "name": "Nome Atualizado"
}
```

**Response (200 OK):**

```json
{
  "data": {
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "usuario@essencia.edu.br",
      "name": "Nome Atualizado",
      "role": "ADMIN",
      "updatedAt": "2024-12-18T00:00:00.000Z"
    }
  }
}
```

---

### DELETE `/users/:id`

Remove um usuário (soft delete).

**Request:**

```http
DELETE /users/123e4567-e89b-12d3-a456-426614174000
Cookie: cef_session=abc123...
```

**Response (204 No Content)**

---

## 🩺 Health Check

### GET `/health`

Verifica o status da API e suas dependências.

**Request:**

```http
GET /health
```

**Response (200 OK):**

```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "redis": { "status": "up" }
  },
  "details": {
    "database": { "status": "up" },
    "redis": { "status": "up" }
  }
}
```

---

## 🎭 Roles e Permissões

### Hierarquia de Roles

| Role | Nível | Descrição |
|------|-------|-----------|
| `ADMIN` | 1 | Acesso total ao sistema |
| `DIRECTOR` | 2 | Gestão pedagógica e administrativa |
| `TEACHER` | 3 | Acesso a turmas e alunos |
| `PARENT` | 4 | Acesso aos dados dos filhos |
| `STUDENT` | 5 | Acesso restrito (portal) |

### Matriz de Permissões

| Recurso | ADMIN | DIRECTOR | TEACHER | PARENT | STUDENT |
|---------|-------|----------|---------|--------|---------|
| Users (CRUD) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Users (Read) | ✅ | ✅ | ⚠️ | ❌ | ❌ |
| Dashboard | ✅ | ✅ | ✅ | ❌ | ❌ |
| Portal | ✅ | ✅ | ✅ | ✅ | ✅ |

> ⚠️ = Acesso parcial (apenas recursos relacionados)

---

## 📝 Exemplos com cURL

### Login

```bash
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@essencia.edu.br","password":"admin123"}' \
  -c cookies.txt
```

### Requisição Autenticada

```bash
curl -X GET http://localhost:3002/users \
  -H "Accept: application/json" \
  -b cookies.txt
```

### Logout

```bash
curl -X POST http://localhost:3002/auth/logout \
  -b cookies.txt \
  -c cookies.txt
```

---

## ⚠️ Códigos de Erro

| Código | Tipo | Descrição |
|--------|------|-----------|
| `400` | Bad Request | Dados de entrada inválidos |
| `401` | Unauthorized | Autenticação necessária |
| `403` | Forbidden | Sem permissão |
| `404` | Not Found | Recurso não encontrado |
| `409` | Conflict | Conflito (ex: email duplicado) |
| `422` | Unprocessable Entity | Validação falhou |
| `500` | Internal Server Error | Erro interno |

---

## 🔄 Rate Limiting

| Endpoint | Limite |
|----------|--------|
| `/auth/login` | 5 req/min por IP |
| `/auth/*` | 30 req/min por IP |
| `/*` | 100 req/min por usuário |

---

## 📚 SDKs e Integrações

### TypeScript/JavaScript

```typescript
import { createClient } from '@essencia/shared/client';

const api = createClient({
  baseUrl: 'http://localhost:3002',
});

// Login
const { user } = await api.auth.login({
  email: 'user@essencia.edu.br',
  password: 'password',
});

// Listar usuários
const { users, pagination } = await api.users.list({
  page: 1,
  limit: 10,
});
```

---

## 📞 Suporte

Para dúvidas sobre a API, entre em contato:

- **Email**: suporte@essencia.edu.br
- **Documentação**: [docs/](../)
