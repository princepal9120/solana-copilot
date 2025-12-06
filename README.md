# 🚀 Solana Copilot

**AI-Powered DeFi Agent for Solana** - Execute trades, analyze portfolios, and automate strategies through natural language.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF?logo=solana)](https://solana.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ Features

### 🤖 AI-Powered Chat Interface
- **Natural Language Commands**: "Swap 10 SOL to USDC", "Show my portfolio", "Set up weekly DCA"
- **Intent Classification**: LangGraph-powered agent understands user intent
- **Transaction Simulation**: Preview exact outputs before signing

### 💼 Portfolio Management
- **Real-time Holdings**: View all tokens with live prices
- **Risk Analysis**: Volatility, max drawdown, Value-at-Risk (95%)
- **Performance Tracking**: PnL, 24h/7d/30d changes

### 🔄 DCA & Automation
- **Dollar-Cost Averaging**: Automated recurring buys
- **Recurring Swaps**: Schedule token exchanges
- **Portfolio Rebalancing**: Maintain target allocations

### 🔐 Security
- **Non-Custodial**: Sign-only authentication, no private keys stored
- **Session Keys**: Scoped, time-limited transaction approvals
- **Transaction Preview**: Full simulation before execution

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, TailwindCSS 4, Framer Motion |
| **Backend** | FastAPI, LangGraph, LangChain, Celery |
| **Database** | PostgreSQL 16, Redis 7 |
| **Blockchain** | Solana (Devnet), Jupiter, Orca, Raydium |
| **AI** | Anthropic Claude, OpenAI GPT-4 |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.12+
- Docker & Docker Compose
- Solana CLI (optional)

### 1. Clone & Install

```bash
git clone https://github.com/your-org/solana-copilot.git
cd solana-copilot

# Install all dependencies (npm workspaces)
npm install

# Install Python dependencies
pip install -r backend/requirements.txt
```

### 2. Environment Setup

```bash
# Copy example env file
cp .env.example .env

# Edit with your API keys
nano .env
```

Required environment variables:
- `ANTHROPIC_API_KEY` - For Claude AI
- `OPENAI_API_KEY` - For GPT-4 (optional)
- `JWT_SECRET` - Generate with `openssl rand -hex 32`

### 3. Start Services

```bash
# Start PostgreSQL & Redis
docker-compose up -d postgres redis

# Run database migrations
cd backend && alembic upgrade head && cd ..

# Start development servers
npm run dev
```

### 4. Access Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |

---

## 📁 Project Structure

```
solana-copilot/
├── frontend/                 # Next.js 15 application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   └── lib/             # Utilities & API clients
│   └── package.json
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── agents/          # LangGraph AI agents
│   │   ├── api/v1/          # REST endpoints
│   │   ├── core/            # Config & security
│   │   ├── models/          # SQLAlchemy models
│   │   └── services/        # Business logic
│   └── requirements.txt
├── docker-compose.yml        # Container orchestration
├── package.json              # Root workspace config
└── README.md
```

---

## 📖 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design & data flow
- **[SETUP.md](./SETUP.md)** - Detailed setup & deployment guide
- **[API Reference](http://localhost:8000/docs)** - OpenAPI/Swagger docs

---

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/request-challenge` | Get signing challenge |
| POST | `/api/v1/auth/verify-signature` | Verify signature & get JWT |
| GET | `/api/v1/auth/me` | Get current user |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/chat/message` | Send message to AI agent |
| GET | `/api/v1/chat/history` | Get conversation history |

### Portfolio
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/portfolio` | Get portfolio holdings |
| GET | `/api/v1/portfolio/risk` | Get risk analysis |

### Automations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/automations` | List automations |
| POST | `/api/v1/automations` | Create automation |
| DELETE | `/api/v1/automations/{id}` | Delete automation |

---

## 🧪 Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && pytest -v

# E2E tests
npm run test:e2e
```

---

## 🚢 Deployment

See **[SETUP.md](./SETUP.md)** for full deployment instructions.

**Quick Docker deployment:**
```bash
docker-compose up -d
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Solana](https://solana.com/) - Blockchain infrastructure
- [Jupiter](https://jup.ag/) - DEX aggregation
- [LangChain](https://langchain.com/) - AI framework
- [Anthropic](https://anthropic.com/) - Claude AI

---

<p align="center">
  <strong>Built with ❤️ for the Solana ecosystem</strong>
</p>
