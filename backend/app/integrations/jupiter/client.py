"""
Solana Copilot - Jupiter Aggregator Client
Integration with Jupiter for optimal swap routing
"""

import logging
from typing import Any, Dict, List, Optional
from decimal import Decimal

import httpx

from app.core.config import settings
from app.utils.cache import cache_set, cache_get

logger = logging.getLogger(__name__)


# ============================================
# Token Registry (Simplified)
# ============================================

# In production, fetch from Jupiter token list API
TOKEN_MINTS = {
    "SOL": "So11111111111111111111111111111111111111112",
    "USDC": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "USDT": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    "ORCA": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
    "RAY": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    "BONK": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
}


# ============================================
# Jupiter Client
# ============================================

class JupiterClient:
    """
    Client for Jupiter Aggregator API.
    Provides swap routing, quotes, and transaction building.
    """
    
    def __init__(self):
        """Initialize Jupiter client"""
        self.base_url = settings.JUPITER_API_URL
        self.price_url = settings.JUPITER_PRICE_API_URL
        
        self.client = httpx.AsyncClient(
            base_url=self.base_url,
            timeout=30.0,
        )
        
        logger.info("Initialized Jupiter client")
    
    def _get_token_mint(self, token: str) -> str:
        """Get token mint address from symbol"""
        # If already a mint address (44 chars), return as-is
        if len(token) == 44:
            return token
        
        # Lookup from registry
        mint = TOKEN_MINTS.get(token.upper())
        if not mint:
            raise ValueError(f"Unknown token: {token}")
        
        return mint
    
    async def get_quote(
        self,
        source_token: str,
        dest_token: str,
        amount: float,
        slippage_bps: int = 100,
    ) -> Dict[str, Any]:
        """
        Get swap quote from Jupiter.
        
        Args:
            source_token: Source token symbol or mint
            dest_token: Destination token symbol or mint
            amount: Amount to swap (in token units)
            slippage_bps: Slippage tolerance in basis points (100 = 1%)
        
        Returns:
            Quote data
        """
        try:
            # Get mint addresses
            source_mint = self._get_token_mint(source_token)
            dest_mint = self._get_token_mint(dest_token)
            
            # Convert amount to lamports/smallest unit
            # Assuming 9 decimals for simplicity (should fetch from token metadata)
            amount_lamports = int(amount * 1_000_000_000)
            
            # Build request
            params = {
                "inputMint": source_mint,
                "outputMint": dest_mint,
                "amount": amount_lamports,
                "slippageBps": slippage_bps,
            }
            
            # Make request
            response = await self.client.get("/quote", params=params)
            response.raise_for_status()
            
            data = response.json()
            
            # Parse response
            quote = {
                "source_mint": source_mint,
                "dest_mint": dest_mint,
                "amount_in": amount,
                "amount_out": float(data["outAmount"]) / 1_000_000_000,
                "price_impact": float(data.get("priceImpactPct", 0)),
                "route": data.get("routePlan", []),
                "fees": {
                    "platform_fee": float(data.get("platformFee", {}).get("amount", 0)),
                },
                "quote_data": data,  # Full quote for transaction building
            }
            
            logger.info(
                f"Jupiter quote: {amount} {source_token} → "
                f"{quote['amount_out']:.6f} {dest_token} "
                f"(impact: {quote['price_impact']}%)"
            )
            
            return quote
        
        except httpx.HTTPError as e:
            logger.error(f"Jupiter API error: {e}")
            raise
        except Exception as e:
            logger.error(f"Error getting Jupiter quote: {e}")
            raise
    
    async def get_all_routes(
        self,
        source_token: str,
        dest_token: str,
        amount: float,
    ) -> List[Dict[str, Any]]:
        """
        Get all available swap routes.
        
        Args:
            source_token: Source token symbol or mint
            dest_token: Destination token symbol or mint
            amount: Amount to swap
        
        Returns:
            List of routes sorted by output amount
        """
        try:
            # Get quote (Jupiter returns multiple routes)
            quote = await self.get_quote(source_token, dest_token, amount)
            
            # In production, Jupiter API returns multiple routes
            # For now, return single best route
            return [quote]
        
        except Exception as e:
            logger.error(f"Error getting all routes: {e}")
            raise
    
    async def build_swap_transaction(
        self,
        wallet_address: str,
        quote: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Build swap transaction from quote.
        
        Args:
            wallet_address: User's wallet address
            quote: Quote from get_quote()
        
        Returns:
            Transaction data
        """
        try:
            # Build request
            payload = {
                "quoteResponse": quote["quote_data"],
                "userPublicKey": wallet_address,
                "wrapAndUnwrapSol": True,
                "computeUnitPriceMicroLamports": "auto",
            }
            
            # Make request
            response = await self.client.post("/swap", json=payload)
            response.raise_for_status()
            
            data = response.json()
            
            return {
                "swap_transaction": data["swapTransaction"],
                "last_valid_block_height": data.get("lastValidBlockHeight"),
            }
        
        except httpx.HTTPError as e:
            logger.error(f"Jupiter swap transaction error: {e}")
            raise
        except Exception as e:
            logger.error(f"Error building swap transaction: {e}")
            raise
    
    async def get_token_price(
        self,
        token: str,
        vs_token: str = "USDC",
    ) -> Dict[str, Any]:
        """
        Get token price from Jupiter Price API.
        
        Args:
            token: Token symbol or mint
            vs_token: Quote token (default: USDC)
        
        Returns:
            Price data
        """
        try:
            # Check cache
            cache_key = f"jupiter_price:{token}:{vs_token}"
            cached = await cache_get(cache_key)
            if cached:
                return cached
            
            # Get mint address
            token_mint = self._get_token_mint(token)
            
            # Make request to price API
            async with httpx.AsyncClient(base_url=self.price_url) as client:
                response = await client.get(
                    "/price",
                    params={"ids": token_mint}
                )
                response.raise_for_status()
                
                data = response.json()
                price_data = data["data"][token_mint]
                
                result = {
                    "token": token,
                    "mint": token_mint,
                    "price": float(price_data["price"]),
                    "timestamp": price_data.get("timestamp"),
                }
                
                # Cache for 1 minute
                await cache_set(cache_key, result, ttl=60)
                
                return result
        
        except Exception as e:
            logger.error(f"Error getting token price: {e}")
            raise
    
    async def get_multiple_prices(
        self,
        tokens: List[str],
    ) -> Dict[str, float]:
        """
        Get prices for multiple tokens.
        
        Args:
            tokens: List of token symbols
        
        Returns:
            Dictionary of {token: price}
        """
        try:
            # Get mint addresses
            mints = [self._get_token_mint(t) for t in tokens]
            
            # Make request
            async with httpx.AsyncClient(base_url=self.price_url) as client:
                response = await client.get(
                    "/price",
                    params={"ids": ",".join(mints)}
                )
                response.raise_for_status()
                
                data = response.json()
                
                # Map back to symbols
                prices = {}
                for token, mint in zip(tokens, mints):
                    if mint in data["data"]:
                        prices[token] = float(data["data"][mint]["price"])
                
                return prices
        
        except Exception as e:
            logger.error(f"Error getting multiple prices: {e}")
            raise
    
    async def close(self):
        """Close the client"""
        await self.client.aclose()


# ============================================
# Global Client Instance
# ============================================

_jupiter_client: Optional[JupiterClient] = None


def get_jupiter_client() -> JupiterClient:
    """
    Get global Jupiter client instance.
    
    Returns:
        JupiterClient instance
    """
    global _jupiter_client
    
    if _jupiter_client is None:
        _jupiter_client = JupiterClient()
    
    return _jupiter_client


async def close_jupiter_client():
    """Close global Jupiter client"""
    global _jupiter_client
    
    if _jupiter_client:
        await _jupiter_client.close()
        _jupiter_client = None
