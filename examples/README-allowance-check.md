# Uniswap V3 Allowance Checker

This script checks both ERC-20 and Permit2 allowances for Uniswap V3 swaps on Sepolia.

## Usage

```bash
# Check allowances for a specific smart wallet
yarn check-allowances 0x71c8f4D7D5291EdCb3A081802e7efB2788Bd232e

# Or with different environment
ts-node get-uniswapv3-allowance.ts 0x71c8f4D7D5291EdCb3A081802e7efB2788Bd232e
```

## What it checks

1. **USDC Balance** - Shows current USDC balance in the smart wallet
2. **ERC-20 Allowance (USDC -> Permit2)** - USDC allowance to Permit2 contract
3. **ERC-20 Allowance (USDC -> SwapRouter)** - USDC allowance directly to the SwapRouter contract
4. **Permit2 Allowance (Permit2 -> SwapRouter)** - Permit2's internal allowance to SwapRouter

## Contract Addresses (Sepolia)

- **USDC**: `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`
- **Permit2**: `0x000000000022D473030F116dDEE9F6B43aC78BA3`
- **SwapRouter**: `0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E`

## Expected Results

### ✅ Working Setup
- ERC-20 Allowance: `1.000000 USDC` (or more)
- Permit2 Allowance: `1.000000 USDC` (or more)
- Permit2 Expiration: Future date

### ❌ Common Issues
- **ERC-20 Allowance = 0**: Need to call `USDC.approve(Permit2, amount)`
- **Permit2 Allowance = 0**: Need to call `Permit2.approve(token, spender, amount, deadline)`
- **Permit2 Expired**: Need to call `Permit2.approve()` again with new deadline

## Why This Matters

Uniswap V3 SwapRouter uses Permit2 for token transfers. You need **both** allowances:

1. **ERC-20 approval**: `USDC.approve(Permit2, amount)` ✅ (you did this)
2. **Permit2 approval**: `Permit2.approve(USDC, SwapRouter, amount, deadline)` ❌ (likely missing)

If Permit2 allowance is 0, the swap will fail with `STF` (SafeTransferFrom) error.

## Example Output

```
=== Uniswap V3 Allowance Check ===
Smart Wallet: 0x71c8f4D7D5291EdCb3A081802e7efB2788Bd232e
USDC: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
Permit2: 0x000000000022D473030F116dDEE9F6B43aC78BA3
SwapRouter: 0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E

1. USDC Balance:
   Balance: 535124566
   Balance (formatted): 535.124566 USDC

2. ERC-20 Allowance (USDC -> Permit2):
   Allowance: 1000000
   Allowance (formatted): 1.000000 USDC

3. Permit2 Allowance (Permit2 -> SwapRouter):
   Amount: 0
   Amount (formatted): 0.000000 USDC
   Expiration: 0
   Expiration (date): 1970-01-01T00:00:00.000Z
   Nonce: 0

=== Analysis ===
✅ ERC-20 Allowance (USDC -> Permit2): SET
✅ Permit2 Allowance (Permit2 -> SwapRouter): NOT SET

❌ ISSUE: Permit2 allowance to SwapRouter is not set!
   Solution: Call Permit2.approve(token, spender, amount, deadline)
   This is likely why your swap is failing with STF error!
```
