# Solana Copilot - AI Agent Wallet

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688)](https://fastapi.tiangolo.com/)
[![Anchor](https://img.shields.io/badge/Anchor-0.30-purple)](https://www.anchor-lang.com/)
[![Solana](https://img.shields.io/badge/Solana-1.18-9945FF)](https://solana.com/)

> **Next-generation smart wallet combining autonomous AI agents, natural language interfaces, and blockchain-native automation to simplify Solana financial management.**

## 🌟 Features

### 🤖 Conversational Wallet Control
- Natural language commands: "Swap 20 USDC → SOL", "Analyze my portfolio risk"
- AI-powered intent classification with 95%+ accuracy
- Multi-step transaction orchestration through LangGraph agents

### ⚡ Autonomous Execution
- **DCA (Dollar-Cost Averaging)**: Automated recurring purchases
- **Recurring Swaps**: Schedule regular token swaps
- **Threshold-Based Rebalancing**: Maintain target portfolio allocation
- **Smart Automations**: On-chain execution via Anchor programs

### 📊 Portfolio Intelligence
- Real-time risk analysis and volatility tracking
- PnL computation (realized + unrealized gains)
- Portfolio concentration warnings
- AI-driven rebalancing suggestions

### 🔒 Transaction Safety
- 100% pre-execution simulation
- Multi-level approval flows (low/medium/high risk)
- Session keys for rapid approvals
- Non-custodial architecture (no private keys on server)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js 14)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Chat   │  │Portfolio │  │Automations│  │ Wallet  │   │
│  │Interface │  │Analytics │  │ Dashboard │  │ Adapter │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ WebSocket / REST
┌─────────────────────────────────────────────────────────────┐
│                      Backend (FastAPI)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              LangGraph AI Agents                     │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │  Intent    │→ │Transaction │→ │ Portfolio  │    │  │
│  │  │Classifier  │  │  Planner   │  │  Analyzer  │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Helius   │  │ Jupiter  │  │ Birdeye  │  │  Celery  │  │
│  │   RPC    │  │   Swap   │  │  Prices  │  │ Workers  │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   Solana Blockchain                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ DCA Program  │  │  Rebalance   │  │ Session Key  │     │
│  │   (Anchor)   │  │   Program    │  │   Program    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 20.x or higher
- **Python**: 3.12 or higher
- **Rust**: 1.82 or higher
- **Solana CLI**: 1.18 or higher
- **Anchor CLI**: 0.30 or higher
- **Docker**: 27.x or higher (for local development)
- **PostgreSQL**: 16.x
- **Redis**: 7.4.x

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/solana-copilot.git
cd solana-copilot
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your API keys and configuration
nano .env
```

### 3. Start Infrastructure (Docker)

```bash
cd infrastructure/docker
docker-compose up -d postgres redis
```

### 4. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 5. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 6. Anchor Programs (Optional - for local testing)

```bash
cd programs

# Build all programs
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Run tests
anchor test
```

### 7. Start Celery Workers

```bash
cd backend

# Start Celery worker
celery -A app.workers.celery_app worker --loglevel=info

# Start Celery beat (scheduler)
celery -A app.workers.celery_app beat --loglevel=info
```

---

## 📁 Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed folder organization.

```
solana-copilot/
├── frontend/          # Next.js 16 App Router with TailwindCSS v4
├── backend/           # FastAPI + LangGraph Agents
├── programs/          # Anchor Smart Contracts
├── infrastructure/    # Docker, K8s, Terraform
├── scripts/           # Utility scripts
└── docs/              # Documentation
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.5
- **Styling**: TailwindCSS 3.4 + Shadcn/UI
- **State**: Zustand 4.5
- **Data Fetching**: SWR 2.2
- **Blockchain**: @solana/web3.js 1.95, @solana/wallet-adapter 0.15
- **Charts**: Recharts 2.12

### Backend
- **Framework**: FastAPI 0.115
- **Language**: Python 3.12
- **ORM**: SQLAlchemy 2.0
- **Validation**: Pydantic 2.9
- **AI**: LangGraph 0.2, LangChain 0.3
- **LLM**: Claude 3.5 Sonnet (Anthropic 0.39)
- **Blockchain**: solana-py 0.34, solders 0.21
- **Workers**: Celery 5.4
- **Cache**: Redis 5.2

### Smart Contracts
- **Framework**: Anchor 0.30
- **Language**: Rust 1.82
- **Blockchain**: Solana 1.18

### Infrastructure
- **Database**: PostgreSQL 16
- **Cache**: Redis 7.4
- **Containers**: Docker 27, Docker Compose 2.29
- **Orchestration**: Kubernetes (optional)
- **IaC**: Terraform (optional)

### Integrations
- **RPC**: Helius
- **Swap**: Jupiter Aggregator
- **Prices**: Birdeye + CoinGecko
- **Monitoring**: Sentry, Datadog (optional)

---

## 📖 Documentation

- [Architecture Overview](./docs/architecture/system-overview.md)
- [API Documentation](./docs/api/openapi.yaml)
- [Local Setup Guide](./docs/deployment/local-setup.md)
- [Production Deployment](./docs/deployment/production-deploy.md)
- [Contributing Guide](./docs/guides/contributing.md)
- [Testing Guide](./docs/guides/testing.md)

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest app/tests/ -v --cov=app
```

### Frontend Tests
```bash
cd frontend
npm run test
```

### Anchor Tests
```bash
cd programs
anchor test
```

### E2E Tests
```bash
npm run test:e2e
```

---

## 🚢 Deployment

### Railway (Recommended for MVP)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway up

# Deploy frontend
cd frontend
railway up
```

### Docker Production

```bash
cd infrastructure/docker
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

See [Production Deployment Guide](./docs/deployment/production-deploy.md)

---

## 🔐 Security

- **Non-Custodial**: No private keys stored on server
- **SignMessage Auth**: Wallet-based authentication
- **Transaction Simulation**: 100% pre-execution validation
- **Session Keys**: Scoped, time-limited approvals
- **Rate Limiting**: 100 req/min per wallet
- **OFAC Screening**: Optional compliance module
- **Audit Trail**: Complete transaction logging

### Security Audits
- Smart contracts audited by [CertiK/Trail of Bits] (pending)
- Bug bounty program: [Link] (pending)

---

## 📊 Roadmap

### Phase 0: MVP (Weeks 1-8) ✅
- [x] Chat-based swap interface
- [x] Wallet authentication
- [x] Portfolio view
- [x] Transaction simulation

### Phase 1: Alpha (Weeks 9-16) 🚧
- [ ] DCA automation (Anchor program)
- [ ] Portfolio risk analysis
- [ ] Session keys
- [ ] Email notifications

### Phase 2: Beta (Weeks 17-24) 📋
- [ ] Multi-sig integration (DAOs)
- [ ] Public REST API
- [ ] Custom agent framework
- [ ] Advanced risk analytics

### Phase 3: GA (Month 7+) 🔮
- [ ] Cross-chain support (Ethereum, Polygon)
- [ ] AI agent marketplace
- [ ] Institutional compliance suite
- [ ] Decentralized governance

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/guides/contributing.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Solana Foundation](https://solana.com/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [LangChain](https://www.langchain.com/)
- [Jupiter Aggregator](https://jup.ag/)
- [Helius](https://helius.dev/)

---

## 📞 Contact

- **Website**: [solanacopilot.com](https://solanacopilot.com)
- **Twitter**: [@SolanaCopilot](https://twitter.com/SolanaCopilot)
- **Discord**: [Join our community](https://discord.gg/solanacopilot)
- **Email**: support@solanacopilot.com

---

## ⚠️ Disclaimer

Solana Copilot is not financial advice. Cryptocurrency transactions are non-reversible and subject to smart contract risks. Use at your own risk. No custody of user funds. Always verify transactions before signing.

---

**Built with ❤️ by the Solana Copilot Team**
