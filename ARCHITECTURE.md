# 🏗 System Architecture

Technical architecture documentation for Solana Copilot.

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [High-Level Architecture](#high-level-architecture)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture](#backend-architecture)
5. [AI Agent Architecture](#ai-agent-architecture)
6. [Data Flow](#data-flow)
7. [Database Schema](#database-schema)
8. [Security Architecture](#security-architecture)
9. [Infrastructure](#infrastructure)

---

## System Overview

Solana Copilot is a full-stack DeFi application that enables users to interact with Solana blockchain through natural language. The system combines:

- **Next.js 15** frontend for the user interface
- **FastAPI** backend for API and business logic
- **LangGraph** for AI agent orchestration
- **Celery** for background task processing
- **PostgreSQL** for persistent storage
- **Redis** for caching and message brokering

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Browser   │  │  Mobile Web │  │    Wallet   │  │   CLI/SDK   │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
│         └────────────────┴────────────────┴────────────────┘            │
└─────────────────────────────────────┬───────────────────────────────────┘
                                      │ HTTPS/WSS
┌─────────────────────────────────────▼───────────────────────────────────┐
│                             FRONTEND LAYER                               │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                     Next.js 15 (React 19)                         │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐     │   │
│  │  │  App Router │ │ Components │ │  Providers │ │  Lib/Utils │     │   │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘     │   │
│  │  ┌──────────────────────────────────────────────────────────┐    │   │
│  │  │  Wallet Adapter  │  React Query  │  Zustand  │  Axios   │    │   │
│  │  └──────────────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────┬───────────────────────────────────┘
                                      │ REST API / WebSocket
┌─────────────────────────────────────▼───────────────────────────────────┐
│                             BACKEND LAYER                                │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                         FastAPI Server                            │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐     │   │
│  │  │  API Routes │ │  Services  │ │   Models   │ │  Schemas   │     │   │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘     │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                       LangGraph AI Agents                         │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐     │   │
│  │  │  Intent    │ │Transaction │ │  Portfolio │ │   Tools    │     │   │
│  │  │ Classifier │ │  Planner   │ │  Analyzer  │ │  (Jupiter) │     │   │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘     │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                      Celery Workers                               │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐                    │   │
│  │  │ DCA Worker │ │ Swap Worker│ │Notification│                    │   │
│  │  └────────────┘ └────────────┘ └────────────┘                    │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────┬───────────────────────────────────┘
                                      │
┌─────────────────────────────────────▼───────────────────────────────────┐
│                              DATA LAYER                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐            │
│  │   PostgreSQL   │  │     Redis      │  │  Solana RPC    │            │
│  │   (Primary DB) │  │ (Cache/Broker) │  │   (Blockchain) │            │
│  └────────────────┘  └────────────────┘  └────────────────┘            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | Next.js 15 (App Router) | SSR, routing, optimization |
| UI Library | React 19 | Component-based UI |
| Styling | TailwindCSS 4 | Utility-first CSS |
| Animation | Framer Motion | Micro-interactions |
| State | Zustand | Global state management |
| Data Fetching | React Query | Server state & caching |
| Wallet | Solana Wallet Adapter | Wallet connection |

### Directory Structure

```
frontend/src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes (login)
│   ├── dashboard/           # Dashboard pages
│   │   ├── page.tsx         # Overview
│   │   ├── portfolio/       # Portfolio page
│   │   ├── automations/     # DCA management
│   │   ├── risk/            # Risk analysis
│   │   └── settings/        # User settings
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── chat/                # Chat components
│   ├── dashboard/           # Dashboard components
│   ├── landing/             # Landing page components
│   ├── providers/           # Context providers
│   └── ui/                  # Shadcn UI components
├── lib/
│   ├── api.ts               # API client
│   ├── utils.ts             # Utilities
│   └── stores/              # Zustand stores
└── types/                   # TypeScript types
```

### Key Components

```tsx
// Component Hierarchy
<RootLayout>
  <QueryProvider>           {/* React Query */}
    <SolanaWalletProvider>  {/* Wallet Context */}
      <AuthProvider>        {/* Auth State */}
        <DashboardLayout>
          <DashboardThemeProvider>
            <DashboardShell>
              <DashboardNav />
              <DashboardHeader />
              <PageContent />
              <ChatWidget />
            </DashboardShell>
          </DashboardThemeProvider>
        </DashboardLayout>
      </AuthProvider>
    </SolanaWalletProvider>
  </QueryProvider>
</RootLayout>
```

---

## Backend Architecture

### Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | FastAPI | Async REST API |
| ORM | SQLAlchemy 2.0 | Database abstraction |
| Migrations | Alembic | Schema management |
| Validation | Pydantic 2.x | Data validation |
| Background | Celery | Task queue |
| AI | LangGraph + LangChain | Agent orchestration |

### Directory Structure

```
backend/app/
├── api/
│   └── v1/
│       ├── auth.py          # Authentication endpoints
│       ├── chat.py          # Chat/AI endpoints
│       ├── portfolio.py     # Portfolio endpoints
│       ├── automations.py   # DCA/automation endpoints
│       ├── transactions.py  # Transaction history
│       └── session_keys.py  # Session key management
├── agents/
│   ├── base_agent.py        # Base agent class
│   ├── intent_classifier.py # Intent classification
│   ├── transaction_planner.py # Transaction planning
│   └── tools/               # Agent tools (Jupiter, etc.)
├── core/
│   ├── config.py            # Settings management
│   └── security.py          # JWT, signatures
├── db/
│   ├── base.py              # SQLAlchemy base
│   └── session.py           # Database session
├── models/
│   └── __init__.py          # SQLAlchemy models
├── schemas/
│   └── __init__.py          # Pydantic schemas
├── services/
│   ├── jupiter.py           # Jupiter API client
│   └── solana.py            # Solana RPC client
├── workers/
│   ├── celery_app.py        # Celery configuration
│   └── tasks/               # Background tasks
└── main.py                  # Application entry
```

### API Design

```
/api/v1/
├── /auth
│   ├── POST /request-challenge  # Get signing nonce
│   ├── POST /verify-signature   # Verify & get JWT
│   ├── GET  /me                 # Current user
│   └── POST /logout             # Logout
├── /chat
│   ├── POST /message            # Send to AI agent
│   └── GET  /history            # Conversation history
├── /portfolio
│   ├── GET  /                   # Holdings
│   ├── GET  /risk               # Risk metrics
│   └── GET  /history            # Value history
├── /automations
│   ├── GET  /                   # List all
│   ├── POST /                   # Create
│   ├── PATCH /{id}              # Update
│   └── DELETE /{id}             # Delete
└── /transactions
    ├── GET  /                   # History
    └── GET  /{id}               # Details
```

---

## AI Agent Architecture

### LangGraph Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER MESSAGE                                │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│                      INTENT CLASSIFIER                             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐         │
│  │   SWAP    │ │    DCA    │ │ PORTFOLIO │ │   OTHER   │         │
│  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘         │
└────────┼─────────────┼─────────────┼─────────────┼────────────────┘
         │             │             │             │
         ▼             ▼             ▼             ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ TRANSACTION │ │ AUTOMATION  │ │  ANALYSIS   │ │   GENERAL   │
│   PLANNER   │ │   PLANNER   │ │   AGENT     │ │   AGENT     │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │               │
       ▼               ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   JUPITER   │ │   CREATE    │ │   QUERY     │ │    LLM      │
│   QUOTE     │ │   CELERY    │ │  PORTFOLIO  │ │  RESPONSE   │
│   + SWAP    │ │    TASK     │ │    DATA     │ │             │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │               │
       └───────────────┴───────────────┴───────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│                         AI RESPONSE                                │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐           │
│  │   Reasoning   │ │   Action      │ │   Transaction │           │
│  │   (why)       │ │   (what)      │ │   (unsigned)  │           │
│  └───────────────┘ └───────────────┘ └───────────────┘           │
└───────────────────────────────────────────────────────────────────┘
```

### Agent Tools

| Tool | Purpose | API |
|------|---------|-----|
| `jupiter_quote` | Get swap quotes | Jupiter Aggregator |
| `jupiter_swap` | Execute swaps | Jupiter Aggregator |
| `get_portfolio` | Fetch holdings | Solana RPC |
| `get_token_price` | Token prices | Birdeye/CoinGecko |
| `analyze_risk` | Risk metrics | Internal calculation |

---

## Data Flow

### Authentication Flow

```
┌────────┐     ┌────────┐     ┌────────┐     ┌────────┐
│ Wallet │────>│ Frontend│────>│ Backend │────>│  Redis  │
└────────┘     └────────┘     └────────┘     └────────┘
   │               │               │               │
   │  1. Connect   │               │               │
   │<──────────────│               │               │
   │               │  2. Request   │               │
   │               │    Challenge  │               │
   │               │──────────────>│  3. Store     │
   │               │               │    Nonce      │
   │               │               │──────────────>│
   │               │  4. Return    │               │
   │  5. Sign      │    Message    │               │
   │    Message    │<──────────────│               │
   │<──────────────│               │               │
   │  6. Signature │               │               │
   │──────────────>│  7. Verify    │               │
   │               │──────────────>│  8. Validate  │
   │               │               │<──────────────│
   │               │  9. JWT Token │               │
   │               │<──────────────│               │
   └───────────────┴───────────────┴───────────────┘
```

### Transaction Flow

```
User Message: "Swap 10 SOL to USDC"
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 1. Intent Classification                                        │
│    Input: "Swap 10 SOL to USDC"                                 │
│    Output: { intent: "swap", params: { from: SOL, to: USDC } }  │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Transaction Planning                                          │
│    - Validate tokens exist                                       │
│    - Check user balance                                          │
│    - Get Jupiter quote                                           │
│    - Calculate expected output                                   │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Return Preview to User                                        │
│    - Show input/output amounts                                   │
│    - Show fees and slippage                                      │
│    - Request signature                                           │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. User Signs Transaction (Client-Side)                          │
│    - Transaction simulated                                       │
│    - Wallet prompts for signature                                │
│    - Signed transaction returned                                 │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Submit to Solana                                              │
│    - Send to RPC                                                 │
│    - Wait for confirmation                                       │
│    - Store in database                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│      USERS      │       │   TRANSACTIONS  │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │──┐    │ id (PK)         │
│ wallet_address  │  │    │ user_id (FK)    │──┐
│ email           │  │    │ action          │  │
│ display_name    │  │    │ source_token    │  │
│ preferences     │  │    │ dest_token      │  │
│ created_at      │  │    │ amount_in       │  │
│ last_login_at   │  │    │ amount_out      │  │
└─────────────────┘  │    │ status          │  │
                     │    │ tx_signature    │  │
                     │    │ ai_reasoning    │  │
                     │    └─────────────────┘  │
                     │                         │
                     │    ┌─────────────────┐  │
                     │    │   AUTOMATIONS   │  │
                     │    ├─────────────────┤  │
                     └───>│ id (PK)         │  │
                          │ user_id (FK)    │<─┘
                          │ automation_type │
                          │ source_token    │
                          │ dest_token      │
                          │ amount          │
                          │ frequency       │
                          │ status          │
                          │ next_execution  │
                          └─────────────────┘
                                   │
                                   ▼
                     ┌─────────────────────────┐
                     │  AUTOMATION_EXECUTIONS  │
                     ├─────────────────────────┤
                     │ id (PK)                 │
                     │ automation_id (FK)      │
                     │ executed_at             │
                     │ input_amount            │
                     │ output_amount           │
                     │ status                  │
                     └─────────────────────────┘
```

---

## Security Architecture

### Authentication

```
┌─────────────────────────────────────────────────────────────────┐
│                    NON-CUSTODIAL AUTH                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. CHALLENGE-RESPONSE                                           │
│     - Server generates random nonce                              │
│     - User signs with wallet private key                         │
│     - Server verifies Ed25519 signature                          │
│                                                                  │
│  2. JWT TOKENS                                                   │
│     - Short-lived access tokens (24h)                            │
│     - Contains wallet address & user ID                          │
│     - HS256 signed with server secret                            │
│                                                                  │
│  3. SESSION KEYS (Optional)                                      │
│     - Scoped permissions (max amount, allowed tokens)            │
│     - Time-limited (user configurable)                           │
│     - Revocable anytime                                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Security Principles

| Principle | Implementation |
|-----------|----------------|
| No Private Keys | All signing happens client-side |
| Transaction Preview | Simulated before signing |
| Scope Limiting | Session keys have spending limits |
| Audit Trail | All transactions logged |

---

## Infrastructure

### Development

```
┌─────────────────────────────────────────────────────────────┐
│                    LOCAL DEVELOPMENT                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   npm run dev                                                │
│       │                                                      │
│       ├── Next.js (localhost:3000)                          │
│       │                                                      │
│       └── Uvicorn (localhost:8000)                          │
│                                                              │
│   docker-compose up -d postgres redis                        │
│       │                                                      │
│       ├── PostgreSQL (localhost:5432)                       │
│       │                                                      │
│       └── Redis (localhost:6379)                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Production

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION DEPLOYMENT                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐                                            │
│  │   Vercel    │  <── Next.js Frontend                      │
│  │   (CDN)     │                                            │
│  └──────┬──────┘                                            │
│         │                                                    │
│         ▼                                                    │
│  ┌─────────────┐     ┌─────────────┐                        │
│  │   Railway   │────>│   Supabase  │  <── PostgreSQL        │
│  │  (Backend)  │     │  (Database) │                        │
│  └──────┬──────┘     └─────────────┘                        │
│         │                                                    │
│         ▼                                                    │
│  ┌─────────────┐     ┌─────────────┐                        │
│  │   Upstash   │     │   Helius    │  <── Solana RPC        │
│  │   (Redis)   │     │   (RPC)     │                        │
│  └─────────────┘     └─────────────┘                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Performance Considerations

| Area | Strategy |
|------|----------|
| Frontend | ISR, Edge caching, Code splitting |
| Backend | Async handlers, Connection pooling |
| Database | Indexes on wallet_address, created_at |
| Caching | Redis for nonces, token prices |
| RPC | Rate limiting, fallback providers |

---

## Monitoring & Observability

| Tool | Purpose |
|------|---------|
| Sentry | Error tracking |
| LangSmith | AI agent tracing |
| Prometheus | Metrics |
| Grafana | Dashboards |

---

<p align="center">
  <strong>Architecture Questions? Open a Discussion!</strong>
</p>
