# Solana Copilot - API Reference

## Base URL
```
Development: http://localhost:8000
Production: https://api.solanacopilot.com
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### POST `/api/v1/auth/request-challenge`
Request authentication challenge for wallet signing.

**Request:**
```json
{
  "wallet": "7ZJhKjbFuSxCkq8BdTXPsmmU82vK2gVwdQB4EF6L1S3x"
}
```

**Response:**
```json
{
  "message": "Sign this message to log in to Solana Copilot: abc123...",
  "nonce": "abc123..."
}
```

### POST `/api/v1/auth/verify-signature`
Verify signature and get JWT token.

**Request:**
```json
{
  "wallet": "7ZJhKjbFuSxCkq8BdTXPsmmU82vK2gVwdQB4EF6L1S3x",
  "message": "Sign this message to log in to Solana Copilot: abc123...",
  "signature": "3Bv7wF..."
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "wallet": "7ZJhKjbFuSxCkq8BdTXPsmmU82vK2gVwdQB4EF6L1S3x",
  "expires_at": "2025-11-30T16:30:45Z"
}
```

### GET `/api/v1/auth/me`
Get current user information.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": "uuid",
  "wallet_address": "7ZJh...",
  "email": null,
  "display_name": null,
  "created_at": "2025-11-29T10:00:00Z",
  "preferences": {}
}
```

---

## 💬 Chat Endpoints

### WebSocket `/api/v1/chat/ws?token=<jwt_token>`
Real-time chat interface.

**Client → Server:**
```json
{
  "type": "message",
  "content": "Swap 20 USDC to SOL",
  "session_id": "optional"
}
```

**Server → Client:**
```json
{
  "type": "response",
  "id": "msg_123",
  "status": "awaiting_approval",
  "action": "swap",
  "preview": {
    "from": "20 USDC",
    "to": "~0.15 SOL",
    "route": "USDC → SOL (Orca)",
    "price_impact": "0.1%",
    "gas_estimate": "5000 lamports"
  }
}
```

### POST `/api/v1/chat/message`
HTTP alternative to WebSocket.

**Request:**
```json
{
  "message": "Swap 20 USDC to SOL",
  "session_id": "optional"
}
```

---

## 📊 Portfolio Endpoints

### GET `/api/v1/portfolio/`
Get complete portfolio overview.

**Response:**
```json
{
  "portfolio_summary": {
    "total_usd": 1250.50,
    "token_count": 5,
    "updated_at": "2025-11-29T20:00:00Z"
  },
  "holdings": [
    {
      "mint": "So11111...",
      "symbol": "SOL",
      "amount": 10.5,
      "price_usd": 100.0,
      "value_usd": 1050.0,
      "allocation_pct": 84.0
    }
  ],
  "performance": {
    "total_pnl_usd": 250.50,
    "total_pnl_pct": 25.05,
    "return_1d_pct": 2.5,
    "return_7d_pct": 10.2,
    "return_30d_pct": 25.05
  },
  "risk": {
    "risk_score": 45,
    "risk_level": "medium",
    "volatility_90d_pct": 15.5,
    "max_drawdown_90d_pct": 8.2,
    "var_95_usd": 125.0,
    "concentration_top3_pct": 95.0
  },
  "ai_insights": {
    "summary": "Your portfolio is well-diversified...",
    "risks": ["High SOL concentration"],
    "recommendations": ["Consider rebalancing"]
  }
}
```

### GET `/api/v1/portfolio/holdings`
Get token holdings only.

### GET `/api/v1/portfolio/performance?timeframe=30d`
Get performance metrics.

**Query Parameters:**
- `timeframe`: `1d`, `7d`, `30d`, `90d`

### GET `/api/v1/portfolio/risk`
Get risk assessment.

### POST `/api/v1/portfolio/snapshot`
Create portfolio snapshot.

---

## 📜 Transaction Endpoints

### GET `/api/v1/transactions/`
Get transaction history.

**Query Parameters:**
- `limit`: Number of transactions (1-100, default: 50)
- `offset`: Pagination offset (default: 0)
- `action`: Filter by action (`swap`, `send`, `stake`)
- `status`: Filter by status (`pending`, `success`, `failed`)

**Response:**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "action": "swap",
      "source_token": "USDC",
      "dest_token": "SOL",
      "amount_in": 20.0,
      "amount_out": 0.15,
      "status": "success",
      "tx_signature": "5Kj...",
      "created_at": "2025-11-29T20:00:00Z"
    }
  ],
  "total": 100,
  "limit": 50,
  "offset": 0
}
```

### GET `/api/v1/transactions/{transaction_id}`
Get transaction details.

### POST `/api/v1/transactions/`
Create transaction record.

### GET `/api/v1/transactions/stats/summary?timeframe=30d`
Get transaction statistics.

**Response:**
```json
{
  "timeframe": "30d",
  "total_transactions": 45,
  "successful": 42,
  "failed": 2,
  "pending": 1,
  "success_rate": 93.3,
  "total_volume_usd": 5420.50,
  "total_gas_fees": 0.15,
  "action_breakdown": {
    "swap": 30,
    "send": 10,
    "stake": 5
  }
}
```

### GET `/api/v1/transactions/recent/activity?limit=10`
Get recent activity.

---

## 🤖 Automation Endpoints

### GET `/api/v1/automations/`
Get all automations.

**Query Parameters:**
- `status`: Filter by status (`active`, `paused`, `completed`, `cancelled`)
- `automation_type`: Filter by type (`dca`, `recurring_swap`, `rebalance`)

**Response:**
```json
{
  "automations": [
    {
      "id": "uuid",
      "automation_type": "dca",
      "name": "Daily SOL DCA",
      "source_token": "USDC",
      "dest_token": "SOL",
      "amount": 10.0,
      "frequency_seconds": 86400,
      "status": "active",
      "next_execution_at": "2025-11-30T20:00:00Z",
      "execution_count": 15,
      "total_volume_usd": 150.0
    }
  ],
  "total": 3
}
```

### GET `/api/v1/automations/{automation_id}`
Get automation details.

### POST `/api/v1/automations/`
Create new automation.

**Request:**
```json
{
  "automation_type": "dca",
  "name": "Daily SOL DCA",
  "source_token": "USDC",
  "dest_token": "SOL",
  "amount": 10.0,
  "frequency_seconds": 86400,
  "metadata": {}
}
```

### PATCH `/api/v1/automations/{automation_id}`
Update automation.

**Request:**
```json
{
  "amount": 15.0,
  "status": "active"
}
```

### POST `/api/v1/automations/{automation_id}/pause`
Pause automation.

### POST `/api/v1/automations/{automation_id}/resume`
Resume automation.

### DELETE `/api/v1/automations/{automation_id}`
Cancel automation.

### GET `/api/v1/automations/{automation_id}/executions?limit=50`
Get execution history.

**Response:**
```json
{
  "automation_id": "uuid",
  "executions": [
    {
      "id": "uuid",
      "executed_at": "2025-11-29T20:00:00Z",
      "input_amount": 10.0,
      "output_amount": 0.075,
      "price": 133.33,
      "status": "success",
      "tx_hash": "5Kj..."
    }
  ],
  "total": 15
}
```

---

## 🏥 Health Check

### GET `/health`
Check API health.

**Response:**
```json
{
  "status": "ok",
  "environment": "development",
  "version": "1.0.0",
  "solana_network": "devnet"
}
```

---

## ⚠️ Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "details": "Additional details",
  "status_code": 400,
  "path": "/api/v1/endpoint"
}
```

### Common Status Codes
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

---

## 🔒 Rate Limiting

- **Limit:** 100 requests per minute per wallet/IP
- **Headers:**
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

---

## 📚 Additional Resources

- **Interactive Docs:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **OpenAPI Spec:** http://localhost:8000/openapi.json

---

**For support, visit:** https://docs.solanacopilot.com
