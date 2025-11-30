# 🚀 Service Startup Guide

## ⚠️ Prerequisites
- **Docker Desktop** must be running (required for Database & Redis)
- **Node.js 18+** & **Python 3.12+**

## 1. Start Infrastructure (Database & Redis)
```bash
cd infrastructure/docker
docker-compose up -d
```

## 2. Start Backend API
```bash
cd backend
# Activate virtual environment (created automatically)
source venv/bin/activate
# Install dependencies (if not already done)
pip install -r requirements.txt
# Start Server
uvicorn app.main:app --reload
```

## 3. Start Celery Workers (Background Tasks)
Open two new terminals:

**Terminal A (Worker):**
```bash
cd backend
source venv/bin/activate
celery -A app.workers.celery_app worker -l info
```

**Terminal B (Scheduler):**
```bash
cd backend
source venv/bin/activate
celery -A app.workers.celery_app beat -l info
```

## 4. Start Frontend (Next.js 16)
```bash
cd frontend
# Install dependencies (if not already done)
npm install --force
# Start Dev Server
npm run dev
```

## 🌐 Access Points
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs
