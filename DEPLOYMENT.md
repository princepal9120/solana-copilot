# Solana Copilot - Deployment Guide

## Overview

This guide covers running Solana Copilot locally and deploying to production.

---

## 🖥️ Local Development

### Prerequisites

- **Node.js** 20+ (for frontend)
- **Python** 3.12+ (for backend)
- **Docker** & **Docker Compose** (for PostgreSQL, Redis)
- **Solana CLI** (optional, for program deployment)

### Quick Start

#### 1. Clone & Setup Environment

```bash
# Clone repository
git clone https://github.com/your-repo/solana-copilot.git
cd solana-copilot

# Copy environment file
cp .env.example .env

# Edit .env with your API keys:
# - ANTHROPIC_API_KEY (required for AI chat)
# - HELIUS_API_KEY (recommended for Solana RPC)
```

#### 2. Start Backend Services (Docker)

```bash
# Start PostgreSQL + Redis + Backend + Workers
docker-compose up -d

# Check services are running
docker-compose ps

# View logs
docker-compose logs -f backend
```

#### 3. Run Database Migrations

```bash
# Enter backend container
docker-compose exec backend bash

# Run migrations
alembic upgrade head

# Exit container
exit
```

#### 4. Start Frontend (Local)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 5. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## 📁 Project Structure

```
solana-copilot/
├── backend/
│   ├── Dockerfile           # API server container
│   ├── Dockerfile.worker    # Celery worker container
│   ├── requirements.txt     # Python dependencies
│   └── app/                  # Application code
├── frontend/
│   ├── package.json         # Node dependencies
│   └── src/                  # React/Next.js code
├── programs/
│   ├── dca-vault/           # Anchor DCA program
│   └── session-keys/        # Anchor session keys program
├── docker-compose.yml       # Local development services
└── .env.example             # Environment template
```

---

## 🚀 Production Deployment

### Option 1: Vercel + Railway (Recommended)

#### Frontend → Vercel

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Deploy from frontend directory
   cd frontend
   vercel
   ```

2. **Configure Environment Variables** (Vercel Dashboard):
   ```
   NEXT_PUBLIC_API_URL=https://your-api.railway.app
   NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
   NEXT_PUBLIC_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
   ```

3. **Set Production Domain**:
   - Go to Vercel Dashboard → Project → Settings → Domains
   - Add your custom domain

#### Backend → Railway

1. **Create Railway Project**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   railway init
   ```

2. **Add Services** (Railway Dashboard):
   - PostgreSQL (built-in)
   - Redis (built-in)
   - Backend API (from Dockerfile)
   - Celery Worker (from Dockerfile.worker)
   - Celery Beat (from Dockerfile.worker with custom command)

3. **Configure Environment Variables**:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   REDIS_URL=${{Redis.REDIS_URL}}
   SECRET_KEY=<generate-secure-key>
   ANTHROPIC_API_KEY=<your-key>
   HELIUS_API_KEY=<your-key>
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ```

4. **Deploy**:
   ```bash
   railway up
   ```

---

### Option 2: AWS (ECS + RDS)

#### Infrastructure Setup

1. **Create RDS PostgreSQL**:
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier solana-copilot-db \
     --db-instance-class db.t3.micro \
     --engine postgres \
     --master-username admin \
     --master-user-password <password> \
     --allocated-storage 20
   ```

2. **Create ElastiCache Redis**:
   ```bash
   aws elasticache create-cache-cluster \
     --cache-cluster-id solana-copilot-cache \
     --engine redis \
     --cache-node-type cache.t3.micro \
     --num-cache-nodes 1
   ```

3. **Create ECR Repository**:
   ```bash
   aws ecr create-repository --repository-name solana-copilot-backend
   ```

4. **Build & Push Docker Image**:
   ```bash
   # Login to ECR
   aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com
   
   # Build
   cd backend
   docker build -t solana-copilot-backend .
   
   # Tag
   docker tag solana-copilot-backend:latest <account>.dkr.ecr.<region>.amazonaws.com/solana-copilot-backend:latest
   
   # Push
   docker push <account>.dkr.ecr.<region>.amazonaws.com/solana-copilot-backend:latest
   ```

5. **Create ECS Task Definition & Service**:
   - Use AWS Console or Terraform
   - Configure environment variables
   - Set up load balancer

---

### Option 3: DigitalOcean App Platform

1. **Create App**:
   - Connect GitHub repository
   - Add Backend service (Docker, `/backend`)
   - Add Worker service (Docker, `/backend/Dockerfile.worker`)
   - Add PostgreSQL database
   - Add Redis database

2. **Configure Environment**:
   ```
   DATABASE_URL=${db.DATABASE_URL}
   REDIS_URL=${redis.REDIS_URL}
   ```

3. **Deploy**:
   - Push to main branch triggers auto-deploy

---

## 🔒 Production Checklist

### Security
- [ ] Generate strong `SECRET_KEY` and `JWT_SECRET`
- [ ] Enable HTTPS only
- [ ] Set `CORS_ORIGINS` to exact frontend domain
- [ ] Rotate API keys regularly
- [ ] Enable rate limiting
- [ ] Set up Sentry for error tracking

### Performance
- [ ] Use mainnet-beta Helius RPC (not public RPC)
- [ ] Configure Redis caching
- [ ] Set appropriate Celery concurrency
- [ ] Enable database connection pooling

### Monitoring
- [ ] Set up health check endpoints
- [ ] Configure Sentry DSN
- [ ] Enable log aggregation
- [ ] Set up uptime monitoring

### Database
- [ ] Run migrations before deploying new version
- [ ] Set up automated backups
- [ ] Configure read replicas for scale

---

## 🧪 Running Tests

```bash
# Backend tests
cd backend
pytest --cov=app tests/

# Frontend tests
cd frontend
npm run test

# E2E tests
npm run test:e2e
```

---

## 📊 Monitoring

### Health Endpoints

- `GET /health` - API health check
- `GET /health/db` - Database connection
- `GET /health/redis` - Redis connection

### Logs

```bash
# Docker logs
docker-compose logs -f backend worker

# Railway logs
railway logs

# Vercel logs (frontend)
vercel logs
```

---

## 🔄 Updates & Migrations

### Deploying Updates

```bash
# 1. Pull latest changes
git pull origin main

# 2. Run migrations (if any)
docker-compose exec backend alembic upgrade head

# 3. Restart services
docker-compose up -d --build

# 4. Verify health
curl http://localhost:8000/health
```

### Rollback

```bash
# Rollback migration
docker-compose exec backend alembic downgrade -1

# Rollback to previous image
docker-compose down
git checkout <previous-commit>
docker-compose up -d --build
```

---

## 💡 Tips

1. **Use Helius RPC** - Public Solana RPC has aggressive rate limits
2. **Enable Redis caching** - Reduces API calls by 90%
3. **Monitor Celery workers** - Use Flower dashboard at `:5555`
4. **Set up alerts** - Configure Sentry for error notifications
5. **Backup regularly** - Automate PostgreSQL backups
