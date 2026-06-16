# RCA: Health error details lost on failure

## Symptom
- `GET /health` returned HTTP `503`, but response body could miss meaningful diagnostic details.
- In failure cases where underlying error had only `error.message` (without `error.response`), the API could emit a generic/empty message, making incident triage slower.

## Trigger
- PostgreSQL health probe failed with a plain `Error` object (for example timeout/connection failure) that did not include Terminus-style `response` payload.

## Root Cause
- In `HealthController.check()`, catch handler mapped exception message only from `error.response`.
- For plain `Error` failures, `error.response` is `undefined`, so details from `error.message` were dropped.

## Fix
- Behavior change in `src/infrastructure/health/health.controller.ts` via `getHealthErrorMessage()`:
  - before: `AppHealthCheckException({ message: error.response })` — for plain `Error`, `message` became `undefined`.
  - after: normalize to string — `response` (string or JSON object) → else `error.message` → else `'Health check failed'`.
- Regression lock in `src/infrastructure/health/health.controller.seeded-bug.regression.spec.ts`:
  - `reproduces seeded bug: legacy mapper drops message when response is absent` — documents broken pre-fix mapping.
  - `fixed GET /health maps plain Error to 503 with error.message text` — asserts new controller behavior.

## Response contract (`GET /health` on dependency failure)
| Condition | HTTP status | `AppHealthCheckException.message` |
| --- | --- | --- |
| `error.response` is non-empty string | `503` | same string |
| `error.response` is object (Terminus payload) | `503` | `JSON.stringify(error.response)` |
| plain `Error`, no `response` | `503` | `error.message` |
| unknown / empty error | `503` | `'Health check failed'` |

Successful probe: unchanged — Terminus `HealthCheck` result with `status: 'ok'` (not covered by this defect).

## Detection
- Defect reproduced in `health.controller.seeded-bug.regression.spec.ts` by rejecting `health.check()` with `new Error('postgres timeout')`: legacy mapper returns `undefined`, fixed controller returns `message: 'postgres timeout'`.
- Run: `npm test -- health.controller.seeded-bug.regression.spec.ts`

## Blast Radius
- Affects all consumers of `/health` during dependency outages (DB down, timeout, transient network failures).
- Primary impact is operational: weaker observability and slower root-cause identification by on-call/monitoring systems.
- Does not affect successful health checks or business endpoints directly.
