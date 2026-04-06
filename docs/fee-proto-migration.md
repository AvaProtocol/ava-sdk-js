# Fee Estimation Proto Migration

Breaking changes to the fee estimation and execution fee interfaces, aligning the SDK with the updated aggregator protobuf schema.

## Types Removed

| Type | Package | Description |
|------|---------|-------------|
| `FeeAmount` | `@avaprotocol/types` | Multi-format fee (native + USD + AP token). Replaced by `Fee`. |
| `GasFeeBreakdown` | `@avaprotocol/types` | Gas fee breakdown with per-node fees, estimation method, gas price |
| `NodeGasFee` | `@avaprotocol/types` | Per-node gas fee (operationType, methodName, gasUnits, gasPrice, totalCost) |
| `AutomationFee` | `@avaprotocol/types` | Trigger-based monitoring/execution fees with duration and breakdown |
| `AutomationFeeComponent` | `@avaprotocol/types` | Individual automation fee component (base, monitoring, scaling) |
| `SmartWalletCreationFee` | `@avaprotocol/types` | Wallet creation fee (creationRequired, creationFee, initialFunding) |
| `Discount` | `@avaprotocol/types` | Discount with appliesTo, discountPercentage, discountAmount |

## Types Added

| Type | Package | Description |
|------|---------|-------------|
| `FeeUnit` | `@avaprotocol/types` | `"USD" \| "WEI" \| "PERCENTAGE"` |
| `Fee` | `@avaprotocol/types` | `{ amount: string, unit: FeeUnit }` — unit-safe fee value |
| `NativeToken` | `@avaprotocol/types` | `{ symbol: string, decimals: number }` — chain native token metadata |
| `NodeCOGS` | `@avaprotocol/types` | `{ nodeId, costType, fee: Fee, gasUnits? }` — per-node operational cost |
| `ValueFee` | `@avaprotocol/types` | `{ fee: Fee, tier, valueBase?, classificationMethod, confidence, reason }` — workflow-level value-capture fee |
| `FeeDiscount` | `@avaprotocol/types` | `{ discountType, discountName, discount: Fee, expiryDate?, terms? }` — applied discount |

## Types Modified

### `EstimateFeesResponse`

| Removed Fields | Added Fields |
|----------------|-------------|
| `gasFees: GasFeeBreakdown` | `nativeToken: NativeToken` |
| `automationFees: AutomationFee` | `executionFee: Fee` |
| `creationFees: SmartWalletCreationFee` | `cogs: NodeCOGS[]` |
| `totalFees: FeeAmount` | `valueFee: ValueFee` |
| `totalDiscounts: FeeAmount` | `pricingModel: string` |
| `finalTotal: FeeAmount` | |
| `estimatedAt: number` | |
| `priceDataSource: string` | |
| `priceDataAgeSeconds: number` | |
| `recommendations: string[]` | |
| `discounts: Discount[]` | `discounts: FeeDiscount[]` (type changed) |

All fees are now per-execution. No server-side totals — the client computes.
Components: `executionFee` (USD) + `cogs[]` (WEI) + `valueFee` (PERCENTAGE).

### `ExecutionProps`

| Removed Fields | Added Fields |
|----------------|-------------|
| `totalGasCost: string` | `executionFee: Fee` |
| | `cogs: NodeCOGS[]` |
| | `valueFee: ValueFee` |

### SDK Internal Methods (`Client`)

| Method | Change |
|--------|--------|
| `convertEstimateFeesResponse()` | Rewritten for new proto fields |
| `convertFeeAmount()` | Removed |
| `createZeroFeeAmount()` | Removed |
| `createMockFeeAmount()` | Removed |

## Test Utilities

| Change | File |
|--------|------|
| `expectAutomationFee` alias removed | `tests/utils/utils.ts` |
| `expectExecutionFees` updated for `Fee`/`NodeCOGS`/`ValueFee` | `tests/utils/utils.ts` |
| Backward pagination tests fixed (all 3 suites) | `getExecutions`, `workflow`, `secret` |
| `gasTracking.test.ts` migrated from `execution.totalGasCost` to `execution.cogs` | `tests/executions/gasTracking.test.ts` |

---

## Migration Guide

### 1. Import Changes

```diff
- import type {
-   FeeAmount,
-   GasFeeBreakdown,
-   NodeGasFee,
-   AutomationFee,
-   AutomationFeeComponent,
-   SmartWalletCreationFee,
-   Discount,
- } from "@avaprotocol/types";

+ import type {
+   Fee,
+   FeeUnit,
+   NativeToken,
+   NodeCOGS,
+   ValueFee,
+   FeeDiscount,
+ } from "@avaprotocol/types";
```

### 2. Execution Object Migration

Any code accessing `execution.totalGasCost` or `execution.automationFee` must switch to the new fields:

```diff
  // Before
- const gasCost = execution.totalGasCost;           // string (wei)
- const fee = execution.automationFee;               // FeeAmount
- const feeUsd = execution.automationFee?.usdAmount;

  // After
+ const platformFee = execution.executionFee;        // Fee { amount: "0.020000", unit: "USD" }
+ const gasCosts = execution.cogs;                   // NodeCOGS[] — per-node gas/API costs
+ const valueFee = execution.valueFee;               // ValueFee — percentage-based value capture
```

Example: summing total gas cost from COGS:

```typescript
const totalGasWei = execution.cogs
  .filter((c) => c.costType === "gas")
  .reduce((sum, c) => sum + BigInt(c.fee.amount), BigInt(0));
```

### 3. Fee Estimation Response Migration

The response no longer has nested breakdown objects or server-computed totals:

```diff
  // Before
- const gasTotal = response.gasFees?.totalGasCost;
- const automationTotal = response.automationFees?.totalFee;
- const walletCreation = response.creationFees?.creationFee;
- const total = response.finalTotal;                 // FeeAmount
- const discountPct = response.discounts?.[0]?.discountPercentage;

  // After — flat per-execution structure
+ const platformFee = response.executionFee;         // Fee { amount, unit: "USD" }
+ const nodeCosts = response.cogs;                   // NodeCOGS[]
+ const valueFee = response.valueFee;                // ValueFee
+ const discounts = response.discounts;              // FeeDiscount[]
+ const nativeToken = response.nativeToken;          // { symbol: "ETH", decimals: 18 }
```

### 4. Fee Display Logic

The old `FeeAmount` had `nativeTokenAmount`, `usdAmount`, and `nativeTokenSymbol` baked in. The new `Fee` is unit-tagged — the client must handle formatting per unit:

```diff
  // Before
- function formatFee(fee: FeeAmount): string {
-   return `${fee.nativeTokenSymbol} ${fee.nativeTokenAmount} ($${fee.usdAmount})`;
- }

  // After
+ function formatFee(fee: Fee): string {
+   switch (fee.unit) {
+     case "USD":
+       return `$${fee.amount}`;
+     case "WEI":
+       return `${fee.amount} wei`;
+     case "PERCENTAGE":
+       return `${fee.amount}%`;
+   }
+ }
```

To convert WEI to a human-readable ETH amount, use `nativeToken.decimals` from the response:

```typescript
function formatWei(amount: string, decimals: number, symbol: string): string {
  const value = Number(BigInt(amount)) / 10 ** decimals;
  return `${value.toFixed(6)} ${symbol}`;
}

// Usage with estimation response
if (response.nativeToken) {
  const { symbol, decimals } = response.nativeToken;
  for (const cogs of response.cogs) {
    console.log(formatWei(cogs.fee.amount, decimals, symbol));
  }
}
```

### 5. Client-Side Total Computation

The server no longer returns `totalFees`, `totalDiscounts`, or `finalTotal`. The client computes totals from the components:

```typescript
import type { EstimateFeesResponse } from "@avaprotocol/types";

function computeTotals(response: EstimateFeesResponse) {
  // Platform fee (USD)
  const executionFeeUsd = parseFloat(response.executionFee?.amount ?? "0");

  // Sum gas COGS (WEI) — convert to ETH for display
  const decimals = response.nativeToken?.decimals ?? 18;
  const totalCogsWei = response.cogs.reduce(
    (sum, c) => sum + BigInt(c.fee.amount),
    BigInt(0)
  );
  const totalCogsEth = Number(totalCogsWei) / 10 ** decimals;

  // Value fee (percentage of transaction value — applied by the client)
  const valueFeePercent = parseFloat(response.valueFee?.fee.amount ?? "0");

  // Sum discounts (check unit per discount)
  const totalDiscountUsd = response.discounts
    .filter((d) => d.discount.unit === "USD")
    .reduce((sum, d) => sum + parseFloat(d.discount.amount), 0);

  return {
    executionFeeUsd,
    totalCogsWei: totalCogsWei.toString(),
    totalCogsEth,
    valueFeePercent,
    totalDiscountUsd,
  };
}
```

### Quick Reference: Field Mapping

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| `execution.totalGasCost` | `execution.cogs` | Array of per-node costs |
| `execution.automationFee` | `execution.executionFee` | Now `Fee { amount, unit }` |
| `response.gasFees.totalGasCost` | `sum(response.cogs[].fee)` | Client computes total |
| `response.gasFees.nodeGasFees` | `response.cogs` | Renamed, simplified |
| `response.automationFees.totalFee` | `response.executionFee` | Flat platform fee |
| `response.creationFees` | _(removed)_ | No longer in response |
| `response.totalFees` | _(removed)_ | Client computes |
| `response.finalTotal` | _(removed)_ | Client computes |
| `response.totalDiscounts` | `sum(response.discounts[].discount)` | Client computes |
| `discount.discountPercentage` | `discount.discount` | Now `Fee { amount, unit }` |
| `discount.discountAmount` | `discount.discount` | Unified into one field |
| `discount.appliesTo` | _(removed)_ | |
| `fee.nativeTokenAmount` | `fee.amount` (when `unit === "WEI"`) | Unit-tagged |
| `fee.usdAmount` | `fee.amount` (when `unit === "USD"`) | Unit-tagged |
