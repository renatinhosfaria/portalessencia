# Security Policy

Políticas e práticas de segurança do Portal Digital Colégio Essência Feliz.

---

## 🔐 Autenticação

### Sessões

| Configuração | Valor |
|--------------|-------|
| **Storage** | Redis |
| **TTL** | 24 horas |
| **Renovação** | Sliding window (25%) |
| **Cookie** | HttpOnly, Secure, SameSite=Lax |

### Senhas

- **Algoritmo**: bcrypt
- **Salt Rounds**: 12
- **Requisitos mínimos**: 8 caracteres

---

## 🛡 Headers de Segurança

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
```

---

## 🔒 Infraestrutura

### Firewall (UFW)

```bash
# Portas permitidas
22  - SSH
80  - HTTP (redirect)
443 - HTTPS
```

### SSH

- ✅ Autenticação por chave
- ❌ Autenticação por senha
- ✅ Fail2Ban ativo

---

## 🚫 Rate Limiting

| Endpoint | Limite |
|----------|--------|
| `/auth/login` | 5 req/min/IP |
| `/auth/*` | 30 req/min/IP |
| `/*` | 100 req/min/user |

---

## 📋 RBAC

### Roles

| Role | Nível | Acesso |
|------|-------|--------|
| ADMIN | 1 | Total |
| DIRECTOR | 2 | Gestão pedagógica |
| TEACHER | 3 | Turmas/alunos |
| PARENT | 4 | Dados dos filhos |
| STUDENT | 5 | Portal |

---

## 🔍 Boas Práticas

### ✅ Fazer

- Validar todos os inputs (Zod)
- Usar prepared statements (Drizzle)
- Logs de auditoria
- Soft delete
- HTTPS obrigatório

### ❌ Evitar

- Expor stack traces
- Armazenar senhas em texto
- Logs com dados sensíveis
- CORS permissivo

---

## 🐛 Vulnerabilidades

### Reportar

Email: security@essencia.edu.br

### Informações Necessárias

1. Descrição da vulnerabilidade
2. Passos para reproduzir
3. Impacto potencial
4. Sugestão de correção (opcional)

---

## 📦 Dependências

```bash
# Verificar vulnerabilidades
pnpm audit

# Atualizar
pnpm update
```

---

## 🔄 Backup

### Banco de Dados

```bash
# Backup diário automático
pg_dump -U essencia essencia_db > backup.sql
```

### Retenção

- Diário: 7 dias
- Semanal: 4 semanas
- Mensal: 12 meses

---

## 📝 Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] SESSION_SECRET forte (32+ chars)
- [ ] HTTPS habilitado
- [ ] Firewall configurado
- [ ] Fail2Ban ativo
- [ ] Backups configurados
- [ ] Logs externalizados
