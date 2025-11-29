# 🚀 Solana Copilot - Quick Start Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **Python** 3.12 or higher
- **Docker** & **Docker Compose** 27.x or higher
- **Git**

Optional (for Anchor development):
- **Rust** 1.82 or higher
- **Solana CLI** 1.18 or higher
- **Anchor CLI** 0.30 or higher

---

## 🏃 Quick Start (5 Minutes)

### Step 1: Clone & Setup Environment

```bash
# Navigate to project
cd /Users/prince/Desktop/coding/solana-ai

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# At minimum, set these:
# - ANTHROPIC_API_KEY (for Claude)
# - HELIUS_API_KEY (for Solana RPC)
# - BIRDEYE_API_KEY (for price feeds)
nano .env
```

### Step 2: Start Infrastructure

```bash
# Start PostgreSQL and Redis
cd infrastructure/docker
docker-compose up -d postgres redis

# Verify services are running
docker-compose ps

# Check logs
docker-compose logs -f postgres redis
```

### Step 3: Setup Backend

```bash
# Navigate to backend
cd ../../backend

# Create virtual environment
python3.12 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create database tables (once Alembic is configured)
# alembic upgrade head
```

### Step 4: Start Backend Server

```bash
# Start FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Server will start at: http://localhost:8000
# API docs at: http://localhost:8000/docs
```

### Step 5: Test the API

Open a new terminal and test the endpoints:

```bash
# Health check
curl http://localhost:8000/health

# Request authentication challenge
curl -X POST http://localhost:8000/api/v1/auth/request-challenge \
  -H "Content-Type: application/json" \
  -d '{"wallet": "YOUR_WALLET_ADDRESS"}'

# You should get a response with a nonce and message to sign
```

---

## 🔧 Development Workflow

### Backend Development

```bash
# Activate virtual environment
cd backend
source venv/bin/activate

# Run with auto-reload
uvicorn app.main:app --reload

# Run tests (once implemented)
pytest app/tests/ -v

# Format code
ruff format .

# Lint code
ruff check .

# Type check
mypy app/
```

### Database Migrations

```bash
# Create a new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback last migration
alembic downgrade -1

# View migration history
alembic history
```

### Redis Management

```bash
# Connect to Redis CLI
docker exec -it solana-copilot-redis redis-cli

# View all keys
KEYS *

# Get a value
GET key_name

# Clear all data (development only!)
FLUSHALL
```

### PostgreSQL Management

```bash
# Connect to PostgreSQL
docker exec -it solana-copilot-postgres psql -U postgres -d solana_copilot

# List tables
\dt

# Describe table
\d users

# Run query
SELECT * FROM users;

# Exit
\q
```

---

## 📝 Common Tasks

### Add a New API Endpoint

1. Create schema in `backend/app/schemas/`
2. Create router in `backend/app/api/v1/`
3. Register router in `backend/app/main.py`
4. Test with `/docs` endpoint

### Add a New Database Model

1. Create model in `backend/app/models/`
2. Import in `backend/app/models/__init__.py`
3. Create migration: `alembic revision --autogenerate -m "add model"`
4. Apply migration: `alembic upgrade head`

### Add a New Service

1. Create service in `backend/app/services/`
2. Implement business logic
3. Use in routers via dependency injection

### Add Environment Variable

1. Add to `.env.example`
2. Add to `backend/app/core/config.py` Settings class
3. Use via `settings.VARIABLE_NAME`

---

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

### Redis Connection Error

```bash
# Check if Redis is running
docker-compose ps redis

# Test connection
docker exec -it solana-copilot-redis redis-cli ping
# Should return: PONG

# Restart Redis
docker-compose restart redis
```

### Port Already in Use

```bash
# Find process using port 8000
lsof -i :8000

# Kill process
kill -9 PID

# Or change port in .env
API_PORT=8001
```

### Import Errors

```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Check Python path
python -c "import sys; print(sys.path)"
```

---

## 📚 Useful Commands

### Docker

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f [service_name]

# Rebuild containers
docker-compose build

# Remove volumes (WARNING: deletes data)
docker-compose down -v
```

### Git

```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature
```

### Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest app/tests/test_auth.py

# Run with verbose output
pytest -v -s
```

---

## 🎯 Next Steps

1. ✅ **You are here** - Backend foundation is ready
2. 🚧 **Build AI Agents** - Implement LangGraph agents
3. 🚧 **Integrate Solana** - Connect to blockchain
4. 🚧 **Create Frontend** - Build Next.js UI
5. 🚧 **Deploy** - Production deployment

---

## 📖 Additional Resources

- **API Documentation**: http://localhost:8000/docs
- **Project Structure**: See `PROJECT_STRUCTURE.md`
- **Build Summary**: See `BUILD_SUMMARY.md`
- **Implementation Progress**: See `IMPLEMENTATION_PROGRESS.md`

---

## 💬 Need Help?

- Check the inline code comments - everything is documented
- Review the PRD: `Solana-Copilot-PRD-v1.md`
- Check logs: `docker-compose logs -f`
- Debug with breakpoints: Use `ipdb` in Python code

---

**Happy coding! 🚀**
