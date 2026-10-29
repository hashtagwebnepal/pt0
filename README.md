# Period-Tracking-BE

Elysia backend service with Bun runtime, PostgreSQL, and Drizzle ORM.

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (v1.1+)
- [Docker](https://www.docker.com/) & Docker Compose

### 1. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

Ensure `.env` has your database credentials:
```env
JWT_SECRET=your-super-secret-jwt-key-at-least-32-chars-long
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/period_tracking
```

### 2. Start PostgreSQL Database
```bash
docker compose -f compose.dev.yml up -d
```

### 3. Install Dependencies & Run Database Migrations
```bash
bun install
bun run db:push    # or bun run db:migrate
```

### 4. Development Server
To start the development server with live reload:
```bash
bun run dev
```

Open [http://localhost:3000/api/v1](http://localhost:3000/api/v1) with your browser to see the result.

---

## API Documentation

- **Scalar Interactive Docs**: [http://localhost:3000/api/v1/openapi](http://localhost:3000/api/v1/openapi)
- **OpenAPI JSON Spec**: [http://localhost:3000/api/v1/openapi.json](http://localhost:3000/api/v1/openapi.json)

---

## Available Scripts

| Script | Description |
| :--- | :--- |
| `bun run dev` | Start development server with file watching |
| `bun run db:generate` | Generate new Drizzle migration files |
| `bun run db:migrate` | Apply versioned migrations to PostgreSQL |
| `bun run db:push` | Push schema changes directly to PostgreSQL |
| `bun run db:studio` | Open Drizzle Studio database viewer |

---

## Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/p/auth/signup` | Create account | No |
| `POST` | `/api/v1/p/auth/login` | Login and receive JWT token | No |
| `GET` | `/api/v1/p/auth/me` | Get authenticated user profile | Bearer Token |
