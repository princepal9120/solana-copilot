"""
Solana Copilot - Chat Router
WebSocket-based chat interface for conversational wallet control
"""

import json
import logging
from typing import Dict, Any
from uuid import uuid4

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models import User
from app.api.v1.auth import get_current_user
from app.agents.intent_classifier import classify_intent
from app.agents.transaction_planner import plan_swap_transaction
from app.schemas import ChatMessage, ChatResponse

logger = logging.getLogger(__name__)

router = APIRouter()


# ============================================
# WebSocket Connection Manager
# ============================================

class ConnectionManager:
    """Manage WebSocket connections"""
    
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
    
    async def connect(self, wallet: str, websocket: WebSocket):
        """Accept and store connection"""
        await websocket.accept()
        self.active_connections[wallet] = websocket
        logger.info(f"WebSocket connected: {wallet}")
    
    def disconnect(self, wallet: str):
        """Remove connection"""
        if wallet in self.active_connections:
            del self.active_connections[wallet]
            logger.info(f"WebSocket disconnected: {wallet}")
    
    async def send_message(self, wallet: str, message: dict):
        """Send message to specific wallet"""
        if wallet in self.active_connections:
            await self.active_connections[wallet].send_json(message)
    
    async def broadcast(self, message: dict):
        """Broadcast to all connections"""
        for connection in self.active_connections.values():
            await connection.send_json(message)


manager = ConnectionManager()


# ============================================
# WebSocket Endpoint
# ============================================

@router.websocket("/ws")
async def websocket_chat(
    websocket: WebSocket,
    token: str,
    db: AsyncSession = Depends(get_db),
):
    """
    WebSocket endpoint for real-time chat.
    
    Client sends:
    {
        "type": "message",
        "content": "Swap 20 USDC to SOL",
        "session_id": "optional"
    }
    
    Server responds:
    {
        "type": "response",
        "id": "msg_123",
        "status": "processing|awaiting_approval|success|error",
        "data": {...}
    }
    """
    
    # Verify token and get user
    from app.core.security import verify_token
    wallet = verify_token(token)
    
    if not wallet:
        await websocket.close(code=1008, reason="Invalid token")
        return
    
    # Connect
    await manager.connect(wallet, websocket)
    
    try:
        while True:
            # Receive message
            data = await websocket.receive_json()
            
            message_type = data.get("type")
            
            if message_type == "message":
                await handle_chat_message(websocket, wallet, data, db)
            
            elif message_type == "approval":
                await handle_approval(websocket, wallet, data, db)
            
            elif message_type == "ping":
                await websocket.send_json({"type": "pong"})
    
    except WebSocketDisconnect:
        manager.disconnect(wallet)
        logger.info(f"Client disconnected: {wallet}")
    
    except Exception as e:
        logger.error(f"WebSocket error: {e}", exc_info=True)
        manager.disconnect(wallet)


async def handle_chat_message(
    websocket: WebSocket,
    wallet: str,
    data: Dict[str, Any],
    db: AsyncSession,
):
    """Handle incoming chat message"""
    
    try:
        user_input = data.get("content", "")
        message_id = str(uuid4())
        
        # Send acknowledgment
        await websocket.send_json({
            "type": "response",
            "id": message_id,
            "status": "processing",
            "message": "Processing your request...",
        })
        
        # Step 1: Classify intent
        intent_result = await classify_intent(user_input, wallet)
        
        action = intent_result["action"]
        confidence = intent_result["confidence"]
        parameters = intent_result["parameters"]
        
        logger.info(f"Intent: {action} (confidence: {confidence})")
        
        # Step 2: Route to appropriate handler
        if action == "swap":
            await handle_swap_intent(
                websocket, wallet, message_id, parameters, db
            )
        
        elif action == "analyze":
            await handle_analyze_intent(
                websocket, wallet, message_id, parameters, db
            )
        
        elif action == "query":
            await handle_query_intent(
                websocket, wallet, message_id, parameters, db
            )
        
        else:
            await websocket.send_json({
                "type": "response",
                "id": message_id,
                "status": "error",
                "message": f"Action '{action}' not yet implemented",
            })
    
    except Exception as e:
        logger.error(f"Error handling message: {e}", exc_info=True)
        await websocket.send_json({
            "type": "response",
            "id": message_id,
            "status": "error",
            "message": str(e),
        })


async def handle_swap_intent(
    websocket: WebSocket,
    wallet: str,
    message_id: str,
    parameters: Dict[str, Any],
    db: AsyncSession,
):
    """Handle swap intent"""
    
    try:
        # Extract parameters
        source_token = parameters.get("source_token")
        dest_token = parameters.get("dest_token")
        amount = parameters.get("amount")
        slippage_bps = parameters.get("slippage_bps", 100)
        
        if not all([source_token, dest_token, amount]):
            await websocket.send_json({
                "type": "response",
                "id": message_id,
                "status": "error",
                "message": "Missing required parameters for swap",
            })
            return
        
        # Plan transaction
        result = await plan_swap_transaction(
            user_wallet=wallet,
            source_token=source_token,
            dest_token=dest_token,
            amount=float(amount),
            slippage_bps=slippage_bps,
        )
        
        # Check for errors
        if result.get("error"):
            await websocket.send_json({
                "type": "response",
                "id": message_id,
                "status": "error",
                "message": result["error"],
            })
            return
        
        # Send transaction preview
        simulation = result.get("simulation_result", {})
        
        await websocket.send_json({
            "type": "response",
            "id": message_id,
            "status": "awaiting_approval",
            "action": "swap",
            "preview": {
                "from": f"{amount} {source_token}",
                "to": f"~{simulation.get('amount_out', 0)} {dest_token}",
                "route": result.get("selected_route", {}).get("route", "Unknown"),
                "price_impact": f"{simulation.get('price_impact', 0)}%",
                "gas_estimate": f"{simulation.get('gas_estimate', 0)} lamports",
            },
            "transaction_data": result,
        })
    
    except Exception as e:
        logger.error(f"Error handling swap: {e}", exc_info=True)
        await websocket.send_json({
            "type": "response",
            "id": message_id,
            "status": "error",
            "message": str(e),
        })


async def handle_analyze_intent(
    websocket: WebSocket,
    wallet: str,
    message_id: str,
    parameters: Dict[str, Any],
    db: AsyncSession,
):
    """Handle portfolio analysis intent"""
    
    try:
        # Get portfolio data (simplified)
        from app.integrations.solana.client import get_solana_client
        
        client = get_solana_client()
        balances = await client.get_all_token_balances(wallet)
        
        await websocket.send_json({
            "type": "response",
            "id": message_id,
            "status": "success",
            "action": "analyze",
            "data": {
                "total_tokens": len(balances),
                "balances": balances,
                "message": "Portfolio analysis complete",
            },
        })
    
    except Exception as e:
        logger.error(f"Error analyzing portfolio: {e}", exc_info=True)
        await websocket.send_json({
            "type": "response",
            "id": message_id,
            "status": "error",
            "message": str(e),
        })


async def handle_query_intent(
    websocket: WebSocket,
    wallet: str,
    message_id: str,
    parameters: Dict[str, Any],
    db: AsyncSession,
):
    """Handle general query intent"""
    
    try:
        query_type = parameters.get("query_type", "general")
        
        # Simple query handling
        await websocket.send_json({
            "type": "response",
            "id": message_id,
            "status": "success",
            "action": "query",
            "message": "Query processed. More features coming soon!",
        })
    
    except Exception as e:
        logger.error(f"Error handling query: {e}", exc_info=True)
        await websocket.send_json({
            "type": "response",
            "id": message_id,
            "status": "error",
            "message": str(e),
        })


async def handle_approval(
    websocket: WebSocket,
    wallet: str,
    data: Dict[str, Any],
    db: AsyncSession,
):
    """Handle transaction approval/rejection"""
    
    try:
        message_id = data.get("message_id")
        approved = data.get("approved", False)
        transaction_data = data.get("transaction_data", {})
        
        if approved:
            # Execute transaction
            # In production: sign and submit to blockchain
            
            await websocket.send_json({
                "type": "response",
                "id": message_id,
                "status": "success",
                "message": "Transaction executed successfully",
                "tx_signature": "mock_signature_123",
            })
        else:
            await websocket.send_json({
                "type": "response",
                "id": message_id,
                "status": "cancelled",
                "message": "Transaction cancelled by user",
            })
    
    except Exception as e:
        logger.error(f"Error handling approval: {e}", exc_info=True)
        await websocket.send_json({
            "type": "response",
            "id": message_id,
            "status": "error",
            "message": str(e),
        })


# ============================================
# HTTP Endpoints (Alternative to WebSocket)
# ============================================

@router.post("/message", response_model=ChatResponse)
async def send_message(
    message: ChatMessage,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    HTTP endpoint for chat (alternative to WebSocket).
    Useful for testing and simple integrations.
    """
    
    try:
        # Classify intent
        intent_result = await classify_intent(
            message.message,
            current_user.wallet_address
        )
        
        return ChatResponse(
            id=str(uuid4()),
            status="processing",
            action=intent_result["action"],
            preview={
                "confidence": intent_result["confidence"],
                "parameters": intent_result["parameters"],
            },
            next_step="Transaction planning in progress...",
        )
    
    except Exception as e:
        logger.error(f"Error processing message: {e}", exc_info=True)
        return ChatResponse(
            id=str(uuid4()),
            status="error",
            error=str(e),
        )
