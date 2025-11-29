# SOLANA COPILOT – AI AGENT WALLET Table of Contents

Product Requirements Document (PRD)  
EXECUTIVE SUMMARY  
PRODUCT VISION & MISSION  
COREVALUE PROPOSITION  
- TARGET USERS & PERSONAS  
- USER PAIN POINTS  
PROBLEM STATEMENT  
HIGH-LEVEL PRODUCT GOALS  
- DETAILED FEATURES  
- Pseudo-code for Transaction Planner Agent  
Build graph  
- Add edges  
- Compile and run  
- FastAPI session key management  
- FastAPI backend  
- Middleware for protecting endpoints

DETAILED USER STORIES  
SYSTEM ARCHITECTURE  
o TECHNICAL ARCHITECTURE

main.py.  
- Initialize services  
- Initialize agents  
CORS  
AUTH ROUTES  
CHAT / TX EXECUTION  
PORTFOLIO ROUTES  
- AUTOMATION ROUTES  
- TRANSACTION HISTORY  
- HEALTH CHECK  
workers/celeery.py.  
DCA EXECUTION WORKER  
PRICE UPDATE WORKER  
- PORTFOLIO SNAPSHOT WORKER  
- TASK SCHEDULING  
- agents/transaction_planner.py.

State definition  
- Tool definitions  
- Node definitions  
- Router functions  
Build graph  
Usage

o API SPECIFICATIONS  
o FRONTEND REQUIREMENTS  
NON-FUNCTIONAL REQUIREMENTS  
o DEPENDENCIES & INTEGRATIONS  
DATA MODELS  
RISK ANALYSIS & MITIGATION  
o LEGAL/COMPLIANCE CONSIDERATIONS  
O SUCCESS METRICS (KPIs).  
o RELEASE PLAN  
o APPENDICES

Get SOL balance  
Get SPL token balance  
- Wait for confirmation

o CONCLUSION

# Product Requirements Document (PRD)

Document Version: 1.0

Last Updated: November 29, 2025

Status: Ready for Engineering

Audience: Engineering, Product, Design, AI/ML Teams

# EXECUTIVE SUMMARY

Solana Copilot is a next-generation smart wallet that combines autonomous AI agents, natural language interfaces, and blockchain-native automation to simplify Solana financial management for all user segments—from absolute beginners to sophisticated traders.

# Problem

Currently, Solana users face fragmentation: multiple wallets, manual transaction execution, complex DeFi interaction patterns, and high cognitive overhead when managing portfolios. There is no unified, AI-powered interface that understands natural language commands and autonomously manages onchain assets.

# Solution

Solana Copilot provides:

- Conversational Wallet Control: "Swap 20 USDC → SOL", "Analyze my portfolio risk"  
- Autonomous Execution: Multi-step transaction orchestration through AI agents  
- Smart Automations: DCA, recurring swaps, threshold-based rebalancing (on-chain via Anchor program)

- Portfolio Intelligence: Real-time risk analysis, volatility tracking, PnL computation  
- Transaction Safety: Simulation, approval flows, session key management

# Target Market

- Immediate (MVP): Solana retail traders, DeFi enthusiasts, portfolio managers (10K-100K users, Year 1)  
Mid-term: DAOs, institutional treasuries seeking automated workflows  
- Long-term: Cross-chain expansion, API marketplace for integrations

# Key Metrics

- Adoption:  $50\mathrm{K}+$  wallets created in Year 1  
- DAU: 5K+ daily active users (Month 6)  
- Automation Volume:  $\$ {50}\mathrm{M} +$  in DCA + scheduled swaps monthly (Year 1 end)  
Revenue:  $0.1\%$  fee on automated transaction volumes

# PRODUCT VISION & MISSION

# Vision

"Democratize sophisticated portfolio management through conversational AI, making Solana financial operations as simple as natural language."

# Mission

1. Remove technical barriers to DeFi participation for mainstream users  
2. Provide institutional-grade automation for onchain treasury management  
3. Build trust through transparency, simulation, and human oversight  
4. Create a composable AI agent framework enabling third-party integrations

# Guiding Principles

- User-Centric: Every feature must reduce cognitive load or unlock new capabilities  
- Security First: All financial operations secured by cryptographic signatures, with no private key compromise  
- Determinism: All transactions must be fully simulated before on-chain execution  
- Auditability: Complete transaction history, AI reasoning logs, and approval trails  
- Extensibility: Open APIs for wallet integrations, third-party agent plugins, and automation workflows

# CORE VALUE PROPOSITION

# For Retail Traders

- Complexity Reduction: Execute swaps, stakes, and portfolio rebalancing via plain English  
- Time Savings: Automate repetitive tasks (DCA, threshold-based swaps) without manual intervention  
- Intelligence: Portfolio risk analysis, volatility alerts, AI-driven rebalancing suggestions

# For Beginners

- Guided Onboarding: AI explains each transaction step-by-step  
- Safe Defaults: Transaction simulation and approval flows prevent costly mistakes  
- Education: AI rationale provides real-time financial education

# For Developers

- REST API: Integrate Copilot automation into bots, DAOs, wallets  
- Agent Framework: Build custom agents on LangGraph + Solana SDK  
Webhooks: Real-time transaction notifications and automation triggers

# For DAO Treasuries

- Multi-Sig Integration: Copilot respects DAO governance for all actions  
- Reporting: Automated treasury reports with risk analysis and execution logs  
- Compliance: Full audit trail for regulatory requirements

# TARGET USERS & PERSONAS

# Persona 1: "Alex, the Active Trader"

Demographics: 25-40, tech-savvy,  $10K-$ 100K in crypto assets  
- Goals: Optimize portfolio returns, reduce manual trading time, access advanced analytics  
- Pain Points: Fragmented tooling, manual rebalancing, risk blindness  
- Use Cases: DCA into blue chips, tactical rebalancing, risk hedging  
- Adoption Path: Start with chat-based swaps  $\rightarrow$  DCA automation  $\rightarrow$  custom agent rules

# Persona 2: "Jamie, the Beginner"

Demographics: 20-35, new to crypto, $100-$10K in assets  
- Goals: Understand how to invest, avoid mistakes, learn gradually  
- Pain Points: Complex interfaces, fear of losing funds, lack of guidance  
- Use Cases: Simple swaps with AI guidance, educational portfolio tracking  
- Adoption Path: Guided chat → simple automations → deeper DeFi exploration

# Persona 3: "Morgan, the DAO Treasurer"

Demographics: 30-50, institutional context,  $1M-$ 100M+ assets  
- Goals: Automate treasury operations, maintain governance compliance, audit everything  
- Pain Points: Manual workflows, governance coordination, reporting overhead  
- Use Cases: Multi-sig DCA, rebalancing governed by DAO parameters, treasury reporting  
- Adoption Path: Import existing treasury  $\rightarrow$  set governance rules  $\rightarrow$  deploy automation

# Persona 4: "Dev, the Builder"

Demographics: 25-40, technical, building bots/DAOs  
- Goals: Integrate advanced automation into products, reduce engineering overhead  
- Pain Points: Fragmented Solana APIs, complex agent orchestration, state management  
- Use Cases: Bot trading strategies, liquidation prevention, automated liquidator bots  
- Adoption Path: API exploration  $\rightarrow$  custom agent build  $\rightarrow$  production deployment

# USER PAIN POINTS

# Critical Pain Points

<table><tr><td>Pain Point</td><td>Impact</td><td>Severity</td></tr><tr><td>Fragmented Wallets</td><td>Users juggle 3–5 apps (Phantom, Magic Eden, Jupiter, Orca)</td><td>High</td></tr><tr><td>Manual DeFi Operations</td><td>Time-consuming swaps, stakes, rebalancing (30+ min/week)</td><td>High</td></tr><tr><td>Opaque Risk</td><td>No portfolio-level risk visibility or volatility warnings</td><td>High</td></tr><tr><td>Transaction Failures</td><td>Insufficient balance, slippage, expired quotes waste time</td><td>High</td></tr><tr><td>Complex Automation Setup</td><td>DAOs/treasuries use custom scripts or external automation</td><td>Medium</td></tr><tr><td>No Audit Trail</td><td>Treasury managers cannot justify transaction history</td><td>Medium</td></tr><tr><td>Governance Friction</td><td>DAOs struggle to coordinate multi-sig approvals</td><td>Medium</td></tr><tr><td>Fear of Mistakes</td><td>Beginners hesitate to transact due to UI complexity</td><td>Medium</td></tr></table>

# Secondary Pain Points

- Onchain state complexity (finding best route, calculating fees)  
- Historical analysis inaccessibility (no portfolio PnL tracking)  
- No standardized agent framework (everyone builds custom automation)

# PROBLEM STATEMENT

# Current State Analysis

Problem: Solana users lack a unified, intelligent interface to manage their financial lifecycle. Current solutions are fragmented:

1. Wallet Management: Phantom, Magic Eden → no automation, no portfolio insights  
2. Swaps: Jupiter, Orca  $\rightarrow$  manual routing, no AI assistance  
3. Portfolio Tracking: DefiLlama, Solscan  $\rightarrow$  read-only, no actionable insights  
4. Automation: Custom scripts or manual repeating tasks (high time cost)  
5. DAOs/Treasuries: Multisig wallets + custom off-chain tooling (no standardization)

# Root Causes:

- Solana ecosystem optimized for low-level operations (RPC calls, program invocations)  
- No abstraction layer for natural language financial operations

- Automation tied to specific use cases (no generalized framework)  
- No standardized audit/compliance workflows for institutional users

# Opportunity

The AI + Solana intersection is immediate: LLMs can parse financial intent  $\rightarrow$  LangGraph can orchestrate multi-step workflows  $\rightarrow$  Anchor programs can execute autonomous, onchain logic.

# Market Validation:

- Solana has  $\$ 2B+$  in active DeFi TVL and  $2M+$  monthly active wallets  
- AI agent infrastructure (LangGraph, Claude 3.5) is now production-ready  
- DAO treasury management is a $100M+ TAM (underserved segment)

# HIGH-LEVEL PRODUCT GOALS

# SHORT TERM (Months 1-3: MVP)

<table><tr><td>Goal</td><td>Metric</td><td>Owner</td></tr><tr><td>Core chat interface for wallet actions</td><td>100 transactions via chat</td><td>Product</td></tr><tr><td>Basic swaps, sends, stake queries</td><td>95%+ transaction success rate</td><td>Backend</td></tr><tr><td>Portfolio balance aggregation</td><td>&lt;2s balance fetch across 50 tokens</td><td>Backend</td></tr><tr><td>Transaction simulation</td><td>100% pre-execution simulation accuracy</td><td>Backend</td></tr><tr><td>User authentication via SignMessage</td><td>Secure, non-custodial auth</td><td>Backend</td></tr><tr><td>Devnet deployment and testing</td><td>0 critical security issues</td><td>Security</td></tr></table>

# MID TERM (Months 3-6: V1)

<table><tr><td>Goal</td><td>Metric</td><td>Owner</td></tr><tr><td>DCA automation (Anchor program)</td><td>500+ active DCAs</td><td>Engineering</td></tr><tr><td>Recurring swaps automation</td><td>1K+ recurring swaps deployed</td><td>Engineering</td></tr><tr><td>Portfolio risk scoring</td><td>&lt;1s risk analysis per portfolio</td><td>AI</td></tr><tr><td>Multi-token portfolio view</td><td>&lt;3s load time, live price updates</td><td>Frontend</td></tr><tr><td>DAO multi-sig integration</td><td>10+ DAOs using Copilot</td><td>Product</td></tr><tr><td>Public API for developer integrations</td><td>5+ third-party integrations</td><td>Platform</td></tr><tr><td>Mainnet launch</td><td>10K+ users, $10M+ automation volume</td><td>Product</td></tr></table>

# LONG TERM (Months 6-12: V2)

<table><tr><td>Goal</td><td>Metric</td><td>Owner</td></tr><tr><td>Cross-chain support (Ethereum, Polygon)</td><td>Expand to 3 chains, 10K+ users/chain</td><td>Engineering</td></tr><tr><td>Advanced AI agents (yield farming, liquidations)</td><td>20+ specialized agents available</td><td>AI</td></tr><tr><td>AI agent marketplace</td><td>50+ community-built agents</td><td>Platform</td></tr><tr><td>Institutional compliance suite</td><td>SOC 2, audit-ready architecture</td><td>Security</td></tr><tr><td>$100M+ in automated volumes</td><td>50K+ active users, $10M/month automation</td><td>Product</td></tr><tr><td>Decentralized governance (SCP token)</td><td>DAO-governed product roadmap</td><td>Product</td></tr></table>

# DETAILED FEATURES

# Feature 1: Conversational Wallet Actions

Description: Users type or speak natural language commands to execute wallet operations.

# Supported Operations:

- Swaps: "Swap 20 USDC for SOL at best price", "Sell  $50\%$  of my ORCA"  
- Sends: "Send 5 SOL to Alice.sol", "Transfer $500 USDC to treasury"  
Stakes: "Stake 10 SOL to Marinade", "Unstake my MSOL"  
- Portfolio Queries: "What's my top performing token?", "Show my USD balance"  
- Automation Setup: "Create a daily $100 USDC → SOL swap"

# User Flow:

1. User types: "Swap 20 USDC → SOL"  
2. AI Intent Classifier parses the command

3. Transaction Planner Agent:

o Queries user's USDC balance  
- Fetches current SOL/USDC price via Birdeye  
- Routes swap via Jupiter API  
- Simulates transaction on Solana RPC

4. System displays: "I'll swap 20 USDC for  $\sim 0.024$  SOL (current price). Estimated gas: 0.00005 SOL. Approve?"  
5. User signs transaction (SignMessage flow, no private key exposure)  
6. AI executes on-chain transaction  
7. Transaction logged with reasoning trail in database

# Technical Requirements:

- Intent classification accuracy: >95% (OpenAI GPT-4 or Claude 3.5)  
- Transaction simulation:  $100\%$  accuracy before execution  
Response latency:  $< 3$  seconds (chat  $\rightarrow$  approval screen)  
- Support for  $50+$  token pairs initially

# Security Constraints:

- All transactions simulated before on-chain execution  
- User must explicitly approve each transaction  
- Session keys used for rapid approvals (user can disable anytime)  
- Private keys never leave user device

# Feature 2: Wallet Automation (DCA, Recurring Swaps)

Description: Users set up recurring, autonomous transactions without manual intervention.

# Types of Automations:

# 1. Dollar-Cost Averaging (DCA)

Example: "Every Monday, swap $100 USDC → SOL"  
- Execution: On-chain Anchor program triggers via Switchboard oracles (or cron job initially)

# 2. Recurring Swaps

Example:"Every day at 9 AM UTC, swap 5 ORCA  $\rightarrow$  USDC"  
- Execution: Off-chain Helius webhook + FastAPI trigger

# 3. Threshold-Based Swaps

Example: "If SOL goes below  $150, buy$ 500 worth"  
Execution: Helius price webhook + AI decision engine

# 4. Rebalancing

Example: "Maintain 50% SOL, 40% USDC, 10% ORCA; rebalance if drift >5%"  
- Execution: Daily cron job + AI rebalancing logic

# Smart Contract Architecture (Anchor):

```rust
// DCA Vault Account  
pub struct DcaVault {  
    pub owner: Pubkey, // User's wallet  
    pub sourcemint: Pubkey, // USDC mint  
    pub destmint: Pubkey, // SOL mint  
    pub amount_per_interval: u64,  
    pub intervalalseconds: u64,  
    pub last_execution: i64,  
    pub total被执行: u64,  
    pub paused: bool,  
}  
// PDA: seeds = ["dca", owner, sourcemint, destmint]
```

# Execution Flow:

1. User creates DCA vault via Copilot chat: "Create a $100 SOL DCA"  
2. AI Transaction Planner creates Anchor instruction  
3. User signs transaction (session key or explicit signature)  
4. Anchor program initializes DcaVault account (PDA)  
5. Every 24 hours, Switchboard oracle/cron job triggers execution:

o Verify interval elapsed  
o Fetch current SOL/USDC price  
o Simulate swap via Jupiter API  
- Execute swap onchain  
o Update last_execution and total_executed  
- Emit DcaExecuted event

6. Off-chain indexer (Helius webhooks) logs execution in PostgreSQL

# Data Model (PostgreSQL):

```sql
CREATE TABLE automata ( id UUID PRIMARY KEY, user_addressVARCHAR(44), automation_typeENUM('dca', 'recurring_swap', 'rebalance'), source_tokenVARCHAR(44), dest_tokenVARCHAR(44), amount DECIMAL(20, 2), frequencySeconds INT, created_at TIMITAMP, last_executed_at TIMITAMP, next_execution_at TIMITAMP, statusENUM('active', 'paused', 'completed'), vault_pdaVARCHAR(44), --Anchor PDA total_volume_usd Decimal(20, 2), execution_count INT, metadata JSONB);   
CREATE TABLE automation executions ( id UUID PRIMARY KEY, automation_id UUID REFERENCES automata(id), executed_at TIMITAMP, input_amount DECIMAL(20, 2), output_amount DECIMAL(20, 2), price_at被执行 DECIMAL(20, 8), transaction_hashVARCHAR(128), gas_fee DECIMAL(20, 8), statusENUM('success', 'failed'), error_message TEXT);
```

# User Experience:

Chat: "Set up a $100 weekly DCA from USDC to SOL"  
Confirmation: "I'll execute a $100 USDC → SOL swap every Monday at 00:00 UTC. View vault [link]"  
- Automation Dashboard: Shows all active automations, next execution times, historical volume  
- Pause/Resume/Delete: Simple one-click controls

# Feature 3: Portfolio Analysis (PnL, Volatility, Risk)

Description: AI agent analyzes user's token holdings, calculates returns, and provides risk insights.

# Portfolio Metrics:

# 1. Holdings Summary

Total portfolio value in USD  
Per-token breakdown (% allocation)  
Cost basis vs. current price (PnL in USD + %)

# 2. Performance Metrics

Realized gains/losses (from historical transactions)  
Unrealized gains/losses (current holdings vs. entry price)  
1-day, 7-day, 30-day returns

# 3. Risk Metrics

o Portfolio volatility (90-day standard deviation)  
Max drawdown (90-day)  
Value at Risk (VaR, 95% confidence)  
o Concentration risk (% in top 3 tokens)  
Correlation analysis between tokens

# Al Portfolio Analysis Agent:

```txt
Agent: Portfolio Analysis Agent
- Node 1: Fetch Holdings
- Query Solana RPC + SPL Token metadata
- Output: [ { mint, amount, decimals } ]
- Node 2: Fetch Historical Prices
- Query Birdye API (90 days of OHLCV)
- Cache in Redis for performance
- Output: [ { date, open, high, low, close } ]
- Node 3: Calculate PnL
- Query entry prices from transaction history
- Compute realized + unrealized gains
- Output: { total_gain_usd, total_gain_pct, realized, unrealized }
- Node 4: Risk Calculation
- Compute volatility, max drawdown, VaR
- Analyze correlation matrix
- Output: { volatility, max_dd, var_95, concentration_risk }
- Node 5: Generate Insights
- LLM generates human-readable analysis
- Highlight risks: "High concentration in ORCA (65% of portfolio)" 
- Suggest actions: "Consider rebalancing to reduce volatility"
- Output: { summary, risks, recommendations }
- END: Return full portfolio report
```

# Example Output:

```json
{
    "portfolio.summary": {
        "total_usd": 15000,
        "token_count": 5,
        "updated_at": "2025-11-29T16:30:00Z"
   },
    "holdings": [
        "mint": "EPjFWaJP...",
        "symbol": "USDC",
        "amount": 5000,
        "price_usd": 1.00,
        "value_usd": 5000,
        "allocation_pct": 33.3,
        "pnl_usd": 0,
        "pnl_pct": 0
   ],
    "mint": "So11111...",
    "symbol": "SOL",
    "amount": 50,
    "price_usd": 200,
```

```csv
"value_usd": 10000,
	"allocation_pct": 66.7,
	"pn1_usd": 2000,
	"pn1_pct": 25
\}
", performance": \{
	"total_pnl_usd": 2000,
	"total_pnl_pct": 15.4,
	"realized_gains_usd": 500,
	"unrealized_gains_usd": 1500,
	"return_1d_pct": 2.1,
	"return_7d_pct": 5.3,
	"return_30d_pct": 12.1
\},
"risk": \{
	"volatility_90d_pct": 8.5,
	"max_drawdown_90d_pct": -12.3,
	"var_95_usd": 1850,
	"concentration_top3_pct": 95.8,
	"risk_level": "medium"
\},
"ai_insights": \{
	summary": "Your portfolio has strong recent performance (+15.4% YTD) but high concent:
	"risks": [ "High SOL concentration exposes you to single-token risk",
	"Portfolio recovered from a -12.3% drawdown in late October; consider protecting gain"
	], "recommendations": [ "Rebalance to 50% SOL / 30% USDC / 20% other diversified tokens",
	"Consider setting a stop-loss at $180 SOL to protect recent gains",
	"Explore yield opportunities in USDC (Marinade, Save)"
```

# Frontend Display:

- Dashboard Widgets:

- Portfolio value chart (30-day history)  
Holdings donut chart  
- Risk gauge (low / medium / high)  
o AI insights card with recommendation buttons

Detailed Pages:

Holdings table (token, amount, price, % allocation, PnL)  
o Performance chart (value over time)  
- Risk analysis dashboard (volatility, drawdown, VaR)  
Rebalancing simulator (drag tokens to rebalance)

# Feature 4: Risk Scoring & AI Insights

Description: Real-time risk assessment and AI-driven recommendations.

# Risk Scoring Framework:

```txt
Risk Score  $=$  0-100 scale Holdings Concentration (0-40 pts)
```

```txt
If top token &gt; 70%: +35 pts  
If top 3 tokens &gt; 90%: +20 pts  
Volatility (0-30 pts)  
90-day std dev &lt; 5%: +5 pts (low risk)  
90-day std dev 5-15%: +15 pts (medium risk)  
90-day std dev &gt; 15%: +30 pts (high risk)  
Drawdown (0-20 pts)  
Max DD &lt; 5%: +3 pts  
Max DD 5-20%: +10 pts  
Max DD &gt; 20%: +20 pts  
Correlation (0-10 pts)  
High correlation (&gt; 0.8) with other holdings: +7 pts  
Net Result: Risk_Score = sum of points  
Risk Level:  
0-25: Low Risk (conservative portfolio)  
26-50: Medium Risk (balanced portfolio)  
51-75: High Risk (aggressive portfolio)  
76-100: Very High Risk (speculative portfolio)
```

# AI Insight Types:

1. Volatility Alerts: "SOL volatility increased 40% week-over-week"  
2. ConcentrationWarnings:"Your portfolio is  $70\%$  SOL;consider diversifying"  
3. Drawdown Recovery: "Portfolio recovered from -15% drawdown; good timing to take profits"  
4. Rebalancing Suggestions: "Based on your 50/40/10 target, recommend rebalancing now"  
5. Yield Opportunities: "USDC is earning  $5\%$  on Marinade; your USDC earns  $0\%$ "  
6. Tax Loss Harvesting: "Consider realizing losses on COPE to offset $500 gain"

# Notification Delivery:

In-app alerts (dashboard badge)  
- Email digest (daily/weekly)  
- Push notifications (high-risk changes only)  
- Slack webhook (for DAOs)

# Feature 5: Transaction Simulation

Description: Every transaction is simulated on-chain before execution to prevent errors.

# Simulation Flow:

1. AI Transaction Planner generates transaction instructions  
2. FastAPI calls Solana RPC simulateTransaction endpoint

3. Simulation returns:

Execution success/failure  
Gas fee estimate  
Output amounts (for swaps)  
- Error messages (if any)

4. Results displayed to user before signing

5. User approves or modifies parameters

Simulation Example (Swap 20 USDC  $\rightarrow$  SOL):

```txt
{ "request": { "source_token":"EPjFWaJP...", "dest_token":"So11111...", "amount_in":20000000, "slippage_bps":100 }; "simulation_result":{ "status":"success", "amount_out":47850000, "price_impact_pct":0.05, "min_amount_out":47423500, "gas Estimate_lamports":5000, "gas Estimate_usd":0.0015, "execution_time_ms":450, " warnings":[] }; "user_display":"Swap 20 USDC for  $\sim 0.048$  SOL.Fee:0.0015 USD.Price impact:  $0.05\%$  .Appro
```

# Error Handling:

Insufficient balance: "You only have 15 USDC; need 20 USDC + 0.005 SOL for gas"  
- Slippage too high: "Current price impact 1.5% exceeds your 1% slippage limit"  
Network congestion: "Network is congested; recommended fee is 0.001 SOL"

# Performance Targets:

- Simulation latency:  $< 1$  second  
99.9% simulation accuracy (matches actual on-chain execution)

# Feature 6: Transaction Planner Agent

Description: Multi-step orchestration of complex financial workflows.

# Agent Capabilities:

1. Route Optimization (for swaps)

Calls Jupiter API for best swap route  
- Compares prices across Orca, Raydium, Marinade  
- Selects route with best price + lowest fees

2. Multi-Step Transactions (for staking + delegation)

Unstake MSOL  $\rightarrow$  SOL  
- Redelegate SOL to new validator  
Restake to Marinade in one workflow

3. Feedback Logic

Primary swap fails: Try secondary route  
- Token not found: Suggest closest alternative  
- Insufficient liquidity: Offer partial swap or split across multiple routes

# 4. Parameter Optimization

- User says "Swap SOL to USDC": Planner determines amount based on available balance  
User says "Stake my SOL": Planner calculates optimal staking protocol (Marinade vs. Jito)

LangGraph Agent Definition:  
```txt
Pseudo-code for Transaction Planner Agent</a>
```

```python
from langgraph.graph import StateGraph from typing import QualifiedDict
```

```txt
class TransactionState(TypedDict):
```

```txt
user(intent: str  
parsed_action: str  
source_token: str  
dest_token: str  
amount: float  
route-options: list  
selected-route: dict  
simulation_result: dict  
approval_status: bool  
tx_signature: str
```

```python
def node_scan(intent(state: TransactionState):
    # LLM parses user intent -&gt; action, tokens, amount
    # Output: parsed_action, source_token, dest_token, amount
    pass
```

```python
def node_fetch-route(state: TransactionState):
    # Call Jupiter API / RPC for best route
    # Output: route_options (list of possible execution paths)
    pass
```

```python
def node_rank_routines(state: TransactionState):
    # Evaluate routes by price, fees, execution time
    # Output: selected-route (best option)
    pass
```

```python
def node_simulate_tx(state: TransactionState):
    # Simulate transaction on-chain
    # Output: simulation_result with success/false
    pass
```

```python
def node await approval(state: TransactionState):
    # Wait for user approval via chat/UI
    # Output: approval.status
    pass
```

```python
def node_execute_tx(state: TransactionState):
    # Submit signed transaction to chain
    # Output: tx_signature
    pass
```

```txt
Build graph  $<  a > <   / a>$    
graph  $\equiv$  StateGraph(TransactionState)   
graph.add_node("parseintent",node_scanintent)   
graph.add_node("fetch-route",node_fetch-route)   
graph.add_node("rankRoutes",node_rankRoutes)   
graph.add_node("simulate_tx",node_simulate_tx)   
graph.add_node("await_review",node await_review)   
graph.add_node("execute_tx",node_execute_tx)
```

```javascript
Add edges  $<  a > <   / a>$  graph.add_edge("parseintent", "fetch-route") graph.add_edge("fetch-route", "rankRoutes") graph.add_edge("rankRoutes", "simulate_tx")
```

```python
graph.add_edge("simulate_tx", "await_review")  
graph.add_edge("await_review", "execute_tx")  
# Compile and run  $<a></a>$   
executor = graph.compile()
```

# Feature 7: Smart Contract-Backed Automations (Anchor)

Description: On-chain Anchor program for autonomous DCA and rebalancing without centralized servers.

# Program Architecture:

```rust
// dca.program/lib.rs   
use anchor-lang::prelude:  $\text{串}$  .   
use spl_token::instruction::transfer_checked;   
declare_id！("DCA11111111111111111111111111111");   
#[program]   
pub mod dca PROGRAM { use super:  $\text{串}$  ：   
pub fn initialize_dca( ctx: Context&lt;InitializeDca&gt;, amount_per_interval: u64, intervalSeconds: u64, ) -&gt; Result&lt;/); let vault  $=$  &amp; mut ctxaccounts.dcavault; vault owner  $=$  ctxaccounts owner.key(); vault.source_mint  $=$  ctxaccounts.source_mint.key(); vault(dest_mint  $=$  ctxaccounts(dest_mint.key()); vault.amount_per_interval  $=$  amount_per_interval; vault.intervalSeconds  $=$  intervalSeconds; vault.last_execution  $= 0$  . vault.total_executed  $= 0$  . vault.pursed  $=$  false; vault.bump  $=$  ctx.bumps.dca Vault; emit!(DcaCreated { vault: vault.key(), owner: vault owner, amount_per_interval, intervalSeconds, }; Ok())   
}   
pub fn execute_dcaCtx:Context&lt;/;ExecuteDca&gt;)-&gt;Result&lt;/;(&gt; { let vault  $=$  &amp;mut ctxaccounts.dcavault; // Check if interval elapsed let current_time  $=$  Clock::get().?.unix_timestamp; require!( current_time &gt; = vault.last_execution + vault.intervalSeconds as i64, ErrorCode::IntervalNotElapsed ); require(!vault.pursed,ErrorCode::VaultPaused); // Execute swap via Jupiter or internal DEX // (In production, use CPI to Jupiter Aggregator or custom AMM logic)
```

```rust
vault.last_execution = current_time;
vault.total_executed += vault.amount_per_interval;
emit!(DcaExecuted {
    vault: vault.key(), 
    executed_at: current_time, 
    amount: vault.amount_per_interval,
});
Ok();
} 
pub fn pause_dcaCtx: Context&lt;PauseDca&gt;): &gt; Result&lt;();&gt; { 
let vault = &amp; mut ctxaccounts.dca Vault; 
vault.purchased = true; 
Ok();
}
pub fn resume_dcaCtx: Context&lt;ResumeDca&gt;): &gt; Result&lt;();&gt; { 
let vault = &amp; mut ctxaccounts.dca Vault; 
vault.purchased = false; 
Ok();
}
pub fn close_dcaCtx: Context&lt;CloseDca&gt;): &gt; Result&lt;();&gt; { 
// Return remaining funds to owner Ok(); 
}
```

```rust
pub struct DcaCreated {
    pub vault: Pubkey,
    pub owner: Pubkey,
    pub amount_per_interval: u64,
    pub intervalSeconds: u64,
}
#[event]
pub struct DcaExecuted {
    pub vault: Pubkey,
    pub executed_at: i64,
    pub amount: u64,
}
#[error_code]
pub enumErrorCode {
    #[msg("Interval not yet elapsed")] IntervalNotElapsed,
    #[msg("Vault is paused")] VaultPaused,
}
```

# Execution Trigger:

- Option 1: Switchboard oracle calls execute_dca instruction at scheduled time  
- Option 2: Off-chain cron job (Temporal, AWS Lambda) calls execute_dca  
- Option 3: Public instruction, any user can call (receives small bounty for execution)

# Feature 8: Session Keys Support

Description: Enable repeated transaction approvals without re-signing each transaction.

# Session Key Workflow:

1. User creates session with scopes:

- Allowed tokens (e.g., USDC, SOL)  
- Max transaction amount ($100/day)  
Expiration (1 hour, 1 day, 1 week)

2. User signs session creation instruction (SignMessage)  
3. Session key derived from user wallet + nonce  
4. For next N transactions, AI uses session key to sign (user no longer prompted)  
5. After expiration or max amount reached, session invalidates

# SPL Session Keys (Solana Standard):

- Uses Solana's Session Extensions (if available on network)  
- Alternative: Custom session program (simpler MVP approach)

# Implementation:

```python
# FastAPI session key management</a></a>  
@router.post("/session/create")  
async def create_session(wallet: str, scopes: SessionScopes):  
    # scopes = { allowed_tokens: [...], max_daily_usd: 1000, expiration: 3600 }  
    # Generate session keypair
```

```python
session_keypair = Keypair()
session_token = base64_encode.session_keypair.secret_key)
# Store session in Redis with TTL
redis.setex( f"session:{wallet}:{session_keypair.public_key}", scopes.expiration,
json.dumps(scopes))
return {
    "session.pubkey": str.session_keypair(public_key),
    "session_token": session_token,
    "expires_at": time.time() + scopes.expiration }
}
@router.post("/tx/sign-with-session")
async def sign_tx_with_session(wallet: str, tx_data: TransactionData, session_token: str):
    # Verify session is still valid
    session = redis.get(f"session:{wallet}:{session_token}") if not session:
        raise Exception("Session expired or invalid")
    # Verify tx amount is within session scope
    scopes = json loadsURA(tx_data, session_token)
    return {"transaction": tx_signed}
```

# User Experience:

- First approval: "Create a 1-hour session for swaps up to $100?"  
- Next 5 swaps: Zero friction, auto-approved  
- After 1 hour or $100 spent: "Session expired. Create new session?"

# Feature 9: Transaction Approvals

Description: Multi-level approval workflows for high-value or risky transactions.

# Approval Levels:

1. Low-Risk (<\$100, known token, <0.5% slippage): Auto-approved  
2. Medium-Risk ( $100-$ 1K, known token, 0.5–2% slippage): Explicit user approval required  
3. High-Risk ( $>$ 1K, new token,  $>2\%$  slippage, low liquidity): Extra confirmation + risk warning

# Approval UI:

```txt
TRANSACTION APPROVAL Swap 20 USDC for SOL  $\approx 0.048$  SOL  $(\$  9.60)$ Route: Jupiter (Orca) Price Impact:  $0.05\%$  Gas Fee: 0.0015 USD
```

```txt
Medium Risk: Price impact slightly elevated [CANCEL] [REVIEW ROUTE] [APPROVE]
```

# High-Risk Workflow:

- Show detailed breakdown (routes, competitors, historical prices)  
- Require checkbox confirmation: "I understand the risks"  
- Optional SMS/email verification for DAOs  
- Log approval with reasoning for audit trail

# Feature 10: Wallet Authentication via SignMessage

Description: Non-custodial authentication using Solana's SignMessage standard.

# Authentication Flow:

1. Frontend generates nonce (random 32-byte string)  
2. Backend returns challenge message: "Sign this message to log in: [nonce]"  
3. User signs message in wallet (Phantom, Magic Eden, etc.)  
4. Frontend sends signature + wallet address to backend  
5. Backend verifies signature using Solana's verify function  
6. Backend issues JWT token valid for 24 hours

# Code Example:

```txt
#FastAPI backend<a></a>   
@router.post("/auth/request-challenge")   
async def request_challengewallet: str): nonce  $=$  secrets_token_hex(16) message  $=$  f"Sign this message to log in to Solana Copilot:{nonce}" redis.setex(f"auth_nonce:{wallet}",300,none） #5 min expiration return {"message":message，"nonce":none}   
@router.post("/auth/verify-signature")   
async def verify_signature(wallet: str，message: str，signature: str): #Verify signature using solders try: pk  $=$  PublicKey(wallet) sig  $=$  Signature.from_string(signature) pk.confirm(message.encode()，sig) except Exception as e: raise HTTPexception(status_code=401，detail  $=$  "Invalid signature") #Extract nonce and verify it matches #Create JWT token token  $=$  jwt.encode({ "wallet": wallet, "iat": datetime.utcnow(), "exp": datetime.utcnow() + timedelta(hours=24)} ，JWT_secret，algorithm  $\equiv$  "HS256")
```

```python
return {"token": token, "wallet": wallet}   
# Middleware for protecting endpoints  $<  a>$    
@app middlware("http")   
async def verify_jwt(request: Request, call_next): if request.url.path in ["/auth", "/health']: return await call_next(request)   
token  $=$  request headers.get("Authorization","").replace("Bearer ", "") try: payload  $=$  jwtdecode(token,JWT_secret, algorithms  $\coloneqq$  ["HS256"]） request.state.wallet  $=$  payload["wallet"] except: raise HTTPexception(status_code=401, detail  $\equiv$  "Unauthorized")   
return await call_next(request)
```

# Frontend (Next.js):

```typescript
// lib/auth.ts   
export async function requestChallenge(wallet: string) { const response  $=$  await fetch("/api/auth/request-challenge", { method:"POST", body:JSON.stringify({ wallet}), }; return response.json();   
}   
export async function verifySignature( wallet: string, message: string, signature: string ) { const response  $=$  await fetch("/api/auth/verify-signature", { method:"POST", body: JSON.stringify({ wallet, message, signature }）， }; const { token}  $\equiv$  await response.json(); localStorage.addItem("auth_token", token); return token;   
}   
// Usage in component   
async function handleLogin() { const {publicKey, signMessage}  $\equiv$  useWallet(); const {message, nonce}  $\equiv$  await requestChallenge(publicKey.toString()); const signature  $=$  await signMessageBuffer.from(message)); const token  $=$  await verifySignature( publicKey.toString(), message, signature );   
}
```

# Security Properties:

- No private keys exposed to server  
- Signature proves wallet ownership  
- Nonce prevents replay attacks  
- JWT expires after 24 hours

- Wallet-specific tokens (can't use another user's token)

# Feature 11: History, Logs, Notifications

Description: Complete audit trail of all transactions and AI reasoning.

# Transaction History:

- Every transaction logged in PostgreSQL with:

- Timestamp, user, action, amount, price, fees, status  
o AI reasoning (intent parsed, route selected, simulation result)  
- Approval status and timestamp  
On-chain signature

# AI Reasoning Logs:

Full LangGraph execution trace (all nodes, decisions, tool calls)  
- Price feed snapshots at time of execution  
Alternative routes considered (and why rejected)  
- Example: "User intent: Swap 20 USDC to SOL. Route considered: [Orca ( $9.50), Jupiter ($ 9.55)]. Selected: Orca (best price). Simulated: Success, 0.048 SOL. Approved: Yes. Executed: 2025-11-29 16:30:45Z. Signature: [...]

# Notifications:

1. In-App: Badges, toast messages  
2. Email: Daily/weekly digest of transactions and portfolio changes  
3. Push: High-risk changes only  
4. Slack: For DAO integrations

# Notification Types:

Transaction executed (success/failure)  
- Automation triggered (DCA, recurring swap)  
- Portfolio alert (volatility spike, drawdown recovery)  
- Risk notification (concentration  $>70\%$ , volatility up  $50\%$ )

# Data Model:

```sql
CREATE TABLE transactions (
id UUID PRIMARY KEY,
user_addressVARCHAR(44),
actionVARCHAR(50), -- 'swap', 'send', 'stake'
source_token VARCHAR(44),
dest_token VARCHAR(44),
amount_in Decimal(20, 8),
amount_out Decimal(20, 8),
price_at_execution Decimal(20, 8),
gas_fee Decimal(20, 8),
status ENUM('pending', 'success', 'failed'),
tx_signature VARCHAR(128),
approval_timestamp Timestamp,
execution_timestamp Timestamp,
ai_reasoning JSONB, -- Full LangGraph trace
created_at Timestamp
);
```

```sql
CREATE TABLE notifications ( id UUID PRIMARY KEY, user_addressVARCHAR(44), typeVARCHAR(50), -- 'transaction', 'alert', 'automation' titleVARCHAR(255), message TEXT, related_tx_id UUID REFERENCES transactions(id), read BOOLEAN DEFAULT FALSE, created_at TIMESTAMP);
```

# Feature 12: On-Chain Smart Volumes (Anchor)

Description: User-controlled vaults for storing tokens and managing automations.

# Vault Types:

1. DCA Vault: Holds funds for Dollar-Cost Averaging  
2. Rebalancing Vault: Holds portfolio for automated rebalancing  
3. Yield Vault: Holds tokens earning yield on Marinade/Lido  
4. DAO Treasury Vault: Multi-sig vault for DAO treasuries

# Vault Program Design:

```rust
// vault_program/lib.rs
#[account]
pub struct VaultAccount {
    pub owner: Pubkey,
    pub bump: u8,
    pub vault_type: VaultType,
    pub created_at: i64,
    pub total Deposits: u64,
    pub total_withdrawals: u64,
    pub authorized_signers: Vec&lt;Pubkey&gt;, // For multi-sig
}
pub enum VaultType {
    DCA,
    Rebalancing,
    Yield,
    DaoTreasury,
}
#[program]
pub mod vault_program {
    use super::*;
    pub fn createvault(
        ctx: Context&lt;lt;CreateVault&gt;,
        vault_type: VaultType,
        authorized_signers: Vec&lt;Pubkey&gt;,
    ) -&gt; Result&lt;lt;(&gt; let vault = &amp; mut ctxaccounts.vault;
        vault owner = ctxaccounts owner.key();
        vault.bump = ctx.bumps.vault;
        vault.vault_type = vault_type;
        vault.create_at = Clock::get().?.unix_timestamp;
        vault(authorized_signers = authorized_signers;
        Ok()
    }
```

```rust
pub fn deposit(ctx: Context&lt; Deposit&gt;, amount: u64) -&gt; Result&lt;()&gt; {
// Transfer SPL token from user to vault
transfer_checked(
    CpiContext::new(
        ctxaccounts_token_program.to_account_info(),
        TransferChecked {
            from: ctxaccounts.user_token_account.to_account_info.,
            to: ctxaccounts.vault_token_account.to_account_info.,
            mint: ctxaccounts.mint.to_account_info.,
            authority: ctxaccounts.user.to_account_info.,
        },
    ), 
    amount,
    ctxaccounts.mint.decimals,
).
let vault = &amp; mut ctxaccounts.vault;
vault.total Deposits += amount;
Ok()
}
pub fn withdraw(ctx: Context&lt; Withdraw&gt;, amount: u64) -&gt; Result&lt;()&gt;
// Verify only owner can withdraw
require_eq!(ctxaccounts owner.key(), ctxaccounts.user.key());
// Transfer from vault to user
// ...
let vault = &amp; mut ctxaccounts.vault;
vault.total Withdrawals += amount;
Ok()
}
```

# Vault Benefits:

- Separates funds from day-to-day wallet (security)  
- Enables complex automations (DCA, rebalancing)  
Support for multi-sig (DAO treasuries)  
Full audit trail (on-chain events)

# DETAILED USER STORIES

# User Story 1: Alex (Active Trader) - Daily DCA Setup

Title: Set up a recurring $100 daily DCA from USDC to SOL

As: Alex, an active trader

I want: Automate my daily $100 USDC → SOL purchase

So that: I reduce timing risk and dollar-cost average into SOL

# Acceptance Criteria:

- [ ] Alex opens chat and types: "Create a $100 daily DCA"  
- [ ] AI confirms: "I'll swap $100 USDC → SOL every 24 hours. Next execution tomorrow at 00:00 UTC"  
- [ ] Alex approves via chat  
- [ ] Anchor program creates DCA vault

- [ ] Every 24 hours, automation executes swap  
- [ ] Alex sees execution history in dashboard  
- [ ] Alex can pause/resume DCA with one click  
- [ ] If swap fails, Alex receives notification with reason

Story Points: 13

# User Story 2: Jamie (Beginner) - First Swap with AI Guidance

Title: Swap SOL to USDC with AI guidance and simulation

As: Jamie, a crypto beginner

I want: Swap 5 SOL for USDC with clear explanation of what's happening

So that: I understand the transaction and don't make expensive mistakes

# Acceptance Criteria:

- [ ] Jamie opens Copilot and clicks "Swap SOL to USDC"  
[ ] AI responds: "I'll help you swap SOL to USDC. You have 10 SOL. How much do you want to swap?"  
[ ] Jamie responds: "5 SOL"  
- [ ] AI simulates: "5 SOL is worth ~$1000 USDC. Price impact: 0.1%. Gas: 0.005 SOL ($1). You'll receive ~$999 USDC. Proceed?"  
- [ ] Jamie approves  
- [ ] AI executes swap with session key (no additional signing)  
- [ ] AI confirms: "Swap complete! Received $999.50 USDC. Transaction: [link]"  
- [ ] Dashboard shows transaction in history with full breakdown

Story Points: 8

# User Story 3: Morgan (DAO Treasurer) – Portfolio Risk Analysis

Title: Generate automated risk report for DAO treasury

As: Morgan, a DAO treasurer

I want: AI-powered portfolio analysis of our $5M treasury

So that: I can present data-driven risk assessment to the DAO

# Acceptance Criteria:

- [ ] Morgan connects DAO treasury wallet (multi-sig)  
- [ ] AI fetches all holdings and prices  
[ ] Portfolio shows: 60% USDC, 30% SOL, 10% alt tokens  
- [ ] Risk dashboard shows: Concentration risk (HIGH), Volatility (8%), VaR-95 ($125K)  
- [ ] AI insights: "High USDC concentration (60%) limits upside. Consider rebalancing to 40% USDC / 50% SOL / 10% diversified."  
- [ ] Morgan generates report (exportable PDF) with recommendation  
- [ ] Report sent to DAO governance for vote on rebalancing  
- [ ] After approval, Morgan initiates multi-sig rebalancing via Copilot  
- [ ] All transactions logged for audit trail

# Story Points: 21

# User Story 4: Dev (Builder) - Custom Agent Integration

Title: Build a liquidation prevention bot using Copilot API

As: Dev, building automation bots

I want: Use Copilot's API to monitor SOL price and auto-swap if it drops below $150

So that: My lending protocol doesn't get liquidated

# Acceptance Criteria:

- [ ] Dev accesses /api/v1/docs and reviews Copilot API reference  
- [ ] Dev creates webhook: When SOL price < $150, trigger POST /api/v1/automations/create  
- [ ] Automation specifies: "Swap $10K USDC to SOL if SOL < $150"  
- [ ] Copilot stores automation rule in database  
- [ ] Helius webhook monitors SOL price on-chain  
- [ ] When SOL < $150, FastAPI triggers automation  
- [ ] AI evaluates: "SOL at $148, below $150. Swap approved. Executing..."  
- [ ] Swap executes, Dev receives webhook notification  
- [ ] Dev's bot receives notification and takes action (e.g., update collateral)

Story Points: 13

# User Story 5: Morgan (DAO) – Governance-Gated Automation

Title: Execute Treasury Rebalancing with DAO Vote Integration

As: Morgan, DAO treasurer

I want: Execute a rebalancing only after DAO vote approves it.

So that: All treasury actions respect governance

# Acceptance Criteria:

- [ ] Morgan proposes rebalancing in Copilot: "Rebalance to 50% SOL / 50% USDC"  
- [ ] Copilot generates proposal with full breakdown and simulation  
- [ ] Proposal shared with DAO members for vote (via Snapshot or on-chain vote)  
- [ ] After majority approval, Morgan initiates rebalancing in Copilot  
- [ ] Copilot routes transaction to multi-sig wallet for 3-of-5 signatures  
- [ ] Treasury members sign transaction in Phantom  
- [ ] After 3 signatures collected, transaction executes on-chain  
- [ ] Full audit trail shows: Proposal → Vote → Execution → On-chain proof

Story Points: 21

# SYSTEM ARCHITECTURE

![](images/bbbe39d367bd46434153f3ad132e64174c338d856874eba569d0e119bf23a703.jpg)

![](images/a5e4970a48b1ea7c2870b3fb83c5197b4d8f5b327d3719785712625b85747e91.jpg)

![](images/0726634a2fbb2d026bd9ee6c7bc4509c974a4fc94df725395de9e5edb8bfeefa.jpg)

![](images/f7ba6b2187258d16c12396253b747b7f61da711cf2a207053bd98b05da602fd5.jpg)

# Request/Response Flow Examples

# Example 1: Simple Swap Command

```javascript
User: "Swap 20 USDC to SOL"  
|  
    <WebSocket over JSON>  
Frontend sends: {  
    "message": "Swap 20 USDC to SOL",  
    "wallet": "7ZJhKjbFuSxCkq8BdTXPsmmU82vK2gVwdQB4EF6L1S3x",  
    "session_id": "sess_123"  
}  
|  
    <FastAPI middleware validates JWT>  
Backend validates auth token &amp; wallet  
|  
    </chat endpoint)
```

1. Intent Classifier Node: - LLM parses: action  $\equiv$  swap, source  $\equiv$  USDC, dest  $\equiv$  SOL, amount  $= 20$  
2. Portfolio Check Node:  
- Query Redis: wallet balance (USDC: 100)  
- Result: User has enough (100 USDC ≥ 20 USDC)  
3. Price Fetch Node:  
- Query Birdye API: USDC/SOL price = 0.0024  
- Result: 20 USDC = 0.048 SOL  
4. Route Optimization Node: - Call Jupiter API: Best route for 20 USDC  $\rightarrow$  SOL

```txt
- Compare: Orca ($9.52), Marinade ($9.48), Raydium ($9.50)
- Select: Marinade (best price)
```

```txt
5. Simulation Node:  
- Call Solana RPC simulateTransaction  
- Input: Swap 20 USDC for 0.048 SOL  
- Output: {  
    "status": "success",  
    "amount_out": 47850000,  
    "gas_fee": 5000,  
    "price_impact": 0.05%  
}
```

```txt
6. Approval Node:  
- Risk assessment: Low (amount &lt; $100, known tokens)  
- Autoapprove (if session key valid) OR show approval UI
```

```json
Backend returns: {
    "status": "awaiting_review",
    "preview": {
        "action": "Swap",
        "from": "20 USDC",
        "to": "%0.048 SOL",
        "route": "Marinade",
        "fee": "0.0015 USD",
        "priceImpact": "0.05%"}
}
}
```

```txt
1. Submit to Solana RPC  
2. Wait for confirmation (max 30s)  
3. On success: Update database, emit event, notify user  
4. On failure: Rollback, show error
```

```txt
Backend returns: { "status": "success", "transaction": { "signature": "4pWZ8...", "timestamp": "2025-11-29T16:30:45Z", "from": "20 USDC", "to": "0.048 SOL", "fee": "0.0015 USD" } } (Frontend displays success) UI shows: "Swap complete! 20 USDC  $\rightarrow$  0.048 SOL"
```

Example 2: Portfolio Risk Analysis Request  
```txt
User: Clicks "Analyze my portfolio"  
 $\nabla$  (/portfolio/analyze endpoint)  
Portfolio Analysis Agent:  
Node 1: Fetch Holdings  
 $\vdash$  Query Solana RPC: getBalance(wallet)  
 $\vdash$  Query SPL tokens: getTokenAccounts(wallet)  
Result: [ { mint: SOL, amount: 10 }, { mint: USDC, amount: 5000 }, ... ]  
Node 2: Fetch Price History  
 $\vdash$  Query Redis cache (1 hour TTL)  
 $\vdash$  If miss: Query Birdeye API for 90-day OHLCV  
Result: 90 days of [date, open, high, low, close]  
Node 3: Calculate Metrics  
 $\vdash$  Holdings: {SOL: $2000, USDC: $5000, total: $7000}  
 $\vdash$  PnL: Entry vs. current (query Solana indexer)  
 $\vdash$  Volatility: Std dev of 90-day returns = 8.5%  
 $\vdash$  Max DD: Lowest point in 90 days = -12.3%  
Result: Full metric breakdown  
Node 4: Risk Scoring  
 $\vdash$  Concentration: 70% SOL (high) → +20 pts  
 $\vdash$  Volatility: 8.5% (medium) → +15 pts  
 $\vdash$  Drawdown: -12.3% (medium) → +10 pts  
 $\vdash$  Risk Score: 45/100 (Medium Risk)  
Node 5: Generate Insights (LLM)  
 $\vdash$  Input: Metrics + Risk Score  
 $\vdash$  Output: "Your portfolio is moderately risky. High SOL concentration (70%) exposes you to single-token risk. Consider diversifying to 50% SOL / 30% USDC / 20% alts." Recommendations: [Rebalance, Set stop-loss, ... ]  
Backend returns: {  
    "portfolio": {  
        "total_usd": 7000,  
        "holdings": [... ],  
        "allocation": { SOL: 28.6%, USDC: 71.4% }  
    },  
    "performance": {  
        "pnl_usd": 500,  
        "pnl_pct": 7.7,  
        "return_7d": 2.1%,  
        "return_30d": 5.8%  
    },  
    "risk": {  
        "risk_score": 45,  
        "risk_level": "medium",  
        "volatility": 8.5%,  
        "max_drawdown": -12.3%,  
        "concentration": 70.0%  
    },  
    "ai_insights": "Your portfolio is moderately risky..."  
}  
(Frontend displays dashboard)  
User sees: Portfolio chart, risk gauge, AI recommendations
```

# TECHNICAL ARCHITECTURE

# Technology Stack Justification

# Frontend: Next.js 14 + App Router

# Why:

- Server components for optimal performance (reduce client-side JS)  
Built-in streaming for real-time updates (chat, price feeds)  
- Vercel deployment for global CDN  
- TypeScript for type safety in crypto operations

# Frontend UI: TailwindCSS + Shadcn/UI

# Why:

Tailwind: Rapid iteration, consistency, accessibility-first  
- Shadcn/Ui: Unstyled components, full customization, production-ready  
- Reduces custom CSS, improves maintainability

# State Management: Zustand

# Why:

- Minimal boilerplate vs Redux  
DevTools for debugging  
Supports persistence (localStorage for session state)  
- TypeScript-first design

# Blockchain Interaction: Solana Wallet Adapter

# Why:

- Standard Solana SDK for wallet integration  
Supports all major wallets (Phantom, Magic Eden, etc.)  
Non-custodial (no private keys on server)

# Charts: Recharts or Chart.js

# Why:

- Recharts: React-native, SSR-friendly, responsive  
Chart.js: Lightweight, rich options, community support

# AI Backend: FastAPI (Python)

# Why:

- High performance, async support (handles 1000+ concurrent requests)  
- Native Pydantic for request validation  
Excellent OpenAI/Anthropic integration

Rich ecosystem (SQLAlchemy, Celery, etc.)

# AI Agents: LangGraph

# Why:

State management for stateful workflows  
Built-in human-in-the-loop (approval flows)  
- Production features: checkpointing, persistence, visualization  
- Better than LangChain chains for complex agentic workflows

# LLM Choice: Claude 3.5 Sonnet or GPT-4 Turbo

# Why:

- Claude 3.5: Better at instruction-following, lower hallucination, cheaper  
GPT-4 Turbo: Better reasoning, multimodal support  
- Hybrid approach: Claude for routing/classification, GPT-4 for complex reasoning

# Blockchain RPC: Helius

# Why:

-  $10 \times$  faster than public RPC (dedicated endpoints)  
Built-in webhook system (automation triggers)  
- Reliable uptime (99.9%)  
- Cheaper than Alchemy or QuickNode

# Swap Routing: Jupiter Aggregator

# Why:

- Best-in-class routing across Raydium, Orca, Marinade, etc.  
Real-time price quotes  
- Slippage protection built-in  
- Most liquidity on Solana

# Price Feeds: Birdeye + Coingecko Fallback

# Why:

- Birdeye: Solana-native, real-time quotes, <1s latency  
- Coingecko: Fallback, free API, historical data  
- Hybrid approach: Birdeye for real-time, Coingecko for 24h history

# Caching:Redis

# Why:

- Sub-milliseconds latency for session keys, price feeds  
- Native Pub/Sub for real-time updates  
- TTL support for automatic cache expiration

# Database: PostgreSQL + Supabase/Neon

# Why:

- ACID compliance (financial data must be consistent)  
- JSONB columns for flexible schema (AI reasoning logs, metadata)  
Full-text search (transaction search)  
- Managed hosting (Supabase/Neon) for faster deployment

# Smart Contracts: Anchor Framework + Rust

# Why:

- Industry standard on Solana (used by all major protocols)  
- Type-safe macros (reduce bugs)  
Built-in CPI (Call Program Instruction) support  
- Easy testing and deployment

# Session Keys: SPL Session Extensions (Future) or Custom Program

# Why:

- Session extensions: Native Solana support (when available)  
- Custom program: Immediate deployment, flexible scoping

# Infrastructure: Docker + Railway/Render

# Why:

- Docker: Reproducible, isolated environments  
- Railway/Render: Easy scaling, one-click deployment  
Alternative: AWS ECS (for very high scale)

# CI/CD:GitHubActions

# Why:

- Native GitHub integration  
Free for public repos  
Excellent Solana program workflow support  
- Deploy on every push to main

# Backend Service Architecture (FastAPI)

```python
# main.py<a></a>
from fastapi import FastAPI, WebSocket, Depends
from fastapi,ThirdParty.cors import CORSMiddleware
import aioredis
import databases
from contextlib import asynccontextmanager
# Initialize services</a></a>
db = databasesDATABASE(DATABASE_URL)
```

```txt
redis = aioredis.from_url(REDIS_URL)  
11m = ChatAnthropic(model="claude-3-5-sonnet")  
# Initialize agents  
intent_classifier_agent = buildIntent_classifier(agent(11m)  
tx_planner_agent = build_tx_planner_agent(11m)  
portfolio_agent = build portfoliosupportagent(11m)  
@asynccontextmanager  
async def lifespan(app: FastAPI):  
    # Startup  
    await db.connect()  
    redis = await aioredis.from_url(REDIS_URL)  
    yield  
    # Shutdown  
    await dbdisconnect()  
app = FastAPI(lifespan=1ifespan)  
# CORS  
app.add_middleware(CORSMiddleware, allow_origins=['https://solanacopilot.com","http://localhost:3000"], allow_creditsals=True, allow_methods=['*'], allowheaders=['*'],  
)  
# ======== AUTH RUTES ========<a></a>  
@app.post("/api/auth/request-challenge")  
async def request_challenge(wallet: str):  
    # Generate nonce and return message pass  
@app.post("/api/auth/verify-signature")  
async def verify_signature(wallet: str, message: str, signature: str):  
    # Verify and return JWT pass  
# ======== CHAT / TX EXECUTION ========<a></a>  
@app.websocket("/api/ws/chat")  
async def websocket chatting(websocket: WebSocket, token: str = Dependsverify_jwt): await websocket.accept()  
wallet = await verify_jwt(token)  
while True:  
    message = await websocket.receive_text()  
    # Parse user message  
user msg = json.load(message)  
# Run intent classifier  
intent_result = await intent_classifier(agent.ainvoke({ "user_message": user msg["content"], "wallet": wallet})  
}）  
# Route to appropriate agent  
if intent_result["action"] == "swap": tx_result = await tx_planner_agent.ainvoke({ "wallet": wallet, "action": "swap", "source_token": intent_result["source_token"], "dest_token": intent_result["dest_token"], "amount": intent_result["amount"]  
})
```

```txt
await WebSocket.send_json(tx_result)  
elif intent_result["action"] == "analyze":  
    analysis = await portfolio_agent.ainvoke({"wallet": wallet})  
}  
awaitWebSocket.send_json(analysis)  
@app.post("/api/v1prepare-tx")  
async def prepare_tx(tx_request: TransactionRequest, wallet: str = Depends(verify_jwt)):  
    # Prepare transaction for signing  
    # Return simulation result  
    pass  
@app.post("/api/v1execute-tx")  
async def execute_tx(tx_data: SignedTransaction, wallet: str = Depends(verify_jwt)):  
    # Submit signed transaction to Solana RPC  
    # Log to database  
    # Return transaction signature  
    pass  
#========PORTFOLIO ROUTES ===<a></a>  
@app.get("/api/v1/portfolio")  
async get portfolios(wallet: str = Depends(verify_jwt)):  
    # Fetch holdings, calculate metrics  
    pass  
@app.get("/api/v1/portfolio/risk-score")  
async get_risk_score(wallet: str = Depends(verify_jwt)):  
    # Calculate risk metrics  
    pass  
@app.get("/api/v1/portfolio/pnl")  
async get_pnl(wallet: str = Depends(verify_jwt), days: int = 30):  
    # Calculate PnL over period  
    pass  
#========AUTOMATION ROUTES ===<a></a>  
@app.post("/api/v1/automations/create")  
async def createautomation(automation: AutomationRequest, wallet: str = Depends(verify_jw):Create DCA, recurring swap, etc.  
    # Return automation ID and vault address  
    pass  
@app.get("/api/v1/automations")  
async def list_automations(wallet: str = Depends(verify_jwt)):  
    # List all active automations  
    pass  
@app.post("/api/v1/automations/{automation_id}/pause")  
async def pauseautomation(automation_id: str, wallet: str = Depends(verify_jwt)):  
    # Pause automation  
    pass  
#========TRANSACTION HISTORY ===<a></a>  
@app.get("/api/v1/transactions")  
async def get_transactions(wallet: str = Depends(verify_jwt), limit: int = 50, offset: int = 0):  
    # Return transaction history  
    pass  
@app.get("/api/v1/transactions/{tx_id}")  
async def get_transaction_detail(tx_id: str, wallet: str = Depends(verify_jwt)):  
    # Return full transaction detail with AI reasoning
```

pass

Background Worker Architecture (Celery)  
```python
#======== HEALTH CHECK ==></a> @app.get("/health")
async def health():
    return {"status": "ok"}
```

```python
# workers/ celery.py</a>   
from celery import Celery, group, chain   
import aioredis   
from solanarpcasync_api import AsyncClient   
 celery_app = Celery( "solana_copilot", broker="redis://localhost:6379", backend="redis://localhost:6379"   
)   
#======== DCA EXECUTION WORKER ::=<a></a> @ celery_task(bind=True)   
def execute_dca_task(self, automation_id: str,vault_pda: str): "" Triggered every 24 hours by Helius webhook or cron. Executes a DCA swap on-chain. "" try: #1.Fetch automation from DB automation  $=$  db(query(Automation).filter(id  $\equiv$  automation_id).first() #2.Fetch current price price  $=$  get_price_from_birdeye(automation.source_token, automation(dest_token) #3.Prepare swap instruction via Jupiter swap_ix  $=$  prepare_swap Instruction( sourcemint  $\equiv$  automation.source_token, destmint  $\equiv$  automation_DEST_token, amount  $\equiv$  automation.amount_per_interval, user wallets  $\equiv$  automation.user_address #4.Simulate transaction simulation  $=$  simulate_transaction swap_ix) if not simulation["success']: raise Exception(f"Simulation failed:{simulation['error']};") #5. Execute transaction on-chain (program-initiated) tx_sig  $=$  send_transaction(swap_ix)   
#6.Log execution db.create(AutomationExecution，{ "automation_id": automation_id, "executed_at": datetime.utcnow(), "input_amount": automation.amount_per_interval, "output_amount": simulation["amount_out"], "price_at_execution": price, "transaction_hash": tx_sig, "status": "success" }） #7.Notify user
```

```txt
sendNotification( wallet \(\equiv\) automation.user_address, title \(=\) "DCA Executed", message \(\equiv\) f"Swapped {automation.amount_per_interval} {automation.source_token} for ） except Exception as e: logging error(f"DCA execution failed: [str(e)]") db.create(AutomationExecution, { "automation_id": automation_id, "status": "failed", "error_message": str(e) } sendNotification( wallet \(\equiv\) automation.user_address, title \(=\) "DCA Failed", message \(\equiv\) f"Failed to execute DCA: {str(e)}" ） # \(= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 100 tokens and updates Redis cache. tokens \(=\) get_top_100_tokens() for token in tokens: price \(=\) get_price_from_birdeye(token) redis.settex(f"price:{token}",3600，json.dumps(price)) #1 hour TTL # \(= = = = = = = = = = = = = = < a > < a>\) @ celery_app.task def update_price_cache(): Triggered every 5 minutes. Fetched prices for top 100 tokens and updates Redis cache. tokens \(=\) get_top_100_tokens() holdings \(=\) get_price_from_birdeye(token) redis.settex(f"price:{token}",3600，json.dumps(price)) #1 hour TTL # \(= = = = = = = = = = = = < a > < a>\) @ celery_app.task def create_portfolio_snapshot(wallet: str): Triggered daily for each wallet. Creates portfolio snapshot for historical comparison. """ holdings \(=\) get_wallet_holdings(wallet) portfolio_value \(=\) sum([h["value_usd"] for h in holdings]) db.create(PortfolioSnapshot,{ "wallet": wallet, "total_value_usd": portfolio_value, holdings": holdings, "created_at": datetime.utcnow()) ） # \(= = = = = = = = = = < a > < a>\) from celery.schedules import crontab app.confbeat_schedule \(=\) { "execute-dcas": { "task": "workers.execute_dca_task", "schedule": crontab(minute \(\coloneqq\) 0)，#Every hour }, "update-prices": { "task": "workers.update_price_cache", "schedule": crontab(minute \(= ^{*} / 5^{*}\) )，#Every 5 minutes }, "portfolio-snapshots": { "task": "workers.create_portfolio_snapshot", "schedule": crontab(hour \(\coloneqq\) 0，minute \(\coloneqq\) 0），#Every day at midnight }
```

AI Agent Graph Definition (LangGraph)  
```python
# agents/transaction Planner.py</a>   
from langgraph.graph import StateGraph, END   
from langchain.tools import tool   
from langchain_anthropic import ChatAnthropic   
# State definition</a>   
class TransactionState(TypedDict): user(intent: str wallet: str parsed_action: str source_token: str dest_token: str amount: float source_decimals: int dest_decimals: int balance_check: dict route_options: list[dict] selectedRoute: dict simulation_result: dict user approvesbool tx_signature: str error: str   
# Tool definitions</a>   
@tool   
def get_wallet_balance(wallet: str, token: str)-&gt; dict:"""Get wallet balance for a specific token""balance  $=$  fetch_balance_from_rpc(wallet,token) return {"wallet": wallet, "token": token, "balance": balance}   
@tool   
def fetch_swap=routes.source_mint: str,dest_mint: str,amount:int)-&gt; list:"""Fetch available swap routes from Jupiter API""routes  $=$  call_jupiter_api.source_mint,dest_mint,amount) return [ { "dex":r["name"], "output_amount":r["outAmount"], price_impact":r["priceImpactPct"], fees":r["fees"], } for r in routes   
]   
@tool   
def simulate_transaction instructions(list)-&gt; dict:"""Simulate transaction on-chain"" result  $=$  solana_client.simulate_transaction(instructions) return { "success":result["value"]["err"]is None, "logs":result["value"]["logs"], gas Estimate": result["value"]["unitsConsumed"], }   
# Node definitions</a>   
def node_parserintent(state:TransactionState)-&gt; TransactionState:"""Parse user intent using LLM""llm  $=$  ChatAnthropic(model="claude-3-5-sonnet") prompt  $=$  f"" Parse the user's intent and extract the transaction details.
```

User message: {state['userIntent']}

User wallet: {state['wallet']}

Return JSON with:

- action: str (swap, send, stake, etc.)

- source_token: str (token symbol or address)

-dest_token: str (token symbol or address)

- amount: float (numeric amount)

- confidence: float (0-1)

11 11

response  $=$  11m.invoke(prompt)

`parsed = json.dumps(response(content)`

state[" parsed_action"] = parsed["action"]

state["source_token"] = parsed["source_token"]

state["dest_token"] = parsed["dest_token"]

state["amount"] = parsed["amount"]

return state

def node_check_balance(state: TransactionState) -&gt; TransactionState:

""Verify user has sufficient balance""

balance_result = get_wallet_balance(state["wallet"], state["source_token"]);

state["balance_check"] = balance_result

if balance_result["balance"] &lt; state["amount']:

state["error"] = f"Insufficient balance. Have {balance_result['balance']} \}, need \{s-

return state

def node_fetch=routes(state: TransactionState) -&gt; TransactionState:

""Fetch available swap routes""

amount_in.units = int(state["amount"] * (10 ** state["source_DECimals"]))

routes = fetch_swap Routes(

state["source_token"],

state["dest_token"],

amount_in.units

）

state["route_options"] = routes

return state

def node_rank Routes(state: TransactionState) -&gt; TransactionState:

```
```
"Rank routes by price and select best"``

if not state["route_options']:

state["error"] = "No routes available"

return state

bestRoute  $=$  max(

state["route_options"],

key=lambda r: float(r["output_amount"]); / (1 + float(r["price_impact"]))

）

state["selected-route"] = best-route

return state

def node_simulate_tx(state: TransactionState) -&gt; TransactionState:

""Simulate transaction on-chain""

Prepare instructions for swap

instructions = prepare_swap_instructions(

source_token  $\equiv$  state["source_token"],

dest_token  $\equiv$  state["dest_token"],

amount=int(state["amount"]  $\star$  (10  $\star \star$  state["source_DECimals"]),

route  $\equiv$  state["selected-route"],

wallet=state["wallet"]

）

```python
def node_wait approval(state: TransactionState) -> True if state["error"] = f"Transaction simulation failed"
return state
def node_wait Approval(state: TransactionState) -> False; TransactionState:
    ""Wait for user approval"""
    # In real implementation, this would use WebSocket or blocking queue
    # For now, return state waiting for approval
    state["user Approval"] = True # Mock approval
    return state
def node_execute_tx(state: TransactionState) -> False; TransactionState:
    ""Execute transaction on-chain"""
    if not state["user Approval"]
        state["error"] = "User rejected transaction"
        return state
instructions = prepare_swap Instructions(
            source_token=state["source_token"]
            dest_token=state["dest_token"]
            amount=int(state["amount"] * (10 ** state["source XKualms]))
            route=state["selected-route"]
            wallet=state["wallet"]
)
tx_sig = solana_client.send_transaction instructions
state["tx_signature"] = tx_sig
return state
# Router functions<a></a>
def route_on_error(state: TransactionState) -> False; str:
    ""Route based on error state"""
    if state.get("error"):
        return "error handler"
    return "next"
def route_after_scan(state: TransactionState) -> False; str:
    ""Route after intent parsing?"
    if state["parse_action"] == "swap":
        return "check_balance"
elif state["parse_action"] == "send":
    return "send_flow"
else:
    return "error_handler"
#Build graph<a></a>
def build_tx_planner_agent() -> False; StateGraph:
    workflow = StateGraph(TransitionState)
#Add nodes
graph.add_node("parseintent", node_scanintent)
graph.add_node("check_balance", node_check_balance)
graph.add_node("fetchRoutes", node_fetchRoutes)
graph.add_node("rankRoutes", node_rank Routes)
graph.add_node("simulate_tx", node_simulate_tx)
graph.add_node("await approval", node await approval)
graph.add_node("execute_tx", node_execute_tx)
graph.add_node("error ,(node_execute_tx")
#Add edges
```

```txt
workflow.add_edge("parse(intent", "check_balance")
workflow.add_edge("check_balance", "fetch:routines")
workflow.add_edge("fetch:routines", "rank:routines")
workflow.add_edge("rank:routines", "simulate_tx")
workflow.add_edge("simulate_tx", "await-roundedness")
workflow.add_edge("await-roundedness", "execute_tx")
workflow.add_edge("execute_tx", END)
workflow.add_edge("errorhandler", END)
# Set entry point
workflow.set_entry_point("parse(intent")
return workflow.compile()
# Usage</a>
agent = build_tx_planner(agent())
result = agent.invoke({
    "userintent": "Swap 20 USDC to SOL",
    "wallet": "7ZJhKjbFuSxCkq8BdTXPsmmmU82vK2gVwdQB4EF6L1S3x"
})
```

# API SPECIFICATIONS

# Base URL

```txt
https://api.solanacopilot.com/api/v1
```

# Authentication

All endpoints (except /auth/\*) require Bearer token:

```txt
Authorization: Bearer &lt;JWT_TOKEN&gt;
```

# Endpoint Reference

# 1. POST /chat

Description: Send a message to the AI agent.

# Request:

```json
{ "message": "Swap 20 USDC for SOL", "wallet": "7ZJhKjbFuSxCkq8BdTXPsmmmU82vK2gVwdQB4EF6L1S3x", "session_id": "sess_123" // Optional }
```

# Response:

```json
{
    "id": "msg_456",
    "status": "awaiting Approval",
    "action": "swap",
    "preview": {
        "from": "20 USDC",
    }
}
```

```javascript
"to": " $\approx$ 0.048 SOL", "route": "Orca", "fee": "0.0015 USD", "priceImpact": "0.05%" }, "next_step": "Please confirm to proceed" }
```

# 2. POST /prepare-tx

Description: Simulate transaction and get approval screen data.

Request:  
```json
{
    "action": "swap",
    "source_token": "EPjFWaJP...",
    "dest_token": "So1111...",
    "amount": 20,
    "source_decimals": 6,
    "slippage_bps": 100
}
```

Response:  
```json
{
"status": "success",
"transaction": {
"instructions": [...],
"estimated_gas": 5000,
"estimated_gas_usd": 0.0015
},
"simulation": {
"amount_out": 47850000,
"price_impact_pct": 0.05,
"min_amount_out": 47423500
},
"approval_required": true
}
```

# 3. POST /execute-tx

Description: Submit signed transaction.

Request:  
```json
{
    "transaction": "&lt;base64 encoded signed transaction&gt;",
    "session_key": "sess_123" // Optional
}
```

Response:  
```txt
{ "status": "success", "signature": "4pWZ8...",
```

```javascript
"timestamp": "2025-11-29T16:30:45Z"
```

# 4. GET /portfolio

Description: Get user's portfolio summary.

# Query Parameters:

- address (string): Wallet address  
include_pnl (boolean): Include PnL calculations

# Response:

```json
{
    "portfolio": {
        "total_usd": 15000,
        "holdings": [
            "mint": "So11111...",
            "symbol": "SOL",
            "amount": 50,
            "price_usd": 200,
            "value_usd": 10000,
            "allocation_pct": 66.7,
            "pnl_usd": 2000,
            "pnl_pct": 25
        ]
    }
}
```

# 5. GET /portfolio/risk-score

Description: Get portfolio risk analysis.

# Response:

```json
{ "risk_score": 45, "risk_level": "medium", "metrics": { "volatility_90d": 8.5, "max_drawdown": -12.3, "var_95": 1850, "concentration_top3": 95.8 }, "insights": { "summary": "Your portfolio is moderately risky...", "risks": [...], "recommendations": [...]} }   
}
```

# 6. POST /automations/create

Description: Create a new automation (DCA, recurring swap, etc.).

# Request:

```json
{
    "type": "dca",
    "source_token": "EPjFWaJP...",
    "dest_token": "So1111...",
    "amount": 100,
    "frequencyalseonds": 86400,
    "name": "Daily $100 DCA"
}
```

# Response:

```json
{
    "automation_id": "auto_789",
    "vault_pda": "DCAxxxxx...",
    "status": "active",
    "next_execution": "2025-11-30T00:00:00Z"
}
```

# 7. GET /automations

Description: List all automations for user.

# Response:

```json
{
"automations": [id:"auto_789",
	"type":"dca",
	"name":"Daily \$100 DCA",
	"status":"active",
	"total_volume_usd": 5000,
	"execution_count": 50,
	"next_execution": "2025-11-30T00:00:00Z"
}
]
```

# 8. GET /transactions

Description: Get transaction history.

# Query Parameters:

- limit (int): Number of transactions (default 50)  
- offset (int): Paging offset (default 0)  
- action (string): Filter by action (swap, send, stake, etc.)

# Response:

```json
{
    "transactions": [id: "tx_123",
        "action: "swap",
        "from: "20 USDC",
        "to: "0.048 SOL",
        "fee: "0.0015 USD",
        "timestamp: "2025-11-29T16:30:45Z",
        "signature: "4pWZ8...",
        "status: "success"
    ],
    "total": 150
}
```

# 9. GET /transactions/{tx_id}

Description: Get full transaction details with AI reasoning.

# Response:

```json
{
    "transaction": {
        "id": "tx_123",
        "action": "swap",
        "timestamp": "2025-11-29T16:30:45Z",
        "signature": "4pWZ8..."
   },
    "ai_reasoning": {
        "userIntent": "Swap 20 USDC to SOL",
        "routesconsidered": [...],
        "route_selected": "Orca",
        "simulation_result": {...},
        "approval_status": "approved",
        "execution_logs": [...]
   }
}
```

# 10. POST /auth/request-challenge

Description: Get challenge for wallet signing.

# Request:

```txt
{ "wallet": "7ZJhKjbFuSxCkq8BdTXPsmmU82vK2gVwdQB4EF6L1S3x" }
```

# Response:

```json
{ "message": "Sign this message to log in to Solana Copilot: [nonce]", "nonce": "abc123..." }
```

# 11. POST /auth/verify-signature

Description: Verify signature and get JWT token.

# Request:

```txt
{ "wallet": "7ZJhKjbFuSxCkq8BdTXPsmmU82vK2gVwdQB4EF6L1S3x", "message": "Sign this message to log in to Solana Copilot: [nonce]", "signature": "[base64 encoded signature]" }
```

# Response:

```json
{ "token": "eyJhbGc... (JWT)," expires_at": "2025-11-30T16:30:45Z", wallet": "7ZJhKjbFuSxCkq8BdTXPsmmU82vK2gVwdQB4EF6L1S3x" }
```

# FRONTEND REQUIREMENTS

# Chat UI Component

- Input: Text area with microphone button (voice-to-text)  
- Messages: Bubbles with AI reasoning, transaction preview  
- Quick Actions: "Swap", "Send", "Analyze Portfolio", "Create DCA"  
Response Latency:  $< 3$  seconds (chat input  $\rightarrow$  response)

#  Dashboard UI

- Widgets:

- Portfolio value card (total USD + % change)  
Holdings chart (donut/pie chart)  
Risk gauge (low/medium/high)  
Recent transactions (list)  
Active automations (list)  
- AI insights card (key recommendations)

# Portfolio Analytics Page

- Charts:

- Portfolio value over time (line chart)  
Holdings allocation (pie chart)  
o Token performance (bar chart)

Metrics:

PnL (realized + unrealized)  
o Volatility, max drawdown  
Value at Risk

# Tables:

Holdings breakdown (token, amount, price, allocation, PnL)  
Historical snapshots (daily portfolio value)

# Automation Setup UI

# - Form:

- Automation type dropdown (DCA, recurring swap, rebalance)  
Source token input  
Destination token input  
Amount input  
Frequency selector (daily, weekly, etc.)  
- Name input

- Confirmation: Simulation result before creation

# Transaction Preview Component

# - Display:

- Action summary ("Swap 20 USDC for SOL")  
- Input/output amounts  
o Route information  
Fee breakdown  
Price impact  
Risks (if any)

- Buttons: Cancel, Review Route, Approve

# NON-FUNCTIONAL REQUIREMENTS

# Security

<table><tr><td>Requirement</td><td>Specification</td></tr><tr><td>Private Key Management</td><td>No private keys stored on server. SignMessage only.</td></tr><tr><td>Transaction Signing</td><td>All transactions signed on user's device (Phantom, Magic Eden, etc.)</td></tr><tr><td>Session Keys</td><td>1-hour max validity, max $1K/session, revocable</td></tr><tr><td>API Rate Limiting</td><td>100 req/min per wallet for safety</td></tr><tr><td>Input Validation</td><td>Strict whitelist of token addresses, amount ranges</td></tr><tr><td>SQL Injection Protection</td><td>Parameterized queries (SQLAlchemy ORM)</td></tr><tr><td>XSS Protection</td><td>Content Security Policy headers, input sanitization</td></tr><tr><td>CSRF Protection</td><td>CSRF tokens for state-changing operations</td></tr><tr><td>DDoS Protection</td><td>Cloudflare, WAF rules</td></tr><tr><td>Audit Logging</td><td>All transactions, approvals, errors logged</td></tr><tr><td>Encryption</td><td>TLS 1.3 for all transport, AES-256 for sensitive data at rest</td></tr></table>

# Performance

<table><tr><td>Metric</td><td>Target</td></tr><tr><td>Chat Response Latency</td><td>&lt;3 seconds (intent parsing → preview)</td></tr><tr><td>Portfolio Load Time</td><td>&lt;2 seconds</td></tr><tr><td>Price Update Latency</td><td>&lt;500ms (Birdeye API)</td></tr><tr><td>Transaction Submission</td><td>&lt;1 second</td></tr><tr><td>RPC Simulation</td><td>&lt;1 second</td></tr><tr><td>Database Query</td><td>&lt;100ms (p95)</td></tr><tr><td>API Throughput</td><td>1000+ concurrent users</td></tr><tr><td>Cache Hit Rate</td><td>&gt;90% (Redis)</td></tr></table>

# Scalability

<table><tr><td>Component</td><td>Scaling Strategy</td></tr><tr><td>Frontend</td><td>Vercel CDN (auto-scaling, edge functions)</td></tr><tr><td>FastAPI</td><td>Docker containers on Kubernetes (auto-scale based on CPU/memory)</td></tr><tr><td>Database</td><td>PostgreSQL read replicas, query optimization, connection pooling</td></tr><tr><td>Redis</td><td>Redis Cluster (horizontal partitioning)</td></tr><tr><td>Solana RPC</td><td>Helius (managed service, auto-scaling)</td></tr><tr><td>Background Workers</td><td>Celery (scale horizontally with new workers)</td></tr></table>

# Reliability

<table><tr><td>Metric</td><td>Target</td></tr><tr><td>Uptime</td><td>99.9% (9 hours downtime/year)</td></tr><tr><td>MTTR</td><td>&lt;15 minutes (Mean Time To Recovery)</td></tr><tr><td>Data Durability</td><td>99.99% (PostgreSQL replication, daily backups)</td></tr><tr><td>Error Rate</td><td>&lt;0.1% of transactions</td></tr><tr><td>Retry Logic</td><td>Exponential backoff, max 3 retries</td></tr><tr><td>Fallback Prices</td><td>Coingecko if Birdeye fails</td></tr><tr><td>Tool</td><td>Purpose</td></tr><tr><td>Datadog</td><td>Metrics, logs, APM</td></tr><tr><td>Sentry</td><td>Error tracking</td></tr><tr><td>Prometheus</td><td>Custom metrics (transaction counts, latency)</td></tr><tr><td>Grafana</td><td>Dashboards, alerts</td></tr><tr><td>Cloudflare</td><td>Request analytics</td></tr></table>

# DEPENDENCIES & INTEGRATIONS

# External APIs

<table><tr><td>Service</td><td>Purpose</td><td>Rate Limit</td><td>Fallback</td></tr><tr><td>Jupiter</td><td>Swap routing</td><td>100 req/min</td><td>Raydium fallback</td></tr><tr><td>Birdeye</td><td>Price feeds</td><td>1000 req/min</td><td>Coingecko</td></tr><tr><td>Helius</td><td>Solana RPC</td><td>600 req/min</td><td>Alchemy RPC</td></tr><tr><td>Marinade</td><td>Staking</td><td>100 req/min</td><td>Direct Solana API</td></tr><tr><td>OpenAI/Anthropic</td><td>LLM inference</td><td>100 req/min (Claude)</td><td>Fallback to GPT-4</td></tr></table>

# Libraries & Dependencies

# Python Backend:

```ini
fastapi  $= = 0$  .104.0   
sqlalchemy  $= = 2$  .0.0   
pydantic  $= = 2$  .4.0   
aioredis  $= = 2$  .0.0   
solders  $= = 0$  .19.0 # Solana Rust bindings   
solan  $\text{一} = = 0$  .28.0 # Solana Python SDK   
langgraph  $= = 0$  .0.1   
langchain  $= = 0$  .0.350   
langchain-anthropic  $= = 0$  .0.1   
httpx  $= = 0$  .25.0   
celery  $= = 5$  .3.0   
redis  $= = 5$  .0.0
```

# Next.js Frontend:

```latex
\[
\begin{aligned}
& \text{"@solana/web3.js": "^1.90.0",} \\
& \text{"@solana/wallet-adapter-react": "^0.16.0",} \\
& \text{"next": "^14.0.0",} \\
& \text{"react": "^18.2.0",} \\
& \text{"zustand": "^4.4.0",} \\
& \text{"recharts": "^2.10.0",} \\
& \text{"tailwindcss": "^3.3.0",}
\end{aligned}
\]
```

```txt
"shadcn-ui": "^0.8.0"
```

# DATA MODELS

# Core Entities (PostgreSQL)

users table:

```sql
CREATE TABLE users ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), wallet_addressVARCHAR(44)UNIQUE NOT NULL, emailVARCHAR(255)UNIQUE, display_nameVARCHAR(255), created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW(), last_login_at TIMESTAMP, preferencesJSONB DEFAULT '{}' );   
CREATE TABLE transactions ( id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), action VARCHAR(50), -- 'swap', 'send', 'stake' source_token VARCHAR(44), dest_token VARCHAR(44), amount_in Decimal(20,8), amount_out Decimal(20,8), price_at_execution DECIMAL(20,8), gas_fee DECIMAL(20,8), status VARCHAR(20), -- 'pending', 'success', 'failed' tx_signature VARCHAR(128)UNIQUE, ai Reasoning JSONB, created_at TIMESTAMP, execution_at TIMESTAMP);   
CREATE TABLE automata ( id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), automation_type VARCHAR(50), -- 'dca', 'recurring_swap', 'rebalance' source_token VARCHAR(44), dest_token VARCHAR(44), amount DECIMAL(20,8), frequencySeconds INT, vault_pda VARCHAR(44), status VARCHAR(20), -- 'active', 'paused', 'completed' created_at TIMESTAMP, next_execution_at TIMESTAMP, total_volume_usd Decimal(20,2), execution_count INT DEFAULT 0 );   
CREATE TABLE portfolio_snapshot ( id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), total_value_usd DECIMAL(20,2), holdings JSONB, -- Array of {mint, amount, value_usd} created_at TIMESTAMP);   
CREATE TABLE session_keys (
```

```txt
id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), public_key VARCHAR(88), max_amount_usd Decimal(20, 2), allowed_tokens TEXT[], expires_at TIMESTAMP, created_at TIMESTAMP, revoked_at TIMESTAMP);
```

# RISK ANALYSIS & MITIGATION

Technical Risks  

<table><tr><td>Risk</td><td>Probability</td><td>Impact</td><td>Mitigation</td></tr><tr><td>Smart Contract Exploit</td><td>Medium</td><td>Critical</td><td>Audit by CertiK/Trail of Bits, Bug bounty program, Multi-sig upgrades</td></tr><tr><td>RPC Downtime</td><td>Low</td><td>High</td><td>Fallback to multiple RPC providers (Helius, Alchemy, Quicknode)</td></tr><tr><td>Price Feed Attack</td><td>Low</td><td>High</td><td>Use multiple price feeds (Birdeye + Coingecko), median pricing</td></tr><tr><td>Transaction Failure Rate</td><td>Medium</td><td>Medium</td><td>Retry logic, fallback routes, user notification</td></tr><tr><td>DDoS Attack</td><td>Medium</td><td>High</td><td>Cloudflare DDoS protection, rate limiting, API keys</td></tr><tr><td>Private Key Exposure</td><td>Low</td><td>Critical</td><td>Never store keys, SignMessage flow, session keys revocable</td></tr></table>

Operational Risks  

<table><tr><td>Risk</td><td>Probability</td><td>Impact</td><td>Mitigation</td></tr><tr><td>Database Corruption</td><td>Low</td><td>Critical</td><td>Automated backups, read replicas, point-in-time recovery</td></tr><tr><td>Cascading Failures</td><td>Low</td><td>High</td><td>Circuit breakers, graceful degradation, monitoring alerts</td></tr><tr><td>Regulatory Change</td><td>Medium</td><td>High</td><td>Legal review, compliance framework, quick pivots</td></tr><tr><td>Market Volatility</td><td>High</td><td>Low</td><td>Clear risk disclosures, user education</td></tr></table>

User Experience Risks  

<table><tr><td>Risk</td><td>Probability</td><td>Impact</td><td>Mitigation</td></tr><tr><td>User Misunderstanding</td><td>High</td><td>Medium</td><td>Clear UX, tooltips, educational content, AI explanations</td></tr><tr><td>Approval Friction</td><td>High</td><td>Medium</td><td>Session keys, one-click approvals for low-risk txs</td></tr><tr><td>High Gas Fees</td><td>Medium</td><td>Low</td><td>Batch operations, off-peak scheduling, fee estimation</td></tr></table>

# Regulatory Landscape

US: FinCEN guidance on money transmission, OFAC compliance required  
EU: MiCA regulation pending (Q2 2024), AML/KYC considerations  
- Global: Varies by jurisdiction

# Compliance Measures

1. KYC (Know Your Customer): Collect wallet address, email (minimal KYC for MVP)  
2. AML (Anti-Money Laundering): Monitor for suspicious patterns, report to authorities if needed  
3. OFAC: Screen wallet addresses against OFAC SDN list  
4. Terms of Service: Clear disclaimers, no financial advice  
5. Privacy: GDPR compliance, data deletion on request  
6. Accessibility: WCAG 2.1 AA compliance for frontend

# Disclaimers

- "Solana Copilot is not financial advice"  
- "Transactions are non-reversible"  
- "No custody of user funds"  
"Subject to smart contract risks"

# SUCCEED METRICS (KPIs)

# User Acquisition

<table><tr><td>Metric</td><td>Target (Month 6)</td><td>Target (Year 1)</td></tr><tr><td>Total Wallets Created</td><td>10,000</td><td>50,000</td></tr><tr><td>Monthly Active Users</td><td>2,000</td><td>15,000</td></tr><tr><td>Daily Active Users</td><td>500</td><td>5,000</td></tr><tr><td>Signup Conversion Rate</td><td>30%</td><td>35%</td></tr></table>

# Engagement

<table><tr><td>Metric</td><td>Target (Month 6)</td><td>Target (Year 1)</td></tr><tr><td>Avg Transactions/User/Week</td><td>3</td><td>5</td></tr><tr><td>Automation Adoption Rate</td><td>25%</td><td>50%</td></tr><tr><td>Session Duration</td><td>8 min</td><td>12 min</td></tr><tr><td>Return User Rate</td><td>50% (7-day)</td><td>65% (7-day)</td></tr><tr><td>Transaction Volume ($)</td><td>$10M</td><td>$500M</td></tr><tr><td>Monthly Revenue</td><td>$10K</td><td>$500K</td></tr><tr><td>MRR Growth Rate</td><td>30%</td><td>25%</td></tr><tr><td>AOV (Average Order Value)</td><td>$500</td><td>$1000</td></tr></table>

# Product Quality

<table><tr><td>Metric</td><td>Target</td></tr><tr><td>Transaction Success Rate</td><td>&gt;99%</td></tr><tr><td>AI Intent Accuracy</td><td>&gt;95%</td></tr><tr><td>User Satisfaction (NPS)</td><td>&gt;50</td></tr><tr><td>Support Response Time</td><td>&lt;24 hours</td></tr></table>

# RELEASE PLAN

# Phase 0: MVP (Weeks 1-8)

Goal: Validate product concept with 1,000 users on Devnet.

# Features:

- Chat-based swap interface  
- Wallet authentication (SignMessage)  
- Portfolio view (basic holdings)  
Transaction history  
- Basic transaction simulation

# Deliverables:

- Next.js frontend (Devnet only)  
- FastAPI backend  
- LangGraph basic agent  
- PostgreSQL setup

# Success Criteria:

1,000 users created  
100+ daily active users  
>95% transaction success rate

# Phase 1: Alpha (Weeks 9-16)

Goal: Launch on Mainnet with 10,000 users, test DCA automation.

# New Features:

DCA automation (Anchor program)  
- Portfolio risk analysis  
- Session keys  
- Email notifications  
- Automation dashboard

# Enhancements:

- Improved chat UI (voice input)  
- Better error handling  
Performance optimization

# Success Criteria:

10,000 users  
- 500+ active DCAs  
 $10M+ automation volume  
NPS>40

# Phase 2: Beta (Weeks 17-24)

Goal: DAO treasury features, public API, 50,000 users.

# New Features:

- Multi-sig integration (DAO treasuries)  
Public REST API  
- Custom agent framework  
- Advanced risk analytics  
- Yield farming recommendations

# Enhancements:

- Better UX based on user feedback  
- Mobile app (React Native)  
Webhook integrations

# Success Criteria:

- 50,000 users  
20+ DAO treasuries using Copilot  
- 50+ API integrations  
 $100M+ automation volume

# Phase 3: General Availability (Month 7+)

Goal: Production-ready, scale to 100K+ users.

# New Features:

Cross-chain support (Ethereum, Polygon)  
- AI agent marketplace  
- Advanced derivatives (options, perps)  
- Institutional features (compliance, reporting)

# Focus Areas:

Scale infrastructure  
- Enterprise partnerships  
Community-driven development

# APPENDICES

# Appendix A: Glossary

<table><tr><td>Term</td><td>Definition</td></tr><tr><td>DCA</td><td>Dollar-Cost Averaging: Regular purchases at fixed intervals</td></tr><tr><td>PnL</td><td>Profit and Loss: Realized and unrealized gains/losses</td></tr><tr><td>Slippage</td><td>Price difference between quote and actual execution</td></tr><tr><td>Price Impact</td><td>Percentage change in price due to order size</td></tr><tr><td>VaR</td><td>Value at Risk: Maximum loss at 95% confidence</td></tr><tr><td>TVL</td><td>Total Value Locked: Total assets in a DeFi protocol</td></tr><tr><td>SPL Token</td><td>Solana Program Library token (fungible token standard)</td></tr><tr><td>PDA</td><td>Program Derived Address: Deterministic account address</td></tr><tr><td>CPI</td><td>Cross-Program Invocation: Call from one program to another</td></tr><tr><td>RPC</td><td>Remote Procedure Call: Interface to Solana node</td></tr></table>

# Appendix B: Example DCA Execution Flow (Diagram)

```yaml
Day 1: User creates DCA
- Action: "Set up $100 daily DCA (USDC → SOL)"
- AI processes: Creates Anchor instruction
- User signs: SignMessage (no private key exposed)
- Contract: Initialize DcaVault PDA
- Owner: User wallet
- Source: USDC
- Dest: SOL
- Amount: 100 USDC
- Interval: 86400 seconds (24h)
- Status: Active
- Result: Vault created successfully
```

```txt
Day 2, 00:00 UTC: First execution  
Trigger: Helius webhook (time-based)  
Check: Is 24h elapsed? YES  
Action: FastAPI calls /dca/execute  
Steps:  
Fetch current USDC balance: 1000 USDC  
Fetch SOL price: 200 USD  
Calculate: 100 USDC = 0.5 SOL  
Simulate swap via Jupiter  
Execute on-chain  
Update vault: last被执行, total_executed  
Emit event: DcaExecuted  
Blockchain: Swap executes, 0.5 SOL received  
Off-chain: Log in database, notify user
```

```txt
Day 3, 00:00 UTC: Second execution  $\longleftarrow$  Same flow repeats...
```

```yaml
User can:  
- Pause: Stops future executions (preserves funds)  
- Resume: Restarts from current time  
- Modify: Change amount, frequency  
- Cancel: Withdraws remaining funds, closes vault
```

# Appendix C: AI Agent Thought Graph Example

User Input: "I want to move half my portfolio to USDC"

```txt
[Intent Classification]  
Action: rebalance  
Target Allocation: 50% USDC  
Confidence: 92%  
Next: Fetch Portfolio
```

```txt
[Portfolio Fetching]  
- Holdings: { SOL: 10 ($2000), USDC: 5000 ($5000)}  
- Current Allocation: { SOL: 28.6%, USDC: 71.4%}  
- Total Value: $7000  
- Next: Calculate Changes
```

```ini
[Calculate Rebalancing]
Target: 50% USDC = $3500
Current USDC: $5000 (already &gt;50%)
Action: Need to sell SOL
SOL to sell: ($5000 - $3500) / $200 = 7.5 SOL
Estimated output: $1500 USDC
Next: Plan Execution
[Plan Execution]
Multi-step plan:
Step 1: Sell 7.5 SOL on Jupiter
Step 2: Receive ~$1500 USDC
Step 3: Final allocation: { SOL: 12.5%, USDC: 87.5% }
Alternative considered: Split across Orca (rejected: worse price)
Next: Simulate
```

```txt
[Simulation]  
- Route selected: Jupiter (Orca aggregator)  
- Amount in: 7.5 SOL  
- Expected out: 1,498 USDC  
- Price impact: 0.02%  
- Gas fee: 0.005 SOL ($1)  
- Status: ✔ Success
```

```txt
$\sqsubseteq$  Next: Get Approval   
[Get Approval]  $\sqsubseteq$  Risk level: Medium (large transaction)  $\sqsubseteq$  Display to user: "Sell 7.5 SOL for \~\ $1500 USDC?"$ \sqsubseteq $"Your portfolio will be: \(12.5\%$  SOL,  $87.5\%$  USDC" \)\sqsubseteq $"Fee: \$1"$ \sqsubseteq $"[APPROVE] [CANCEL]"$ \sqsubseteq$ User action: APPROVE   
 $\sqsubseteq$  Next: Execute   
[Execute]  $\sqsubseteq$  Sign transaction (SignMessage)  $\sqsubseteq$  Submit to Solana RPC  $\sqsubseteq$  Confirm: 4pWZ8...   
 $\sqsubseteq$  Success!   
[Notify User]  $\sqsubseteq$  "Rebalancing complete! Sold 7.5 SOL for \$1,498 USDC. Your portfolio is now  $12.5\%$  SOL,  $87.5\%$  USDC."
```

# Appendix D: RPC Call Examples

# Example 1: Get Wallet Balance

```python
import solders   
#Get SOL balance  $<  a > <   / a>$    
response  $\equiv$  client.get_balance(PublicKey("7ZJhKjbFuSxCkq8BdTXPsmmU82vK2gVwdQB4EF6L1S3x"))   
print(f"SOL Balance:{response.value/1e9}SOL")   
#Get SPL token balance  $<  a > <   / a>$    
token_account  $=$  client.get_token_accountsb_by Owner( PublicKey("7ZJhKjbFuSxCkq8BdTXPsmmU82vK2gVwdQB4EF6L1S3x"), TokenAccountOptions(mint=PublicKey("EPjFWaJP...")) #USDC mint   
print(f"USDC Balance:{token_account.svalue[^0].account.data.parsed['info']['tokenAmount']
```

# Example 2: Simulate Transaction

```txt
tx_response  $\equiv$  client.simulate_transaction( Transaction.new_unsigned( Message.new_with.blockhash( account_keys  $= [ \dots ]$  ， header  $= \ldots$  ， instructions  $= [\ldots ]$  ， recent_blockhash  $\equiv$  client.getlatest_blockhash().value.blockhash ）   
）   
）   
if tx_response.value.err: print(f"Simulation failed:{tx_response.value.err}"）   
else: print(f"Gas estimate:{tx_response.value.units Consumed} units")
```

# Example 3: Send Transaction

```txt
tx_sig = client.send_transaction(signed_transaction)  
print(f"Transaction signature: {tx_sig.value}")  
# Wait for confirmation  $<a>$ /a>  
confirmation = client.confirm_transaction(tx_sig.value, "confirmed")  
print(f"Confirmed: {confirmation.value}")
```

# Appendix E: Security Checklist

- [ ] No private keys stored on server  
- [ ] All transactions simulated before execution  
- [ ] Session keys have max amount and time limits  
- [ ] Rate limiting applied (100 req/min per wallet)  
- [ ] OFAC screening implemented  
- [ ] Input validation for all user inputs  
- [ ] SQL injection protection (parameterized queries)  
- [ ] XSS protection (CSP headers)  
- [ ] CSRF tokens for state-changing operations  
- [ ] DDoS protection (Cloudflare)  
- [ ] Audit logging for all transactions  
- [ ] Encryption for transport (TLS 1.3) and storage (AES-256)  
- [ ] Smart contract audited by reputable firm  
- [ ] Multi-sig for program upgrades  
- [ ] Bug bounty program active  
- [ ] User terms of service clear on risks  
- [ ] Privacy policy compliant with GDPR

# Appendix F: Deployment Checklist

# Pre-Launch:

- [ ] Smart contract audited  
- [ ] Frontend security scan passed  
- [ ] Backend load testing completed (1000+ concurrent users)  
- [ ] Database backups automated  
- [ ] Monitoring and alerting configured  
- [ ] Incident response plan documented  
- [ ] Support team trained  
- [ ] Legal review completed  
- [ ] Marketing materials prepared

# Launch Day:

- [ ] Health checks passing  
- [ ] RPC failover tested

- [ ] Team on standby  
- [ ] Gradual rollout to 1% of users  
- [ ] Monitor error rates, latency  
[ ] Scale to 10%, 50%, 100% based on metrics

# Post-Launch:

- [ ] Daily sync with team  
- [ ] Monitor KPIs  
- [ ] Collect user feedback  
- [ ] Plan hotfixes for critical issues  
- [ ] Weekly retrospectives

# CONCLUSION

Solana Copilot represents a breakthrough in making sophisticated blockchain finance accessible to mainstream users. By combining LangGraph AI agents, Anchor smart contracts, and a user-centric design, we're building the future of autonomous wallet management on Solana.

This PRD provides the complete specification for engineering, product, design, and AI teams to begin development immediately. The phased release plan allows for iterative validation with users, and the technical architecture supports scaling from 1,000 to 1,000,000+ users.

# Next Steps:

1. Engineering: Review architecture, begin smart contract development  
2. Product: Refine user stories, create wireframes  
3. Design: Create high-fidelity mockups for chat, dashboard, automations  
4. AI: Build and test LangGraph agents in isolation  
5. Security: Conduct threat modeling, begin audit prep

Document Owner: Product Team

Last Updated: November 29, 2025

Version: 1.0

This document is confidential and intended for internal use only.

1234567891011121314151617181920

# 森

1. https://solana.com/developers/guides/getstarted/intro-to-ai  
2. https://seblog,strongtie.com/2021/08/three-ways-anchor-designer-v3-0-simplifies-design/  
3. https://www.antiersolutions.com/blogs/how-to-build-ai-agents-from-scratch-in-2025/  
4. https://www.youtube.com/watch?v=E0fQWFNqGgq  
5. http://stevenblack.com/articles/hooks-and-anchors/  
6. https://www.rapidinnovation.io/post/ai-agents-in-crypto-transforming-blockchain-strategies  
7. https://launchdarkly.com/docs/tutorials/agents-langgraph  
8. https://semiengineering.com/anchors-anchoring-seeding-double-pattern-design/  
9. https://skywork.ai/skypage/en/unlocking-solana-ai-agent-kit/1980821743311065088  
10. https://codelabs.developers.google.com/aidemy-multi-agent/instructions

11. https://wwwcodecentric.de/en/knowledge-hub/blog/agile-database-design-using-anchor-modeling  
12. https://www.ampcome.com/post/ai-agents-in-crypto-2025-guide  
13. https://github.com/benitomartin/multiagent-langgraph-circleci  
14. https://www.uipath.com/blog/ai/agent-builder-best-practices  
15. https://www.blockchainappfactory.com/blog/ai-agent-tech-stack-for-2025/  
16. https://www.uniblock.dev/blog/how-to-build-a-secure-ai-agent-on-solana  
17. https://byteiota.com/langgraph-for-ai-agents-build-production-ready-workflows/  
18. https://www STRUCTUREmag.org/article/using-software-to-control-anchor-design/  
19. https://www.raininfotech.com/build-crypto-ai-agents-2025-guide/  
20. https://aws.amazon.com/blogs/machine-learning/build-a-multi-agent-system-with-langgraph-and-mistral-on-aws/
