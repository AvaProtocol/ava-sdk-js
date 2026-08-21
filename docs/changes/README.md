# ava-sdk-js change log

Long-form notes for changes worth remembering after the PR merges. Filename: `YYYYMMDD-kebab-case-title.md`. Each entry opens with a header block (Date, Status, Branch, Related) and a body adapted to the change (typically Problem / Decision / Alternatives / Verification).

## Project-specific notes

- Production gateway is Railway `eigenlayer-avs` / environment `production`, public URL `https://api.avaprotocol.org/api/v1`.
- Partner assertions: Studio private key in Vercel `GATEWAY_STUDIO_PARTNER_KEY`; gateway public key + audience live in `avs-infra/railway/configs/gateway-railway.yaml`.
- v4 e2e against production: `TEST_ENV=railway` (after `.env` no longer pins `AVS_REST_URL`).
