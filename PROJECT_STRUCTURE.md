# Solana Copilot - Complete Project Structure

```
solana-copilot/
│
├── frontend/                          # Next.js 14 App Router Frontend
│   ├── src/
│   │   ├── app/                      # App Router pages
│   │   │   ├── (auth)/              # Auth group
│   │   │   │   ├── login/
│   │   │   │   └── layout.tsx
│   │   │   ├── (dashboard)/         # Dashboard group
│   │   │   │   ├── dashboard/
│   │   │   │   ├── portfolio/
│   │   │   │   ├── automations/
│   │   │   │   ├── transactions/
│   │   │   │   └── layout.tsx
│   │   │   ├── api/                 # API routes (Next.js API)
│   │   │   │   └── webhooks/
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── page.tsx             # Landing page
│   │   │   └── globals.css
│   │   │
│   │   ├── components/              # React components
│   │   │   ├── ui/                  # Shadcn/UI components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── ...
│   │   │   ├── chat/                # Chat interface
│   │   │   │   ├── ChatInterface.tsx
│   │   │   │   ├── MessageBubble.tsx
│   │   │   │   ├── ChatInput.tsx
│   │   │   │   └── QuickActions.tsx
│   │   │   ├── portfolio/           # Portfolio components
│   │   │   │   ├── PortfolioOverview.tsx
│   │   │   │   ├── HoldingsChart.tsx
│   │   │   │   ├── RiskGauge.tsx
│   │   │   │   └── PerformanceChart.tsx
│   │   │   ├── automations/         # Automation components
│   │   │   │   ├── AutomationCard.tsx
│   │   │   │   ├── DCASetupForm.tsx
│   │   │   │   └── AutomationDashboard.tsx
│   │   │   ├── transactions/        # Transaction components
│   │   │   │   ├── TransactionList.tsx
│   │   │   │   ├── TransactionDetail.tsx
│   │   │   │   └── TransactionPreview.tsx
│   │   │   ├── wallet/              # Wallet components
│   │   │   │   ├── WalletButton.tsx
│   │   │   │   └── WalletProvider.tsx
│   │   │   └── shared/              # Shared components
│   │   │       ├── Navbar.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       └── LoadingSpinner.tsx
│   │   │
│   │   ├── lib/                     # Utility libraries
│   │   │   ├── api/                 # API client
│   │   │   │   ├── client.ts
│   │   │   │   ├── auth.ts
│   │   │   │   ├── portfolio.ts
│   │   │   │   ├── transactions.ts
│   │   │   │   └── automations.ts
│   │   │   ├── solana/              # Solana utilities
│   │   │   │   ├── connection.ts
│   │   │   │   ├── wallet.ts
│   │   │   │   └── transactions.ts
│   │   │   ├── websocket/           # WebSocket client
│   │   │   │   └── chat.ts
│   │   │   └── utils.ts             # General utilities
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── usePortfolio.ts
│   │   │   ├── useAutomations.ts
│   │   │   ├── useTransactions.ts
│   │   │   └── useWebSocket.ts
│   │   │
│   │   ├── store/                   # Zustand state management
│   │   │   ├── authStore.ts
│   │   │   ├── portfolioStore.ts
│   │   │   ├── chatStore.ts
│   │   │   └── automationStore.ts
│   │   │
│   │   ├── types/                   # TypeScript types
│   │   │   ├── api.ts
│   │   │   ├── portfolio.ts
│   │   │   ├── transaction.ts
│   │   │   └── automation.ts
│   │   │
│   │   └── config/                  # Configuration
│   │       ├── constants.ts
│   │       └── env.ts
│   │
│   ├── public/                      # Static assets
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── .env.local                   # Environment variables
│   ├── .env.example
│   ├── next.config.js               # Next.js configuration
│   ├── tailwind.config.ts           # Tailwind configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── package.json
│   └── README.md
│
├── backend/                          # FastAPI Backend
│   ├── app/
│   │   ├── main.py                  # FastAPI application entry
│   │   │
│   │   ├── api/                     # API routes
│   │   │   ├── v1/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth.py          # Authentication endpoints
│   │   │   │   ├── chat.py          # Chat/WebSocket endpoints
│   │   │   │   ├── portfolio.py     # Portfolio endpoints
│   │   │   │   ├── transactions.py  # Transaction endpoints
│   │   │   │   └── automations.py   # Automation endpoints
│   │   │   └── deps.py              # Dependency injection
│   │   │
│   │   ├── core/                    # Core functionality
│   │   │   ├── config.py            # Configuration management
│   │   │   ├── security.py          # Security utilities (JWT, SignMessage)
│   │   │   ├── middleware.py        # Custom middleware
│   │   │   └── exceptions.py        # Custom exceptions
│   │   │
│   │   ├── db/                      # Database
│   │   │   ├── base.py              # SQLAlchemy base
│   │   │   ├── session.py           # Database session
│   │   │   └── init_db.py           # Database initialization
│   │   │
│   │   ├── models/                  # SQLAlchemy models
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── transaction.py
│   │   │   ├── automation.py
│   │   │   ├── portfolio_snapshot.py
│   │   │   └── session_key.py
│   │   │
│   │   ├── schemas/                 # Pydantic schemas
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── transaction.py
│   │   │   ├── automation.py
│   │   │   ├── portfolio.py
│   │   │   └── chat.py
│   │   │
│   │   ├── services/                # Business logic services
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py
│   │   │   ├── portfolio_service.py
│   │   │   ├── transaction_service.py
│   │   │   ├── automation_service.py
│   │   │   └── notification_service.py
│   │   │
│   │   ├── agents/                  # LangGraph AI Agents
│   │   │   ├── __init__.py
│   │   │   ├── base_agent.py        # Base agent class
│   │   │   ├── intent_classifier.py # Intent classification agent
│   │   │   ├── transaction_planner.py # Transaction planning agent
│   │   │   ├── portfolio_analyzer.py # Portfolio analysis agent
│   │   │   └── tools/               # Agent tools
│   │   │       ├── __init__.py
│   │   │       ├── balance_tools.py
│   │   │       ├── swap_tools.py
│   │   │       ├── price_tools.py
│   │   │       └── simulation_tools.py
│   │   │
│   │   ├── integrations/            # External integrations
│   │   │   ├── __init__.py
│   │   │   ├── helius/              # Helius RPC
│   │   │   │   ├── __init__.py
│   │   │   │   ├── client.py
│   │   │   │   └── webhooks.py
│   │   │   ├── jupiter/             # Jupiter Aggregator
│   │   │   │   ├── __init__.py
│   │   │   │   └── client.py
│   │   │   ├── birdeye/             # Birdeye Price Feeds
│   │   │   │   ├── __init__.py
│   │   │   │   └── client.py
│   │   │   └── solana/              # Solana SDK wrapper
│   │   │       ├── __init__.py
│   │   │       ├── client.py
│   │   │       └── transactions.py
│   │   │
│   │   ├── workers/                 # Celery background workers
│   │   │   ├── __init__.py
│   │   │   ├── celery_app.py        # Celery configuration
│   │   │   ├── dca_worker.py        # DCA execution worker
│   │   │   ├── price_worker.py      # Price update worker
│   │   │   └── portfolio_worker.py  # Portfolio snapshot worker
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── __init__.py
│   │   │   ├── logger.py
│   │   │   ├── cache.py             # Redis cache utilities
│   │   │   └── validators.py
│   │   │
│   │   └── tests/                   # Tests
│   │       ├── __init__.py
│   │       ├── conftest.py
│   │       ├── test_api/
│   │       ├── test_services/
│   │       └── test_agents/
│   │
│   ├── alembic/                     # Database migrations
│   │   ├── versions/
│   │   ├── env.py
│   │   └── alembic.ini
│   │
│   ├── .env                         # Environment variables
│   ├── .env.example
│   ├── requirements.txt             # Python dependencies
│   ├── pyproject.toml               # Poetry configuration
│   ├── Dockerfile
│   └── README.md
│
├── programs/                         # Anchor Smart Contracts
│   ├── dca-program/                 # DCA Vault Program
│   │   ├── src/
│   │   │   ├── lib.rs               # Program entry
│   │   │   ├── instructions/        # Instruction handlers
│   │   │   │   ├── mod.rs
│   │   │   │   ├── initialize_dca.rs
│   │   │   │   ├── execute_dca.rs
│   │   │   │   ├── pause_dca.rs
│   │   │   │   ├── resume_dca.rs
│   │   │   │   └── close_dca.rs
│   │   │   ├── state/               # Account state
│   │   │   │   ├── mod.rs
│   │   │   │   └── dca_vault.rs
│   │   │   ├── events/              # Program events
│   │   │   │   ├── mod.rs
│   │   │   │   └── dca_events.rs
│   │   │   ├── errors/              # Custom errors
│   │   │   │   └── mod.rs
│   │   │   └── utils/               # Utility functions
│   │   │       └── mod.rs
│   │   ├── tests/
│   │   │   └── dca_program.ts
│   │   ├── Cargo.toml
│   │   └── Xargo.toml
│   │
│   ├── rebalance-program/           # Rebalancing Program
│   │   ├── src/
│   │   │   ├── lib.rs
│   │   │   ├── instructions/
│   │   │   ├── state/
│   │   │   └── events/
│   │   ├── tests/
│   │   └── Cargo.toml
│   │
│   ├── session-key-program/         # Session Key Program
│   │   ├── src/
│   │   │   ├── lib.rs
│   │   │   ├── instructions/
│   │   │   ├── state/
│   │   │   └── events/
│   │   ├── tests/
│   │   └── Cargo.toml
│   │
│   └── Anchor.toml                  # Anchor workspace config
│
├── shared/                           # Shared code (types, constants)
│   ├── types/
│   │   ├── index.ts
│   │   └── solana.ts
│   └── constants/
│       └── index.ts
│
├── infrastructure/                   # Infrastructure as Code
│   ├── docker/
│   │   ├── docker-compose.yml       # Local development
│   │   ├── docker-compose.prod.yml  # Production
│   │   ├── backend.Dockerfile
│   │   ├── frontend.Dockerfile
│   │   └── nginx.conf
│   │
│   ├── kubernetes/                  # K8s manifests (optional)
│   │   ├── backend/
│   │   ├── frontend/
│   │   └── redis/
│   │
│   └── terraform/                   # Terraform (optional)
│       └── aws/
│
├── scripts/                          # Utility scripts
│   ├── setup.sh                     # Initial setup
│   ├── deploy.sh                    # Deployment script
│   ├── seed_db.py                   # Database seeding
│   └── test_all.sh                  # Run all tests
│
├── docs/                             # Documentation
│   ├── architecture/
│   │   ├── system-overview.md
│   │   ├── agent-flows.md
│   │   └── data-models.md
│   ├── api/
│   │   └── openapi.yaml             # OpenAPI spec
│   ├── deployment/
│   │   ├── local-setup.md
│   │   └── production-deploy.md
│   └── guides/
│       ├── contributing.md
│       └── testing.md
│
├── .github/                          # GitHub workflows
│   └── workflows/
│       ├── backend-ci.yml
│       ├── frontend-ci.yml
│       ├── anchor-ci.yml
│       └── deploy.yml
│
├── .gitignore
├── .env.example                      # Root environment example
├── README.md                         # Root README
├── LICENSE
└── package.json                      # Root package.json (workspaces)
```

## Technology Versions (Latest as of Nov 2024)

### Frontend
- **Next.js**: 14.2.x (App Router)
- **React**: 18.3.x
- **TypeScript**: 5.5.x
- **TailwindCSS**: 3.4.x
- **Shadcn/UI**: Latest
- **Zustand**: 4.5.x
- **@solana/web3.js**: 1.95.x
- **@solana/wallet-adapter**: 0.15.x
- **SWR**: 2.2.x
- **Recharts**: 2.12.x

### Backend
- **Python**: 3.12.x
- **FastAPI**: 0.115.x
- **SQLAlchemy**: 2.0.x
- **Pydantic**: 2.9.x
- **Alembic**: 1.13.x
- **Redis**: 5.2.x
- **Celery**: 5.4.x
- **LangGraph**: 0.2.x
- **LangChain**: 0.3.x
- **Anthropic**: 0.39.x (Claude 3.5 Sonnet)
- **solders**: 0.21.x
- **solana-py**: 0.34.x

### Smart Contracts
- **Anchor**: 0.30.x
- **Rust**: 1.82.x (stable)
- **Solana CLI**: 1.18.x

### Infrastructure
- **PostgreSQL**: 16.x
- **Redis**: 7.4.x
- **Docker**: 27.x
- **Docker Compose**: 2.29.x

## Key Architecture Principles

1. **Domain-Driven Design**: Clear separation between domain logic, services, and infrastructure
2. **Clean Architecture**: Dependencies point inward (UI → Services → Domain → Data)
3. **Modular Monolith**: Organized by feature/domain, not technical layer
4. **Type Safety**: Full TypeScript on frontend, Pydantic on backend, strong typing everywhere
5. **Testability**: Dependency injection, clear interfaces, isolated components
6. **Scalability**: Horizontal scaling ready, stateless services, Redis caching
7. **Security First**: No private keys on server, all transactions simulated, rate limiting
