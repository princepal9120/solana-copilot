# 🛠 Setup & Deployment Guide

Complete guide for setting up Solana Copilot in development and production environments.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Docker Deployment](#docker-deployment)
7. [Production Deployment](#production-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 20+ | Frontend runtime |
| npm | 10+ | Package manager |
| Python | 3.12+ | Backend runtime |
| Docker | 24+ | Container runtime |
| Docker Compose | 2.20+ | Multi-container orchestration |

### Optional Software

| Software | Purpose |
|----------|---------|
| Solana CLI | Wallet management, airdrop SOL |
| PostgreSQL | Local database (if not using Docker) |
| Redis | Local cache (if not using Docker) |

### Verify Installation

```bash
node --version    # v20.x.x
npm --version     # 10.x.x
python3 --version # 3.12.x
docker --version  # 24.x.x
docker-compose --version # 2.20.x
```

---

## Local Development Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/your-org/solana-copilot.git
cd solana-copilot
```

### Step 2: Install Dependencies

```bash
# Install all Node.js dependencies (uses npm workspaces)
npm install

# Install Python dependencies
pip install -r backend/requirements.txt
# OR with virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r backend/requirements.txt
```

### Step 3: Setup Environment

```bash
# Create .env file from example
cp .env.example .env

# Generate JWT secret
echo "JWT_SECRET=$(openssl rand -hex 32)" >> .env
```

---

## Environment Configuration

### Required Variables

Edit `.env` file with your values:

```env
# ============================================
# ENVIRONMENT
# ============================================
NODE_ENV=development
ENVIRONMENT=development

# ============================================
# FRONTEND (Next.js)
# ============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# ============================================
# BACKEND (FastAPI)
# ============================================
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/solana_copilot
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=solana_copilot

# Redis
REDIS_URL=redis://localhost:6379/0
CELERY_BROKER_URL=redis://localhost:6379/1
CELERY_RESULT_BACKEND=redis://localhost:6379/1

# Security
JWT_SECRET=your-256-bit-secret-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# ============================================
# AI PROVIDERS (Required)
# ============================================
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
OPENAI_API_KEY=sk-xxxxx

# ============================================
# SOLANA
# ============================================
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com

# ============================================
# OPTIONAL: External Services
# ============================================
# SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
# LANGSMITH_API_KEY=ls_xxxxx
```

### API Keys

| Service | How to Get |
|---------|------------|
| Anthropic | https://console.anthropic.com/ |
| OpenAI | https://platform.openai.com/api-keys |
| Helius RPC | https://helius.dev/ (faster RPC) |
| LangSmith | https://smith.langchain.com/ (optional) |

---

## Database Setup

### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL and Redis only
docker-compose up -d postgres redis

# Verify containers are running
docker-compose ps
```

### Option B: Local Installation

```bash
# macOS
brew install postgresql@16 redis

# Start services
brew services start postgresql@16
brew services start redis

# Create database
createdb solana_copilot
```

### Run Migrations

```bash
cd backend

# Create all tables
alembic upgrade head

# Verify
alembic current
```

---

## Running the Application

### Development Mode

```bash
# From project root - starts both frontend and backend
npm run dev
```

This runs:
- **Frontend**: http://localhost:3000 (Next.js with hot reload)
- **Backend**: http://localhost:8000 (Uvicorn with auto-reload)

### Run Services Separately

```bash
# Terminal 1: Frontend
cd frontend && npm run dev

# Terminal 2: Backend
cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Terminal 3: Celery Worker (for DCA automation)
cd backend && celery -A app.workers.celery_app worker --loglevel=info

# Terminal 4: Celery Beat (scheduler)
cd backend && celery -A app.workers.celery_app beat --loglevel=info
```

---

## Docker Deployment

### Full Stack with Docker

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Check Service Health

```bash
# List running containers
docker-compose ps

# Check individual logs
docker-compose logs backend
docker-compose logs frontend
```

### Rebuild After Changes

```bash
# Rebuild specific service
docker-compose up -d --build backend

# Rebuild all
docker-compose up -d --build
```

---

## Production Deployment

### Cloud Providers

| Component | Recommended Service |
|-----------|---------------------|
| Frontend | Vercel, Cloudflare Pages |
| Backend | Railway, Render, AWS ECS |
| Database | Supabase, Neon, AWS RDS |
| Redis | Upstash, Redis Cloud |

### Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### Railway (Backend)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Environment Variables for Production

```env
NODE_ENV=production
ENVIRONMENT=production

# Use production database
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require

# Use production Redis
REDIS_URL=rediss://user:pass@host:6379

# Secure secrets
JWT_SECRET=production-256-bit-secret
```

---

## Troubleshooting

### Common Issues

#### 1. `ModuleNotFoundError: No module named 'xxx'`
```bash
# Reinstall Python dependencies
pip install -r backend/requirements.txt
```

#### 2. `sh: next: command not found`
```bash
# Reinstall Node dependencies from root
npm install
```

#### 3. Database Connection Refused
```bash
# Make sure Docker services are running
docker-compose up -d postgres redis

# Or check if ports are in use
lsof -i :5432
lsof -i :6379
```

#### 4. Port Already in Use
```bash
# Kill processes on ports
lsof -t -i:3000 -i:8000 | xargs kill -9
```

#### 5. Docker .env Not Found
```bash
# Ensure .env exists in project root
ls -la .env

# Recreate from example if needed
cp .env.example .env
```

#### 6. React Version Mismatch
```bash
# Clean install with overrides
rm -rf node_modules frontend/node_modules
npm install
```

### Logs & Debugging

```bash
# Backend logs
docker-compose logs -f backend

# Database logs
docker-compose logs -f postgres

# Check backend health
curl http://localhost:8000/health

# Check API docs
open http://localhost:8000/docs
```

### Reset Everything

```bash
# Nuclear option - reset all
docker-compose down -v
rm -rf node_modules frontend/node_modules backend/__pycache__
npm install
pip install -r backend/requirements.txt
docker-compose up -d
```

---

## Health Checks

| Service | Endpoint | Expected |
|---------|----------|----------|
| Frontend | http://localhost:3000 | 200 OK |
| Backend | http://localhost:8000/health | `{"status": "healthy"}` |
| API Docs | http://localhost:8000/docs | Swagger UI |

---

## Next Steps

1. ✅ Setup complete
2. 🔑 Connect your Solana wallet at http://localhost:3000
3. 💬 Start chatting with the AI: "Show my portfolio"
4. 🔄 Set up your first DCA automation
5. 📖 Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design

---

<p align="center">
  <strong>Need help? Open an issue on GitHub!</strong>
</p>
